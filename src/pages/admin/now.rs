use leptos::prelude::*;
use leptos_meta::Title;

use crate::{
    components::nav::AdminNav,
    constants::{
        content::{
            admin::{NOW_BUILDING, NOW_STATUS_FIELDS},
            client::TOOLBOX,
        },
        page_title,
    },
};

fn status_section() -> impl IntoView {
    view! {
        <section class="admin-edit" aria-label="Status readout">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Now / status readout"</p>
                    <h2>"systemctl status arbi.service"</h2>
                </div>
            </div>
            <p class="admin-note">
                "The terminal card at the top of /now. Keep the lines short — they render verbatim."
            </p>
            {NOW_STATUS_FIELDS
                .iter()
                .map(|field| {
                    view! {
                        <div class="field">
                            <label>{field.label}</label>
                            <input type="text" value=field.value />
                        </div>
                    }
                })
                .collect_view()}
        </section>
    }
}

fn building_section() -> impl IntoView {
    view! {
        <section class="admin-edit" aria-label="Building">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Now / building"</p>
                    <h2>"Building"</h2>
                </div>
                <button type="button" class="button-ghost small">
                    "＋ Add entry"
                </button>
            </div>
            <p class="admin-note">
                "What has my attention right now — one paragraph per entry, dated automatically."
            </p>
            {NOW_BUILDING
                .iter()
                .map(|entry| {
                    view! {
                        <div class="field">
                            <label>"Entry"</label>
                            <textarea rows="2">{*entry}</textarea>
                        </div>
                    }
                })
                .collect_view()}
            <div class="field">
                <label>"Tags"</label>
                <input type="text" value="Rust, Leptos, Robotics" />
            </div>
        </section>
    }
}

fn toolbox_section() -> impl IntoView {
    view! {
        <section class="admin-edit" aria-label="Toolbox">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Now / toolbox"</p>
                    <h2>"Toolbox"</h2>
                </div>
                <button type="button" class="button-ghost small">
                    "＋ Add tool"
                </button>
            </div>
            <p class="admin-note">
                "Daily drivers, rendered as tags. The reading card pulls from the Library — manage it there."
            </p>
            {TOOLBOX
                .iter()
                .map(|tool| {
                    view! {
                        <div class="quip-row">
                            <input type="text" value=*tool />
                            <button type="button" class="button-danger small">
                                "Remove"
                            </button>
                        </div>
                    }
                })
                .collect_view()}
            <div class="admin-edit-footer">
                <p class="admin-note">"Changes publish to the live site on save."</p>
                <div class="admin-action-group">
                    <button type="button" class="button-ghost">
                        "Discard"
                    </button>
                    <button type="button" class="button-primary">
                        "Save now page ↘"
                    </button>
                </div>
            </div>
        </section>
    }
}

#[component]
pub fn AdminNowPage() -> impl IntoView {
    view! {
        <Title text=page_title("admin / now") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Now"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                {status_section()} {building_section()} {toolbox_section()}
            </div>
        </div>
    }
}
