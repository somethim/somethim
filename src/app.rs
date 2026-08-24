use crate::{constants::DEFAULT_THEME, pages::load_app};
use leptos::prelude::*;
use leptos_meta::{provide_meta_context, MetaTags};

#[must_use]
pub fn shell(options: LeptosOptions) -> impl IntoView {
    view! {
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link
                    rel="preload"
                    href="/fonts/ibmplexmono--F63fjptAgt5VM-kVkqdyU8n1i8q1w.woff2"
                    r#as="font"
                    type="font/woff2"
                    crossorigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/inter-UcCo3FwrK3iLTcviYwY.woff2"
                    r#as="font"
                    type="font/woff2"
                    crossorigin="anonymous"
                />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="icon" href="/favicon.ico" sizes="48x48" />
                <script src="/passkey.js" defer />
                <AutoReload options=options.clone() />
                <HydrationScripts options />
                <MetaTags />
            </head>
            <body class=DEFAULT_THEME.body_class()>
                <App />
            </body>
        </html>
    }
}

#[allow(clippy::must_use_candidate)]
#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();
    load_app()
}
