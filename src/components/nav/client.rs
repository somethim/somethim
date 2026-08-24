use leptos::prelude::*;
use leptos_router::hooks::use_location;

use crate::components::{NavRobot, ThemeToggle};
use crate::constants::routes::CLIENT_ROUTES;

#[component]
pub fn ClientNav() -> impl IntoView {
    let pathname = use_location().pathname;

    view! {
        <nav class="navbar" aria-label="Primary navigation">
            <div class="nav-content">
                <div class="nav-left">
                    <Show when=move || pathname.get() != "/">
                        <NavRobot />
                    </Show>
                </div>

                <div class="nav-center">
                    {CLIENT_ROUTES
                        .iter()
                        .map(|entry| {
                            let nested_prefix = format!("{}/", entry.path);
                            view! {
                                <a
                                    id=entry.id
                                    class="nav-link"
                                    href=entry.path
                                    aria-current=move || {
                                        let current = pathname.get();
                                        (current == entry.path
                                            || current.starts_with(&nested_prefix))
                                            .then_some("page")
                                    }
                                >
                                    {entry.title}
                                </a>
                            }
                        })
                        .collect_view()}
                </div>

                <div class="nav-right">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    }
}
