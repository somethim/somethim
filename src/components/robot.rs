use leptos::prelude::*;

use crate::constants::OWNER;

#[component]
pub fn NavRobot() -> impl IntoView {
    view! {
        <a class="nav-robot" href="/" aria-label=format!("{OWNER}, home") title="whoami">
            <span class="sprite-scale">
                <span class="sprite-slot">
                    <span class="sprite" />
                    <span class="sprite-eye eye-l" />
                    <span class="sprite-eye eye-r" />
                    <span class="sprite-antenna" />
                </span>
            </span>
        </a>
    }
}
