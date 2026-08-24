// Every function here fails for exactly one reason — the database call.
#![allow(clippy::missing_errors_doc)]

use sqlx::{PgPool, Row};

use super::{BlogPost, BlogPostInput};

fn from_row(row: &sqlx::postgres::PgRow) -> BlogPost {
    BlogPost {
        slug: row.get("slug"),
        title: row.get("title"),
        category: row.get("category"),
        body: row.get("body"),
        tags: row.get("tags"),
        published: row.get("published"),
        reading_time: row.get("reading_time"),
        previous: None,
        next: None,
        draft: false,
        comment_count: row.get("comment_count"),
        comments: Vec::new(),
    }
}

pub async fn find_published(pool: &PgPool, slug: &str) -> Result<Option<BlogPost>, sqlx::Error> {
    let row = sqlx::query(
        "SELECT e.slug, e.title, e.category, e.body,
                to_char(e.created_at, 'Mon DD, YYYY') AS published,
                e.extra->>'reading_time' AS reading_time,
                (SELECT count(*) FROM comments c WHERE c.entry_id = e.id) AS comment_count,
                coalesce(
                    (SELECT array_agg(t.name ORDER BY t.name)
                     FROM entry_tags et
                     JOIN tags t ON t.id = et.tag_id
                     WHERE et.entry_id = e.id),
                    '{}'
                ) AS tags
         FROM entries e
         WHERE e.section = 'blog' AND e.slug = $1 AND NOT e.draft",
    )
    .bind(slug)
    .fetch_optional(pool)
    .await?;
    let Some(mut post) = row.as_ref().map(from_row) else {
        return Ok(None);
    };
    (post.previous, post.next) = crate::server::entries::neighbors(pool, "blog", slug).await?;
    post.comments = crate::server::comments::repository::list_for_blog(pool, slug).await?;
    Ok(Some(post))
}

pub async fn list_published(pool: &PgPool) -> Result<Vec<BlogPost>, sqlx::Error> {
    let rows = sqlx::query(
        "SELECT e.slug, e.title, e.category,
                left(e.body, 300) AS body,
                to_char(e.created_at, 'Mon DD, YYYY') AS published,
                e.extra->>'reading_time' AS reading_time,
                (SELECT count(*) FROM comments c WHERE c.entry_id = e.id) AS comment_count,
                coalesce(
                    (SELECT array_agg(t.name ORDER BY t.name)
                     FROM entry_tags et
                     JOIN tags t ON t.id = et.tag_id
                     WHERE et.entry_id = e.id),
                    '{}'
                ) AS tags
         FROM entries e
         WHERE e.section = 'blog' AND NOT e.draft
         ORDER BY e.created_at DESC",
    )
    .fetch_all(pool)
    .await?;
    Ok(rows.iter().map(from_row).collect())
}

pub async fn insert(pool: &PgPool, post: &BlogPostInput) -> Result<(), sqlx::Error> {
    let mut tx = pool.begin().await?;
    let entry_id: uuid::Uuid = sqlx::query_scalar(
        "INSERT INTO entries (section, slug, title, category, body, draft)
         VALUES ('blog', $1, $2, $3, $4, $5)
         RETURNING id",
    )
    .bind(&post.slug)
    .bind(&post.title)
    .bind(&post.category)
    .bind(&post.body)
    .bind(post.draft)
    .fetch_one(&mut *tx)
    .await?;
    replace_tags(&mut tx, entry_id, &post.tags).await?;
    tx.commit().await
}

/// Full replace of the editable fields; `Ok(false)` when the slug matches
/// no blog post.
pub async fn update(pool: &PgPool, slug: &str, post: &BlogPostInput) -> Result<bool, sqlx::Error> {
    let mut tx = pool.begin().await?;
    let entry_id: Option<uuid::Uuid> = sqlx::query_scalar(
        "UPDATE entries
         SET slug = $2, title = $3, category = $4, body = $5, draft = $6
         WHERE section = 'blog' AND slug = $1
         RETURNING id",
    )
    .bind(slug)
    .bind(&post.slug)
    .bind(&post.title)
    .bind(&post.category)
    .bind(&post.body)
    .bind(post.draft)
    .fetch_optional(&mut *tx)
    .await?;
    let Some(entry_id) = entry_id else {
        return Ok(false);
    };
    replace_tags(&mut tx, entry_id, &post.tags).await?;
    tx.commit().await?;
    Ok(true)
}

