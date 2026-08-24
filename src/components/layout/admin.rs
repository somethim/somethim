use leptos::prelude::*;
use leptos_router::components::Outlet;
use leptos_router::hooks::{use_location, use_navigate};

use crate::components::{NavRobot, ThemeToggle};
use crate::constants::OWNER;
use crate::pages::not_found::NotFoundPage;
use crate::server::auth::logout::Logout;
use crate::server::auth::session::session_active;

fn admin_chrome(on_login: impl Fn() -> bool + Copy + Send + Sync + 'static) -> impl IntoView {
    let logout = ServerAction::<Logout>::new();
    Effect::new(move |_| {
        if logout.value().get() == Some(Ok(())) {
            use_navigate()("/admin/login", leptos_router::NavigateOptions::default());
        }
    });

    view! {
        <nav class="navbar" aria-label="Admin utilities">
            <div class="nav-content">
                <div class="nav-left">
                    <NavRobot />
                </div>
                <div class="nav-center">
                    <a class="nav-link" href="/">
                        "view site ↗"
                    </a>
                </div>
                <div class="nav-right">
                    {move || {
                        (!on_login())
                            .then(|| {
                                view! {
                                    <button
                                        type="button"
                                        class="nav-link nav-logout"
                                        on:click=move |_| {
                                            logout.dispatch(Logout {});
                                        }
                                    >
                                        "log out ⏻"
                                    </button>
                                }
                            })
                    }} <ThemeToggle />
                </div>
            </div>
        </nav>
        <main class="main-content admin-main">
            <Outlet />
        </main>
        <footer class="site-footer">
            <span>{OWNER} " · Admin"</span>
            <span>{move || if on_login() { "Not signed in" } else { "Signed in" }}</span>
        </footer>
    }
}

#[allow(clippy::must_use_candidate)]
#[component]
pub fn AdminLayout() -> impl IntoView {
    let pathname = use_location().pathname;
    let on_login = move || pathname.get() == "/admin/login";
    // Hard loads are gated by the server middleware (404 without a session);
    // this covers client-side navigation into /admin.
    let session = Resource::new(move || pathname.get(), |_| session_active());

    view! {
        <Suspense fallback=|| ()>
            {move || {
                let allowed = on_login() || session.get().is_none_or(|result| result == Ok(true));
                if allowed {
                    admin_chrome(on_login).into_any()
                } else {
                    view! { <NotFoundPage /> }.into_any()
                }
            }}
        </Suspense>
    }
}
