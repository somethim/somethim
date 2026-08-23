#[cfg(feature = "ssr")]
#[tokio::main]
async fn main() {
    use axum::{http::StatusCode, Router};
    use leptos::logging::log;
    use leptos::prelude::*;
    use leptos_axum::{generate_route_list, LeptosRoutes};
    use portfolio::app::{shell, App};

    let conf = get_configuration(None).expect("Leptos configuration should be valid");
    let addr = conf.leptos_options.site_addr;
    let leptos_options = conf.leptos_options;
    // Generate the list of routes in your Leptos App
    let routes = generate_route_list(App);

    let app = Router::new()
        // This is a regular Axum route. It does not render a Leptos component.
        // Monitoring systems can request GET /health to check that the server is up.
        .route(
            "/health",
            axum::routing::get(|| async { (StatusCode::OK, "ok") }),
        )
        .leptos_routes(&leptos_options, routes, {
            let leptos_options = leptos_options.clone();
            move || shell(leptos_options.clone())
        })
        .fallback(leptos_axum::file_and_error_handler(shell))
        .with_state(leptos_options);

    // run our app with hyper
    // `axum::Server` is a re-export of `hyper::Server`
    log!("listening on http://{}", &addr);
    let listener = tokio::net::TcpListener::bind(&addr)
        .await
        .expect("server address should be available");
    axum::serve(listener, app.into_make_service())
        .await
        .expect("Axum server should run successfully");
}

#[cfg(not(feature = "ssr"))]
pub fn main() {
    // no client-side main function
    // unless we want this to work with e.g., Trunk for pure client-side testing
    // see lib.rs for hydration function instead
}
