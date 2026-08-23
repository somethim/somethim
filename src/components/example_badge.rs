use leptos::prelude::*;

/// A small reusable UI component. Shared components live in `src/components`;
/// route-level components live in `src/pages`.
#[component]
pub fn ExampleBadge(text: &'static str) -> impl IntoView {
    view! { <span class="example-badge">{text}</span> }
}
