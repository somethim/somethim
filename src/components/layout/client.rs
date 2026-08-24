use leptos::prelude::*;
use leptos_router::components::Outlet;

use crate::components::{footer::Footer, nav::ClientNav, CookieConsent};

#[allow(clippy::must_use_candidate)]
#[component]
pub fn ClientLayout(children: Children) -> impl IntoView {
    let cookie_banner_visible = RwSignal::new(false);

    view! {
        <ClientNav />
        <main class="main-content">{children()}</main>
        <Footer cookie_banner_visible />
        <CookieConsent banner_visible=cookie_banner_visible />
    }
}

#[allow(clippy::must_use_candidate)]
#[component]
pub fn ClientRouteLayout() -> impl IntoView {
    view! {
        <ClientLayout>
            <Outlet />
        </ClientLayout>
    }
}
