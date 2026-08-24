use leptos::prelude::*;
use leptos_meta::{provide_meta_context, MetaTags, Stylesheet, Title};
use leptos_router::{
    components::{Route, Router, Routes, A},
    StaticSegment,
};

use crate::pages::LabPage;

// `#[server]` exposes this Rust function to browser code. On the server, its
// body runs normally. In the browser build, Leptos generates a client that
// sends an HTTP request to the server-function endpoint.
#[allow(clippy::unused_async)]
#[server]
pub async fn write_server_log() -> Result<String, ServerFnError> {
    leptos::logging::log!("write_server_log was called");
    Ok("Check the terminal running cargo leptos watch.".to_string())
}

#[must_use]
pub fn shell(options: LeptosOptions) -> impl IntoView {
    view! {
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
                <link rel="icon" href="/favicon.ico" sizes="48x48"/>
                <AutoReload options=options.clone() />
                <HydrationScripts options/>
                <MetaTags/>
            </head>
            <body>
                <App/>
            </body>
        </html>
    }
}

#[allow(clippy::must_use_candidate)]
#[component]
pub fn App() -> impl IntoView {
    // Provides context that manages stylesheets, titles, meta tags, etc.
    provide_meta_context();

    view! {
        // injects a stylesheet into the document <head>
        // id=leptos means cargo-leptos will hot-reload this stylesheet
        <Stylesheet id="leptos" href="/pkg/portfolio.css"/>

        // sets the document title
        <Title text="Welcome to Leptos"/>

        // content for this welcome page
        <Router>
            <nav class="site-nav" aria-label="Primary navigation">
                <A href="/">"Home"</A>
                <A href="/lab">"Lab"</A>
            </nav>
            <main>
                <Routes fallback=|| "Page not found.".into_view()>
                    <Route path=StaticSegment("") view=HomePage/>
                    <Route path=StaticSegment("lab") view=LabPage/>
                </Routes>
            </main>
        </Router>
    }
}

/// Renders the home page of your application.
#[component]
fn HomePage() -> impl IntoView {
    // Creates a reactive value to update the button
    let count = RwSignal::new(0);
    let on_click = move |_| *count.write() += 1;

    // An Action represents an async operation triggered by the UI. Calling
    // write_server_log() here invokes the generated HTTP client in the browser.
    let log_action = Action::new(|()| write_server_log());

    view! {
        <h1>"Welcome to Leptos!"</h1>
        <button on:click=on_click>"Click Me: " {count}</button>

        <button
            on:click=move |_| { log_action.dispatch(()); }
            disabled=move || log_action.pending().get()
        >
            {move || if log_action.pending().get() { "Logging..." } else { "Log on server" }}
        </button>

        <p>
            {move || {
                log_action.value().get().map(|result| match result {
                    Ok(message) => message,
                    Err(error) => format!("Server function failed: {error}"),
                })
            }}
        </p>
    }
}

#[cfg(all(test, feature = "ssr"))]
mod tests {
    use super::write_server_log;

    #[tokio::test]
    async fn server_function_returns_a_confirmation() {
        let result = write_server_log()
            .await
            .expect("the example server function should succeed");

        assert_eq!(result, "Check the terminal running cargo leptos watch.");
    }
}
