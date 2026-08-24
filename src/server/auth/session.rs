use leptos::prelude::*;

/// Whether the current request carries a valid admin session. Used by the
/// admin layout for client-side navigation; hard loads are gated by the
/// server middleware.
#[server(endpoint = "auth/session", input = server_fn::codec::GetUrl)]
pub async fn session_active() -> Result<bool, ServerFnError> {
    crate::server::cache_reads(true);
    Ok(crate::server::is_admin().await)
}
