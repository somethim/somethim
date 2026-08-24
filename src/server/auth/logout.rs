use leptos::prelude::*;

#[server(endpoint = "auth/logout")]
pub async fn logout() -> Result<(), ServerFnError> {
    let pool = crate::server::require_pool()?;
    if let Some(token) = crate::server::request_session_token() {
        super::repository::delete_session(&pool, &crate::server::hash_session_token(&token))
            .await
            .map_err(|error| ServerFnError::new(error.to_string()))?;
    }
    crate::server::set_session_cookie(None);
    Ok(())
}
