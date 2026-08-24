use leptos::prelude::*;

use crate::constants::COOKIE_CONSENT_KEY;

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
enum Consent {
    All,
    Essentials,
}

impl Consent {
    const fn storage_value(self) -> &'static str {
        match self {
            Self::All => "all",
            Self::Essentials => "essential",
        }
    }

    fn from_storage(value: &str) -> Option<Self> {
        match value {
            "all" => Some(Self::All),
            "essential" => Some(Self::Essentials),
            _ => None,
        }
    }
}

fn stored_consent() -> Option<Consent> {
    let value = web_sys::window()?
        .local_storage()
        .ok()
        .flatten()?
        .get_item(COOKIE_CONSENT_KEY)
        .ok()
        .flatten()?;

    Consent::from_storage(&value)
}

fn save_consent(value: Consent) {
    if let Some(storage) = web_sys::window()
        .and_then(|window| window.local_storage().ok())
        .flatten()
    {
        let _ = storage.set_item(COOKIE_CONSENT_KEY, value.storage_value());
    }
}

#[component]
pub fn CookieConsent(banner_visible: RwSignal<bool>) -> impl IntoView {
    let can_dismiss = RwSignal::new(false);

    // Start hidden so returning visitors never see an SSR/hydration flash.
    // The client-side storage check reveals it only when no choice exists.
    Effect::new(move |_| {
        let has_stored_consent = stored_consent().is_some();
        can_dismiss.set(has_stored_consent);

        if !has_stored_consent {
            banner_visible.set(true);
        }
    });

    let save = move |choice: Consent| {
        save_consent(choice);
        can_dismiss.set(true);
        banner_visible.set(false);
    };

    view! {
        <Show when=move || banner_visible.get()>
            <section class="cookie-banner" role="region" aria-label="Cookie consent">
                <div class="cookie-banner-head">
                    <p class="section-index">"Cookies"</p>
                    <Show when=move || can_dismiss.get()>
                        <button
                            type="button"
                            class="cookie-close"
                            aria-label="Close cookie choices"
                            on:click=move |_| banner_visible.set(false)
                        >
                            "✕"
                        </button>
                    </Show>
                </div>
                <p>
                    "A session cookie keeps sign-ins alive; an anonymous first-party counter powers the post view counts. Nothing is shared with third parties."
                </p>
                <div class="cookie-actions">
                    <button
                        type="button"
                        class="button-primary small"
                        on:click=move |_| save(Consent::All)
                    >
                        "Accept"
                    </button>
                    <button
                        type="button"
                        class="button-ghost small"
                        on:click=move |_| save(Consent::Essentials)
                    >
                        "Essential only"
                    </button>
                </div>
            </section>
        </Show>
    }
}
