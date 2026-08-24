use leptos::prelude::*;
use leptos_meta::Title;

use crate::{
    components::HeroTyped,
    constants::{
        content::client::{HOME_METRICS, PROFILE_SUMMARY, PROFILE_TAGLINE},
        LOCATION, OWNER, SITE_TITLE, TERMINAL_USER,
    },
};

#[component]
pub fn HomePage() -> impl IntoView {
    view! {
        <Title text=SITE_TITLE />

        <div class="home-container">
            <div class="hero-grid-square" aria-hidden="true" />
            <div class="hero-dot" aria-hidden="true" />

            <div class="home-content">
                <p class="eyebrow">
                    <span class="status-dot" aria-hidden="true" />
                    {LOCATION}
                </p>

                <div class="home-hero">
                    <div class="sprite-slot" aria-hidden="true" title="whoami">
                        <div class="sprite" />
                        <div class="sprite-eye eye-l" />
                        <div class="sprite-eye eye-r" />
                        <div class="sprite-antenna" />
                    </div>

                    <div>
                        <p class="home-prompt">
                            <span class="prompt-user">{TERMINAL_USER}</span>
                            ":~$"
                        </p>
                        <h1 class="home-logo">
                            <HeroTyped name=OWNER />
                            <span class="cursor" aria-hidden="true" />
                        </h1>
                    </div>
                </div>

                <p class="home-tagline">{PROFILE_TAGLINE}</p>
                <p class="home-summary">{PROFILE_SUMMARY}</p>

                <div class="evidence" aria-label="Selected engineering evidence">
                    {HOME_METRICS
                        .iter()
                        .map(|metric| {
                            view! {
                                <div>
                                    <strong>{metric.value}</strong>
                                    <span>{metric.label}</span>
                                </div>
                            }
                        })
                        .collect_view()}
                </div>
            </div>
        </div>
    }
}
