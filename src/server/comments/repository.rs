//! Data access for the comments resource.

// Every function here fails for exactly one reason — the database call.
#![allow(clippy::missing_errors_doc)]

use sqlx::{PgPool, Row};
use std::collections::HashMap;

use super::{CommentNode, CommentReplyNode};

pub(crate) struct RawComment {
    pub id: uuid::Uuid,
    pub parent_id: Option<uuid::Uuid>,
    pub author: String,
    pub replying_to: Option<String>,
    pub body: String,
    pub posted: String,
}

/// Flattened Instagram-style threading: every reply attaches to its
/// top-level thread, no matter how deep the reply chain goes — a reply to a
/// reply still lands in the same thread. A comment whose parent is unknown
/// starts its own thread.
fn assemble_threads(rows: Vec<RawComment>) -> Vec<CommentNode> {
    let mut threads: Vec<CommentNode> = Vec::new();
    let mut position: HashMap<uuid::Uuid, usize> = HashMap::new();
    for row in rows {
        if let Some(index) = row
            .parent_id
            .and_then(|parent| position.get(&parent).copied())
        {
            // Replies to this reply must resolve to the same thread.
            position.insert(row.id, index);
            threads[index].replies.push(CommentReplyNode {
                author: row.author,
                replying_to: row.replying_to,
                body: row.body,
                posted: row.posted,
            });
        } else {
            position.insert(row.id, threads.len());
            threads.push(CommentNode {
                author: row.author,
                body: row.body,
                posted: row.posted,
                replies: Vec::new(),
            });
        }
    }
    threads
}

pub async fn list_for_blog(pool: &PgPool, slug: &str) -> Result<Vec<CommentNode>, sqlx::Error> {
    let rows = sqlx::query(
        "SELECT c.id, c.parent_id, c.replying_to, c.body,
                coalesce(p.name, 'Anonymous') AS author,
                to_char(c.created_at, 'Mon DD, YYYY') AS posted
         FROM comments c
         JOIN entries e ON e.id = c.entry_id
         JOIN commenters p ON p.id = c.commenter_id
         WHERE e.section = 'blog' AND e.slug = $1
         ORDER BY c.created_at",
    )
    .bind(slug)
    .fetch_all(pool)
    .await?;

    Ok(assemble_threads(
        rows.into_iter()
            .map(|row| RawComment {
                id: row.get("id"),
                parent_id: row.get("parent_id"),
                author: row.get("author"),
                replying_to: row.get("replying_to"),
                body: row.get("body"),
                posted: row.get("posted"),
            })
            .collect(),
    ))
}

#[cfg(test)]
mod tests {
    use super::*;

    fn raw(id: u128, parent: Option<u128>, author: &str, body: &str) -> RawComment {
        RawComment {
            id: uuid::Uuid::from_u128(id),
            parent_id: parent.map(uuid::Uuid::from_u128),
            author: author.to_string(),
            replying_to: None,
            body: body.to_string(),
            posted: "Aug 24, 2026".to_string(),
        }
    }

    #[test]
    fn replies_attach_to_their_thread() {
        let threads = assemble_threads(vec![
            raw(1, None, "a", "first thread"),
            raw(2, None, "b", "second thread"),
            raw(3, Some(2), "c", "reply to second"),
        ]);
        assert_eq!(threads.len(), 2);
        assert!(threads[0].replies.is_empty());
        assert_eq!(threads[1].replies.len(), 1);
        assert_eq!(threads[1].replies[0].body, "reply to second");
    }

    #[test]
    fn reply_to_a_reply_flattens_into_the_same_thread() {
        let threads = assemble_threads(vec![
            raw(1, None, "a", "thread"),
            raw(2, Some(1), "b", "reply"),
            raw(3, Some(2), "c", "reply to the reply"),
        ]);
        assert_eq!(threads.len(), 1, "deep replies must not become new threads");
        assert_eq!(threads[0].replies.len(), 2);
        assert_eq!(threads[0].replies[1].body, "reply to the reply");
    }

    #[test]
    fn unknown_parent_starts_its_own_thread() {
        let threads = assemble_threads(vec![raw(2, Some(99), "b", "orphan")]);
        assert_eq!(threads.len(), 1);
        assert!(threads[0].replies.is_empty());
    }

    #[test]
    fn order_is_preserved() {
        let threads = assemble_threads(vec![
            raw(1, None, "a", "one"),
            raw(2, None, "b", "two"),
            raw(3, Some(1), "c", "late reply to one"),
        ]);
        assert_eq!(threads[0].body, "one");
        assert_eq!(threads[1].body, "two");
        assert_eq!(threads[0].replies[0].body, "late reply to one");
    }
}
