use leptos::prelude::*;

use super::BlogPostInput;

#[server(endpoint = "blogs/update")]
pub async fn update_blog_post(slug: String, post: BlogPostInput) -> Result<(), ServerFnError> {
    crate::server::require_admin().await?;
    let pool = crate::server::require_pool()?;
    let updated = super::repository::update(&pool, &slug, &post)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?;
    if updated {
        Ok(())
    } else {
        Err(crate::server::not_found(&format!(
            "no blog post at '{slug}'"
        )))
    }
}

/// Publish/unpublish without touching the content.
#[server(endpoint = "blogs/set_draft")]
pub async fn set_blog_draft(slug: String, draft: bool) -> Result<(), ServerFnError> {
    crate::server::require_admin().await?;
    let pool = crate::server::require_pool()?;
    let changed = super::repository::set_draft(&pool, &slug, draft)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?;
    if changed {
        Ok(())
    } else {
        Err(crate::server::not_found(&format!(
            "no blog post at '{slug}'"
        )))
    }
}
