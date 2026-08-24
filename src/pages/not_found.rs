use leptos::prelude::*;
use leptos_meta::Title;

use crate::{
    components::random_index,
    constants::{content::admin::NOT_FOUND_QUIPS, OWNER, TERMINAL_USER},
};

/// Extracts one `[label](url)` span: `(prefix, label, url, suffix)`.
fn parse_quip_link(quip: &str) -> Option<(&str, &str, &str, &str)> {
    let open = quip.find('[')?;
    let mid = open + quip[open..].find("](")?;
    let close = mid + quip[mid..].find(')')?;
    Some((
        &quip[..open],
        &quip[open + 1..mid],
        &quip[mid + 2..close],
        &quip[close + 1..],
    ))
}

fn quip_view(quip: &'static str) -> AnyView {
    let Some((prefix, label, url, suffix)) = parse_quip_link(quip) else {
        return quip.into_any();
    };
    view! {
        {prefix}
        <a href=url target="_blank" rel="noopener noreferrer">
            {label}
        </a>
        {suffix}
    }
    .into_any()
}

#[allow(clippy::must_use_candidate)]
#[component]
pub fn NotFoundPage() -> impl IntoView {
    let quip = RwSignal::new(None::<usize>);
    Effect::new(move |_| quip.set(Some(random_index(NOT_FOUND_QUIPS.len()))));

    view! {
        <Title text=format!("404 — {OWNER}") />

        <main class="main-content not-found-main">
            <div class="home-container">
                <div class="home-content">
                    <p class="eyebrow eyebrow-err">
                        <span class="status-dot" aria-hidden="true" />
                        "HTTP 404"
                    </p>

                    <div class="home-hero">
                        <div class="sprite-slot lost" aria-hidden="true">
                            <div class="sprite" />
                            <div class="sprite-eye eye-l" />
                            <div class="sprite-eye eye-r" />
                            <div class="sprite-antenna" />
                        </div>

                        <div>
                            <p class="home-prompt">
                                <span class="prompt-user">{TERMINAL_USER}</span>
                                ":~$ cd /this-page"
                            </p>
                            <h1 class="home-logo">"not found"</h1>
                        </div>
                    </div>

                    <p class="home-summary">
                        "This path doesn't exist — maybe it moved, maybe it never did."
                        <span id="quip">
                            {move || quip.get().map(|index| quip_view(NOT_FOUND_QUIPS[index]))}
                        </span>
                    </p>

                    <div class="detail-actions">
                        <a class="button-outline" href="/">
                            "← Back home"
                        </a>
                    </div>
                </div>
            </div>
        </main>
    }
}

#[cfg(test)]
mod tests {
    use super::parse_quip_link;

    #[test]
    fn plain_text_has_no_link() {
        assert_eq!(parse_quip_link("Your page is in another castle."), None);
    }

    #[test]
    fn extracts_a_markdown_link_with_surrounding_text() {
        let quip = "To report this, please [click here](https://example.com) now.";
        assert_eq!(
            parse_quip_link(quip),
            Some((
                "To report this, please ",
                "click here",
                "https://example.com",
                " now."
            ))
        );
    }

    #[test]
    fn bracket_without_url_is_not_a_link() {
        assert_eq!(parse_quip_link("array[0] is not a link"), None);
        assert_eq!(parse_quip_link("[label]( unterminated"), None);
    }

    #[test]
    fn link_at_string_edges() {
        assert_eq!(
            parse_quip_link("[go](https://a.b)"),
            Some(("", "go", "https://a.b", ""))
        );
    }
}
