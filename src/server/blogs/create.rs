use leptos::prelude::*;

use super::BlogPostInput;

#[server(endpoint = "blogs/create")]
pub async fn create_blog_post(post: BlogPostInput) -> Result<(), ServerFnError> {
    crate::server::require_admin().await?;
    let pool = crate::server::require_pool()?;
    super::repository::insert(&pool, &post)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))
}
