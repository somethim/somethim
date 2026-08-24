use crate::components::nav::AdminNav;
use crate::constants::content::admin::{NOT_FOUND_QUIPS, ROBOT_CHATTER};
use leptos::prelude::*;
use leptos_meta::Title;

fn quip_group(
    title: &'static str,
    label: &'static str,
    note: &'static str,
    quips: &'static [&'static str],
) -> impl IntoView {
    view! {
        <section class="admin-edit" aria-label=title>
            <details class="admin-collapse">
                <summary>
                    <div>
                        <p class="section-index">{label}</p>
                        <h2>{title}</h2>
                    </div>
                    <span class="admin-count">{quips.len()}</span>
                    <span class="collapse-arrow" aria-hidden="true">
                        "▾"
                    </span>
                </summary>
                <div class="admin-collapse-body">
                    <p class="admin-note">{note}</p>
                    {quips
                        .iter()
                        .map(|quip| {
                            view! {
                                <div class="quip-row">
                                    <input type="text" value=*quip />
                                    <button type="button" class="button-danger small">
                                        "Remove"
                                    </button>
                                </div>
                            }
                        })
                        .collect_view()}
                    <div class="admin-edit-footer">
                        <button type="button" class="button-ghost">
                            "＋ Add quip"
                        </button>
                        <button type="button" class="button-primary">
                            "Save changes ↘"
                        </button>
                    </div>
                </div>
            </details>
        </section>
    }
}

#[component]
pub fn AdminQuipsPage() -> impl IntoView {
    view! {
        <Title text=crate::constants::page_title("admin / quips") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Quips"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                {quip_group(
                    "404 quips",
                    "Quips / 404 page",
                    "One is shown at random under the lost robot on every 404. Third-person, about the missing page. Write [label](url) to embed a link.",
                    NOT_FOUND_QUIPS,
                )}
                {quip_group(
                    "Robot chatter",
                    "Quips / robot chatter",
                    "whoami mutters one of these in its speech bubble every so often, on every page. First-person, no page context.",
                    ROBOT_CHATTER,
                )}
            </div>
        </div>
    }
}
