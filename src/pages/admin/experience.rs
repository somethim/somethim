use leptos::prelude::*;
use leptos_meta::Title;
use leptos_router::hooks::use_params_map;

use super::common::{catalog_editor, catalog_table, EditorContent};
use crate::{
    components::nav::AdminNav,
    constants::{
        content::admin::{EXPERIENCE_FIELDS, EXPERIENCE_ROWS, EXPERIENCE_SUMMARY},
        page_title,
    },
};

#[component]
pub fn AdminExperiencePage() -> impl IntoView {
    view! {
        <Title text=page_title("admin / experience") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Experience"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <div class="admin-toolbar">
                    <button type="button" class="button-primary">
                        "＋ New entry"
                    </button>
                </div>
                {catalog_table(
                    "Experience",
                    ["Company", "Role", "Period", "Status"],
                    EXPERIENCE_ROWS,
                    "/admin/experience",
                )}
            </div>
        </div>
    }
}

#[component]
pub fn AdminExperienceEditPage() -> impl IntoView {
    let params = use_params_map();
    let experience_id = move || params.read().get("experience_id").unwrap_or_default();

    view! {
        <Title text=page_title("admin / experience / edit") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Edit entry"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                {catalog_editor(
                    &EditorContent {
                        section: "Experience",
                        back_href: "/admin/experience",
                        title: "Zennit".to_string(),
                        status: "Published".to_string(),
                        draft: false,
                        fields: super::common::static_fields(EXPERIENCE_FIELDS),
                        body_label: "Summary",
                        body: EXPERIENCE_SUMMARY.to_string(),
                        delete_label: "Delete entry",
                    },
                    experience_id,
                )}
            </div>
        </div>
    }
}
