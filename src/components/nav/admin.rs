use leptos::prelude::*;
use leptos_icons::Icon;
use leptos_router::hooks::use_location;

use crate::constants::routes::ADMIN_ROUTES;

#[component]
pub fn AdminNav() -> impl IntoView {
    let pathname = use_location().pathname;

    view! {
        <aside class="admin-sidebar">
            <nav class="admin-nav" aria-label="Admin navigation">
                {ADMIN_ROUTES
                    .iter()
                    .map(|entry| {
                        view! {
                            <a
                                id=entry.id
                                href=entry.path
                                class=move || (pathname.get() == entry.path).then_some("active")
                            >
                                {entry
                                    .icon
                                    .map(|icon| {
                                        view! { <Icon icon width="18" height="18" /> }
                                    })}
                                <span>{entry.title}</span>
                                {entry
                                    .count
                                    .map(|count| {
                                        view! { <span class="admin-count">{count}</span> }
                                    })}
                            </a>
                        }
                    })
                    .collect_view()}
            </nav>
        </aside>
    }
}
