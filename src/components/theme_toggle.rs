use leptos::prelude::*;
use leptos_icons::Icon;

use crate::constants::{Theme, THEME_STORAGE_KEY};

#[component]
pub fn ThemeToggle() -> impl IntoView {
    Effect::new(move |_| {
        let stored_theme = web_sys::window()
            .and_then(|window| window.local_storage().ok())
            .flatten()
            .and_then(|storage| storage.get_item(THEME_STORAGE_KEY).ok())
            .flatten()
            .and_then(|value| Theme::from_storage(&value));

        if let (Some(theme), Some(body)) = (stored_theme, document().body()) {
            match theme {
                Theme::Light => {
                    let _ = body.class_list().add_1("light-mode");
                }
                Theme::Dark => {
                    let _ = body.class_list().remove_1("light-mode");
                }
            }
        }
    });

    view! {
        <button
            type="button"
            class="dark-mode-toggle"
            aria-label="Toggle theme"
            on:click=move |_| {
                if let Some(body) = document().body() {
                    let is_light = body.class_list().toggle("light-mode").unwrap_or(false);
                    let theme = if is_light { Theme::Light } else { Theme::Dark };
                    if let Some(storage) = web_sys::window()
                        .and_then(|window| window.local_storage().ok())
                        .flatten()
                    {
                        let _ = storage.set_item(THEME_STORAGE_KEY, theme.storage_value());
                    }
                }
            }
        >
            <span class="icon-sun" aria-hidden="true">
                <Icon icon=icondata::LuSun width="15" height="15" />
            </span>
            <span class="icon-moon" aria-hidden="true">
                <Icon icon=icondata::LuMoon width="15" height="15" />
            </span>
        </button>
    }
}
