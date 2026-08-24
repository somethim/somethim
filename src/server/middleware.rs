use std::{sync::Arc, time::Duration};

use axum::{
    extract::Request,
    http::{HeaderName, HeaderValue},
    middleware::Next,
    response::Response,
    Router,
};
use tower_governor::{
    governor::GovernorConfigBuilder, key_extractor::SmartIpKeyExtractor, GovernorLayer,
};

use super::AppState;

// per_millisecond, not per_second: this tower_governor version misbehaves
// with per_second (~60x slower than configured; verified empirically).
const RATE_LIMIT_BURST: u32 = 20;
const RATE_LIMIT_REPLENISH_MILLISECONDS: u64 = 500;
const RATE_LIMIT_CLEANUP_INTERVAL: Duration = Duration::from_mins(1);

const API_VERSION_HEADER: HeaderName = HeaderName::from_static("x-api-version");
const API_VERSION: HeaderValue = HeaderValue::from_static("1");

/// Wrap the API router with the middleware stack shared by every endpoint.
///
/// # Panics
///
/// Panics at startup if the rate-limit constants are invalid — `finish`
/// rejects a zero burst size or a zero replenish interval. This can only be
/// caused by editing the constants above, never by runtime input.
pub fn apply(api: Router<AppState>) -> Router<AppState> {
    let governor = Arc::new(
        GovernorConfigBuilder::default()
            .key_extractor(SmartIpKeyExtractor)
            .per_millisecond(RATE_LIMIT_REPLENISH_MILLISECONDS)
            .burst_size(RATE_LIMIT_BURST)
            .finish()
            .expect("rate limiter configuration should be valid"),
    );

    let limiter = Arc::clone(&governor);
    tokio::spawn(async move {
        loop {
            tokio::time::sleep(RATE_LIMIT_CLEANUP_INTERVAL).await;
            limiter.limiter().retain_recent();
        }
    });

    api.layer(GovernorLayer::new(governor))
        .layer(axum::middleware::from_fn(version_header))
}

/// Forces JSON responses for GET requests to the API.
///
/// Registered server functions are auto-mounted by `leptos_routes`, so this
/// runs as an outer layer over the whole app: a browser GET would otherwise
/// trigger the server-fn form-redirect (302 to the referer) because it sends
/// `Accept: text/html`. POSTs keep their Accept so no-JS form fallbacks stay
/// possible.
pub async fn json_api_accept(mut request: Request, next: Next) -> Response {
    if request.method() == axum::http::Method::GET
        && request
            .uri()
            .path()
            .starts_with(crate::constants::routes::api::ROOT)
    {
        request.headers_mut().insert(
            axum::http::header::ACCEPT,
            HeaderValue::from_static("application/json"),
        );
    }
    next.run(request).await
}

/// Serves the 404 page for `/admin/*` requests without a valid session.
///
/// The admin surface is invisible unless signed in. `/admin/login` stays
/// reachable, or nobody could ever sign in. SPA navigations bypass this
/// (no server request); the admin layout runs the same check client-side.
pub async fn admin_gate(
    axum::extract::State(state): axum::extract::State<super::AppState>,
    request: Request,
    next: Next,
) -> Response {
    let path = request.uri().path();
    let gated = (path == "/admin" || path.starts_with("/admin/")) && path != "/admin/login";
    if !gated {
        return next.run(request).await;
    }

    let mut authed = false;
    if let Some(pool) = &state.db {
        if let Some(token) = request
            .headers()
            .get(axum::http::header::COOKIE)
            .and_then(|value| value.to_str().ok())
            .and_then(crate::server::extract_session_token)
        {
            authed = crate::server::auth::repository::session_is_valid(
                pool,
                &crate::server::hash_session_token(token),
            )
            .await
            .unwrap_or(false);
        }
    }
    if authed {
        next.run(request).await
    } else {
        super::router::not_found_page(state, request).await
    }
}

async fn version_header(request: Request, next: Next) -> Response {
    let mut response = next.run(request).await;
    response
        .headers_mut()
        .insert(API_VERSION_HEADER, API_VERSION);
    response
}
