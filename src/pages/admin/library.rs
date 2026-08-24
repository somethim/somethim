use leptos::prelude::*;
use leptos_meta::Title;
use leptos_router::hooks::use_params_map;

use super::common::{catalog_editor, catalog_table, EditorContent};
use crate::{
    components::nav::AdminNav,
    constants::{
        content::admin::{LIBRARY_EDIT_FIELDS, LIBRARY_EDIT_TITLE, LIBRARY_NOTE, LIBRARY_ROWS},
        page_title,
    },
};

#[component]
pub fn AdminLibraryPage() -> impl IntoView {
    view! {
        <Title text=page_title("admin / library") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Library"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <div class="admin-toolbar">
                    <button type="button" class="button-primary">
                        "＋ New book"
                    </button>
                </div>
                {catalog_table(
                    "Library",
                    ["Title", "Author · Topic", "Updated", "Status"],
                    LIBRARY_ROWS,
                    "/admin/library",
                )}
            </div>
        </div>
    }
}

#[component]
pub fn AdminLibraryEditPage() -> impl IntoView {
    let params = use_params_map();
    let library_id = move || params.read().get("library_id").unwrap_or_default();

    view! {
        <Title text=page_title("admin / library / edit") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Edit book"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                {catalog_editor(
                    &EditorContent {
                        section: "Library",
                        back_href: "/admin/library",
                        title: LIBRARY_EDIT_TITLE.to_string(),
                        status: "Reading".to_string(),
                        draft: true,
                        fields: super::common::static_fields(LIBRARY_EDIT_FIELDS),
                        body_label: "Note",
                        body: LIBRARY_NOTE.to_string(),
                        delete_label: "Delete book",
                    },
                    library_id,
                )}
            </div>
        </div>
    }
}
