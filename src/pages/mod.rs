use leptos::prelude::*;
use leptos_meta::{Stylesheet, Title};
use leptos_router::components::{Router, Routes};

use crate::{
    components::{Behaviors, RobotCursor},
    constants::SITE_TITLE,
    pages::{admin::AdminRoutes, client::ClientRoutes, not_found::NotFoundPage},
};

mod admin;
mod client;
pub mod not_found;

#[must_use]
pub fn load_app() -> impl IntoView {
    provide_context(RobotCursor(RwSignal::new(false)));

    view! {
        <Stylesheet id="leptos" href="/pkg/portfolio.css" />
        <Title text=SITE_TITLE />
        <Behaviors />

        <Router>
            <div class="corner-tl" aria-hidden="true" />
            <div class="corner-tr" aria-hidden="true" />
            <div class="corner-bl" aria-hidden="true" />
            <div class="corner-br" aria-hidden="true" />

            <div class="app-container">
                <Routes fallback=|| {
                    view! { <NotFoundPage /> }
                }>
                    <ClientRoutes />
                    <AdminRoutes />
                </Routes>
            </div>
        </Router>
    }
}
