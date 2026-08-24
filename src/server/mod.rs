pub mod auth;
pub mod blogs;
pub mod comments;
#[cfg(feature = "ssr")]
pub mod entries;

use serde::{Deserialize, Serialize};

/// A neighbor link on detail pages (previous/next within a section).
#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct EntryLink {
    pub slug: String,
    pub title: String,
}

#[cfg(feature = "ssr")]
pub mod health;
#[cfg(feature = "ssr")]
pub mod middleware;

/// The admin session cookie. Holds a random token; only the token's SHA-256
/// hash is stored server-side.
pub const ADMIN_SESSION_COOKIE: &str = "admin_session";

/// Extracts the session token from a Cookie header value.
#[cfg(feature = "ssr")]
pub(crate) fn extract_session_token(cookies: &str) -> Option<&str> {
    cookies.split(';').find_map(|cookie| {
        cookie
            .trim()
            .strip_prefix(ADMIN_SESSION_COOKIE)
            .and_then(|rest| rest.strip_prefix('='))
            .filter(|value| !value.is_empty())
    })
}

/// The session token carried by the current request, if any.
#[cfg(feature = "ssr")]
pub(crate) fn request_session_token() -> Option<String> {
    leptos::prelude::use_context::<axum::http::request::Parts>().and_then(|parts| {
        parts
            .headers
            .get(axum::http::header::COOKIE)
            .and_then(|value| value.to_str().ok())
            .and_then(extract_session_token)
            .map(str::to_string)
    })
}

/// Mirrors the rate limiter's `SmartIpKeyExtractor`: proxy headers first,
/// then the peer address.
#[cfg(feature = "ssr")]
pub(crate) fn client_ip() -> Option<String> {
    let parts = leptos::prelude::use_context::<axum::http::request::Parts>()?;
    let header = |name: &str| {
        parts
            .headers
            .get(name)
            .and_then(|value| value.to_str().ok())
            .and_then(|value| value.split(',').next())
            .map(|value| value.trim().to_string())
            .filter(|value| !value.is_empty())
    };
    header("x-forwarded-for")
        .or_else(|| header("x-real-ip"))
        .or_else(|| {
            parts
                .extensions
                .get::<axum::extract::ConnectInfo<std::net::SocketAddr>>()
                .map(|info| info.0.ip().to_string())
        })
}

#[cfg(feature = "ssr")]
pub(crate) fn client_user_agent() -> Option<String> {
    let parts = leptos::prelude::use_context::<axum::http::request::Parts>()?;
    parts
        .headers
        .get(axum::http::header::USER_AGENT)
        .and_then(|value| value.to_str().ok())
        .map(|value| value.chars().take(400).collect())
}

#[cfg(feature = "ssr")]
fn hex(bytes: &[u8]) -> String {
    use std::fmt::Write;
    bytes.iter().fold(String::new(), |mut out, byte| {
        let _ = write!(out, "{byte:02x}");
        out
    })
}

#[cfg(feature = "ssr")]
pub(crate) fn new_session_token() -> String {
    hex(&rand::random::<[u8; 32]>())
}

#[cfg(feature = "ssr")]
pub(crate) fn hash_session_token(token: &str) -> String {
    use sha2::Digest;
    hex(&sha2::Sha256::digest(token.as_bytes()))
}

/// Sets (or, with `None`, clears) the session cookie on the response.
#[cfg(feature = "ssr")]
pub(crate) fn set_session_cookie(token: Option<&str>) {
    let Some(response) = leptos::prelude::use_context::<leptos_axum::ResponseOptions>() else {
        return;
    };
    let secure = if cfg!(debug_assertions) {
        ""
    } else {
        "; Secure"
    };
    let value = token.map_or_else(
        || format!("{ADMIN_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0{secure}"),
        |token| {
            format!(
                "{ADMIN_SESSION_COOKIE}={token}; Path=/; HttpOnly; SameSite=Lax; \
                 Max-Age=2592000{secure}"
            )
        },
    );
    if let Ok(header) = axum::http::HeaderValue::from_str(&value) {
        response.append_header(axum::http::header::SET_COOKIE, header);
    }
}