pub async fn delete(pool: &PgPool, slug: &str) -> Result<bool, sqlx::Error> {
    let deleted = sqlx::query("DELETE FROM entries WHERE section = 'blog' AND slug = $1")
        .bind(slug)
        .execute(pool)
        .await?
        .rows_affected();
    Ok(deleted > 0)
}

async fn replace_tags(
    tx: &mut sqlx::PgTransaction<'_>,
    entry_id: uuid::Uuid,
    tags: &[String],
) -> Result<(), sqlx::Error> {
    sqlx::query("DELETE FROM entry_tags WHERE entry_id = $1")
        .bind(entry_id)
        .execute(&mut **tx)
        .await?;
    for tag in tags {
        let name = tag.trim().to_lowercase();
        if name.is_empty() {
            continue;
        }
        let tag_id: uuid::Uuid = sqlx::query_scalar(
            "INSERT INTO tags (name) VALUES ($1)
             ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
             RETURNING id",
        )
        .bind(&name)
        .fetch_one(&mut **tx)
        .await?;
        sqlx::query("INSERT INTO entry_tags (entry_id, tag_id) VALUES ($1, $2)")
            .bind(entry_id)
            .bind(tag_id)
            .execute(&mut **tx)
            .await?;
    }
    Ok(())
}

/// Admin reads: drafts included, `draft` column real.
pub async fn find_any(pool: &PgPool, slug: &str) -> Result<Option<BlogPost>, sqlx::Error> {
    let row = sqlx::query(
        "SELECT e.slug, e.title, e.category, e.body, e.draft,
                to_char(e.created_at, 'Mon DD, YYYY') AS published,
                e.extra->>'reading_time' AS reading_time,
                (SELECT count(*) FROM comments c WHERE c.entry_id = e.id) AS comment_count,
                coalesce(
                    (SELECT array_agg(t.name ORDER BY t.name)
                     FROM entry_tags et
                     JOIN tags t ON t.id = et.tag_id
                     WHERE et.entry_id = e.id),
                    '{}'
                ) AS tags
         FROM entries e
         WHERE e.section = 'blog' AND e.slug = $1",
    )
    .bind(slug)
    .fetch_optional(pool)
    .await?;
    let Some(mut post) = row.as_ref().map(|row| {
        let mut post = from_row(row);
        post.draft = row.get("draft");
        post
    }) else {
        return Ok(None);
    };
    post.comments = crate::server::comments::repository::list_for_blog(pool, slug).await?;
    Ok(Some(post))
}

pub async fn list_all(pool: &PgPool) -> Result<Vec<BlogPost>, sqlx::Error> {
    let rows = sqlx::query(
        "SELECT e.slug, e.title, e.category, e.draft,
                left(e.body, 200) AS body,
                to_char(e.created_at, 'Mon DD, YYYY') AS published,
                e.extra->>'reading_time' AS reading_time,
                (SELECT count(*) FROM comments c WHERE c.entry_id = e.id) AS comment_count,
                coalesce(
                    (SELECT array_agg(t.name ORDER BY t.name)
                     FROM entry_tags et
                     JOIN tags t ON t.id = et.tag_id
                     WHERE et.entry_id = e.id),
                    '{}'
                ) AS tags
         FROM entries e
         WHERE e.section = 'blog'
         ORDER BY e.created_at DESC",
    )
    .fetch_all(pool)
    .await?;
    Ok(rows
        .iter()
        .map(|row| {
            let mut post = from_row(row);
            post.draft = row.get("draft");
            post
        })
        .collect())
}

pub async fn set_draft(pool: &PgPool, slug: &str, draft: bool) -> Result<bool, sqlx::Error> {
    let changed = sqlx::query("UPDATE entries SET draft = $2 WHERE section = 'blog' AND slug = $1")
        .bind(slug)
        .bind(draft)
        .execute(pool)
        .await?
        .rows_affected();
    Ok(changed > 0)
}
