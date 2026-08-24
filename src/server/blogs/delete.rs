use leptos::prelude::*;

#[server(endpoint = "blogs/delete")]
pub async fn delete_blog_post(slug: String) -> Result<(), ServerFnError> {
    crate::server::require_admin().await?;
    let pool = crate::server::require_pool()?;
    let deleted = super::repository::delete(&pool, &slug)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?;
    if deleted {
        Ok(())
    } else {
        Err(crate::server::not_found(&format!(
            "no blog post at '{slug}'"
        )))
    }
}