/// Whether this request carries a valid admin session (checked against the
/// sessions table).
#[cfg(feature = "ssr")]
pub(crate) async fn is_admin() -> bool {
    let Some(token) = request_session_token() else {
        return false;
    };
    let Some(pool) = leptos::prelude::use_context::<sqlx::PgPool>() else {
        return false;
    };
    auth::repository::session_is_valid(&pool, &hash_session_token(&token))
        .await
        .unwrap_or(false)
}

/// A rejected request is the caller's fault, not the server's: without this
/// the `Err` arm of a server function always answers 500.
#[cfg(feature = "ssr")]
fn rejected(status: axum::http::StatusCode, message: &str) -> leptos::prelude::ServerFnError {
    if let Some(response) = leptos::prelude::use_context::<leptos_axum::ResponseOptions>() {
        response.set_status(status);
    }
    leptos::prelude::ServerFnError::new(message)
}

#[cfg(feature = "ssr")]
pub(crate) fn unauthorized(message: &str) -> leptos::prelude::ServerFnError {
    rejected(axum::http::StatusCode::UNAUTHORIZED, message)
}

#[cfg(feature = "ssr")]
pub(crate) fn invalid(message: &str) -> leptos::prelude::ServerFnError {
    rejected(axum::http::StatusCode::BAD_REQUEST, message)
}

#[cfg(feature = "ssr")]
pub(crate) fn conflict(message: &str) -> leptos::prelude::ServerFnError {
    rejected(axum::http::StatusCode::CONFLICT, message)
}

#[cfg(feature = "ssr")]
pub(crate) fn not_found(message: &str) -> leptos::prelude::ServerFnError {
    rejected(axum::http::StatusCode::NOT_FOUND, message)
}

#[cfg(feature = "ssr")]
const AUTH_REQUIRED: &str = "admin authentication required";

/// The signed-in operator behind this request, or an auth error.
#[cfg(feature = "ssr")]
pub(crate) async fn require_admin_user(
) -> Result<(sqlx::PgPool, uuid::Uuid), leptos::prelude::ServerFnError> {
    use leptos::prelude::ServerFnError;
    let pool = require_pool()?;
    let token = request_session_token().ok_or_else(|| unauthorized(AUTH_REQUIRED))?;
    let user = auth::repository::session_user(&pool, &hash_session_token(&token))
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?
        .ok_or_else(|| unauthorized(AUTH_REQUIRED))?;
    Ok((pool, user))
}

/// Every mutation calls this first.
#[cfg(feature = "ssr")]
pub(crate) async fn require_admin() -> Result<(), leptos::prelude::ServerFnError> {
    if is_admin().await {
        Ok(())
    } else {
        Err(unauthorized(AUTH_REQUIRED))
    }
}

#[cfg(all(test, feature = "ssr"))]
mod tests {
    use super::{extract_session_token, hash_session_token};

    #[test]
    fn token_is_extracted_from_cookie_header() {
        assert_eq!(
            extract_session_token("admin_session=abc123"),
            Some("abc123")
        );
        assert_eq!(
            extract_session_token("theme=dark; admin_session=abc; other=1"),
            Some("abc")
        );
    }

    #[test]
    fn empty_or_missing_token_yields_none() {
        assert_eq!(extract_session_token("admin_session="), None);
        assert_eq!(extract_session_token(""), None);
        assert_eq!(extract_session_token("theme=dark"), None);
    }

    #[test]
    fn lookalike_cookie_names_yield_none() {
        assert_eq!(extract_session_token("xadmin_session=1"), None);
        assert_eq!(extract_session_token("admin_sessionx=1"), None);
        assert_eq!(extract_session_token("theme=admin_session=1"), None);
    }

    #[test]
    fn token_hashing_is_stable_and_hex() {
        let hash = hash_session_token("abc");
        assert_eq!(hash.len(), 64);
        assert_eq!(hash, hash_session_token("abc"));
        assert_ne!(hash, hash_session_token("abd"));
    }
}

