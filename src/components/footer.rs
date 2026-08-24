use leptos::prelude::*;

use crate::{
    components::RobotCursor,
    constants::{OWNER, ROLE},
};

#[allow(clippy::must_use_candidate)]
#[component]
pub fn Footer(cookie_banner_visible: RwSignal<bool>) -> impl IntoView {
    let robot_cursor = expect_context::<RobotCursor>().0;

    view! {
        <footer class="site-footer">
            <span>{OWNER} " · " {ROLE}</span>
            <span>
                "Server-rendered · Built with "
                <a href="https://leptos.dev" target="_blank" rel="noopener noreferrer">
                    "Leptos"
                </a> " · "
                <button
                    type="button"
                    class="footer-btn cookies-open"
                    aria-expanded=move || cookie_banner_visible.get().to_string()
                    on:click=move |_| cookie_banner_visible.set(true)
                >
                    "Cookies"
                // The discoverable way out of the konami-code robot cursor
                </button>
                <Show when=move || {
                    robot_cursor.get()
                }>
                    " · "
                    <button
                        type="button"
                        class="footer-btn"
                        on:click=move |_| robot_cursor.set(false)
                    >
                        "Eject robot"
                    </button>
                </Show>
            </span>
        </footer>
    }
}
