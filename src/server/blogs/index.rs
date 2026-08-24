use leptos::prelude::*;

use super::BlogPost;

// One route for everyone: admin requests (valid session) see drafts, public
// requests see published posts only. Single-post reads embed the comment
// threads; list reads carry the comment counts.
#[server(endpoint = "blogs/get", input = server_fn::codec::GetUrl)]
pub async fn get_blog_post(slug: String) -> Result<Option<BlogPost>, ServerFnError> {
    let pool = crate::server::require_pool()?;
    let admin = crate::server::is_admin().await;
    crate::server::cache_reads(admin);
    let post = if admin {
        super::repository::find_any(&pool, &slug).await
    } else {
        super::repository::find_published(&pool, &slug).await
    };
    post.map_err(|error| ServerFnError::new(error.to_string()))
}

#[server(endpoint = "blogs/index", input = server_fn::codec::GetUrl)]
pub async fn list_blog_posts() -> Result<Vec<BlogPost>, ServerFnError> {
    let pool = crate::server::require_pool()?;
    let admin = crate::server::is_admin().await;
    crate::server::cache_reads(admin);
    let posts = if admin {
        super::repository::list_all(&pool).await
    } else {
        super::repository::list_published(&pool).await
    };
    posts.map_err(|error| ServerFnError::new(error.to_string()))
}
