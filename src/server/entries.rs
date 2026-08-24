//! Repository helpers shared by every section resource (blogs, projects,
//! experience): things that operate on `entries` regardless of section.

// Every function here fails for exactly one reason — the database call.
#![allow(clippy::missing_errors_doc)]

use sqlx::{PgPool, Row};

use super::EntryLink;

/// The published neighbors of one entry on its section's timeline:
/// `(previous = older, next = newer)`.
pub async fn neighbors(
    pool: &PgPool,
    section: &str,
    slug: &str,
) -> Result<(Option<EntryLink>, Option<EntryLink>), sqlx::Error> {
    let row = sqlx::query(
        "WITH ordered AS (
             SELECT slug, title,
                    lag(slug) OVER w AS prev_slug,
                    lag(title) OVER w AS prev_title,
                    lead(slug) OVER w AS next_slug,
                    lead(title) OVER w AS next_title
             FROM entries
             WHERE section = $1::section AND NOT draft
             WINDOW w AS (ORDER BY created_at)
         )
         SELECT prev_slug, prev_title, next_slug, next_title
         FROM ordered WHERE slug = $2",
    )
    .bind(section)
    .bind(slug)
    .fetch_optional(pool)
    .await?;

    let link = |row: &sqlx::postgres::PgRow, slug_column: &str, title_column: &str| {
        let slug: Option<String> = row.get(slug_column);
        let title: Option<String> = row.get(title_column);
        slug.zip(title)
            .map(|(slug, title)| EntryLink { slug, title })
    };
    Ok(row.map_or((None, None), |row| {
        (
            link(&row, "prev_slug", "prev_title"),
            link(&row, "next_slug", "next_title"),
        )
    }))
}