/// HTTP caching for public reads. Admin responses (drafts visible) must
/// never land in a shared cache, so they get `private, no-store`; public
/// responses cache briefly and revalidate in the background.
#[cfg(feature = "ssr")]
pub(crate) fn cache_reads(admin: bool) {
    if let Some(response) = leptos::prelude::use_context::<leptos_axum::ResponseOptions>() {
        let value = if admin {
            "private, no-store"
        } else {
            "public, max-age=60, stale-while-revalidate=300"
        };
        response.insert_header(
            axum::http::header::CACHE_CONTROL,
            axum::http::HeaderValue::from_static(value),
        );
    }
}

/// The database pool for `#[server]` function bodies; provided into context
/// by the router for both dispatch paths (SSR and direct `/api` calls).
#[cfg(feature = "ssr")]
pub(crate) fn require_pool() -> Result<sqlx::PgPool, leptos::prelude::ServerFnError> {
    leptos::prelude::use_context::<sqlx::PgPool>()
        .ok_or_else(|| leptos::prelude::ServerFnError::new("database is not configured"))
}

#[cfg(feature = "ssr")]
mod router {
    use axum::{
        extract::{FromRef, Request, State},
        routing::{any, get},
        Router,
    };
    use leptos::prelude::{provide_context, LeptosOptions};
    use sqlx::PgPool;

    use super::{health, middleware};
    use crate::constants::routes::api;

    #[derive(Clone, FromRef)]
    pub struct AppState {
        pub leptos_options: LeptosOptions,
        pub db: Option<PgPool>,
    }

    pub fn provide_server_context(db: Option<PgPool>) {
        if let Some(pool) = db {
            provide_context(pool);
        }
    }

    async fn server_fns(
        State(state): State<AppState>,
        mut request: Request,
    ) -> axum::response::Response {
        use axum::response::IntoResponse as _;

        // The `/api` nest strips the prefix from the URI, but the server-fn
        // registry keys functions by their full path — put it back.
        let stripped = request
            .uri()
            .path_and_query()
            .map_or_else(|| "/".to_string(), ToString::to_string);
        if let Ok(uri) = format!("{}{stripped}", api::ROOT).parse() {
            *request.uri_mut() = uri;
        }

        let path = request.uri().path().to_string();
        let known = leptos::server_fn::axum::server_fn_paths().any(|(fn_path, _)| fn_path == path);
        if !known {
            return api_not_found(state, request).await;
        }

        leptos_axum::handle_server_fns_with_context(
            move || provide_server_context(state.db.clone()),
            request,
        )
        .await
        .into_response()
    }

    /// Unknown `/api` paths: the site's 404 page for browsers, JSON for
    /// everything else — both with a real 404 status.
    /// Renders the site's 404 page with a real 404 status.
    pub(super) async fn not_found_page(
        state: AppState,
        request: Request,
    ) -> axum::response::Response {
        use axum::http::StatusCode;
        use axum::response::IntoResponse as _;

        let handler = leptos_axum::file_and_error_handler::<AppState, _>(crate::app::shell);
        let uri = request.uri().clone();
        let mut response = handler(uri, State(state), request).await;
        *response.status_mut() = StatusCode::NOT_FOUND;
        response.into_response()
    }

    async fn api_not_found(state: AppState, request: Request) -> axum::response::Response {
        use axum::http::{header, StatusCode};
        use axum::response::IntoResponse as _;

        let wants_html = request
            .headers()
            .get(header::ACCEPT)
            .and_then(|value| value.to_str().ok())
            .is_some_and(|accept| accept.contains("text/html"));
        if wants_html {
            not_found_page(state, request).await
        } else {
            (
                StatusCode::NOT_FOUND,
                axum::Json(serde_json::json!({
                    "status": 404,
                    "error": format!("no endpoint at {}", request.uri().path()),
                })),
            )
                .into_response()
        }
    }

    pub fn load_api() -> Router<AppState> {
        let api = Router::new()
            .route(api::HEALTH, get(health::health))
            .route("/{*server_fn}", any(server_fns));

        Router::new().nest(api::ROOT, middleware::apply(api))
    }
}

#[cfg(feature = "ssr")]
pub use router::{load_api, provide_server_context, AppState};
