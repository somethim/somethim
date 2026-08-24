use leptos::prelude::*;
use leptos_meta::Title;
use leptos_router::hooks::use_params_map;

use super::common::{catalog_editor, catalog_table, EditorContent};
use crate::{
    components::nav::AdminNav,
    constants::{
        content::admin::{PROJECT_FIELDS, PROJECT_ROWS, PROJECT_SUMMARY},
        page_title,
    },
};

#[component]
pub fn AdminProjectsPage() -> impl IntoView {
    view! {
        <Title text=page_title("admin / projects") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Projects"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <div class="admin-toolbar">
                    <button type="button" class="button-primary">
                        "＋ New project"
                    </button>
                </div>
                {catalog_table(
                    "Projects",
                    ["Title", "Category", "Updated", "Status"],
                    PROJECT_ROWS,
                    "/admin/projects",
                )}
            </div>
        </div>
    }
}

#[component]
pub fn AdminProjectEditPage() -> impl IntoView {
    let params = use_params_map();
    let project_id = move || params.read().get("project_id").unwrap_or_default();

    view! {
        <Title text=page_title("admin / projects / edit") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Edit project"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                {catalog_editor(
                    &EditorContent {
                        section: "Projects",
                        back_href: "/admin/projects",
                        title: "Cave Robot".to_string(),
                        status: "Published".to_string(),
                        draft: false,
                        fields: super::common::static_fields(PROJECT_FIELDS),
                        body_label: "Description",
                        body: PROJECT_SUMMARY.to_string(),
                        delete_label: "Delete project",
                    },
                    project_id,
                )}
            </div>
        </div>
    }
}
