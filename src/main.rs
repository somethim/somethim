#![recursion_limit = "256"]

#[cfg(feature = "ssr")]
#[tokio::main]
async fn main() {
    use axum::Router;
    use leptos::logging::log;
    use leptos::prelude::*;
    use leptos_axum::{generate_route_list, LeptosRoutes};
    use portfolio::app::{shell, App};
    use portfolio::server::{load_api, provide_server_context, AppState};

    let conf = get_configuration(None).expect("Leptos configuration should be valid");
    let addr = conf.leptos_options.site_addr;
    let leptos_options = conf.leptos_options;
    let routes = generate_route_list(App);

    let state = AppState {
        leptos_options: leptos_options.clone(),
        db: database_pool(),
    };

    let app = Router::new()
        .merge(load_api())
        // The context closure runs per request, so server functions called
        // during SSR see the database pool.
        .leptos_routes_with_context(
            &state,
            routes,
            {
                let db = state.db.clone();
                move || provide_server_context(db.clone())
            },
            {
                let leptos_options = leptos_options.clone();
                move || shell(leptos_options.clone())
            },
        )
        .fallback(leptos_axum::file_and_error_handler::<AppState, _>(shell))
        .layer(axum::middleware::from_fn(
            portfolio::server::middleware::json_api_accept,
        ))
        .layer(axum::middleware::from_fn_with_state(
            state.clone(),
            portfolio::server::middleware::admin_gate,
        ))
        .with_state(state);

    log!("listening on http://{}", &addr);
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .expect("server address should be available");
    // Connect info gives the rate limiter a peer-address fallback when no
    // proxy headers are present (local development, direct health checks).
    axum::serve(
        listener,
        app.into_make_service_with_connect_info::<std::net::SocketAddr>(),
    )
    .await
    .expect("Axum server should run successfully");
}

#[cfg(feature = "ssr")]
fn database_pool() -> Option<sqlx::PgPool> {
    use leptos::logging::log;

    let Ok(url) = std::env::var("DATABASE_URL") else {
        log!("DATABASE_URL is not set; continuing without a database");
        return None;
    };
    let pool = sqlx::postgres::PgPoolOptions::new()
        .acquire_timeout(std::time::Duration::from_secs(3))
        .connect_lazy(&url);
    if pool.is_err() {
        log!("DATABASE_URL is set but invalid; continuing without a database");
    }
    pool.ok()
}

#[cfg(not(feature = "ssr"))]
pub fn main() {}
