use leptos::prelude::*;

use crate::components::table::{chip_toggle, chip_toggle_owned, data_table, Column};
use crate::constants::content::admin::{CatalogRow, Field};

const CATALOG_WIDTHS: &str = "minmax(0, 2fr) minmax(0, 1.2fr) 6.5rem 6rem 9rem";

pub(super) const TABLE_PAGE_SIZE: usize = 5;

pub(super) fn catalog_table(
    label: &'static str,
    headers: [&'static str; 4],
    rows: &'static [CatalogRow],
    base_path: &'static str,
) -> impl IntoView {
    let [title, category, date, status] = headers;
    let columns = vec![
        Column {
            label: title,
            cell: |row: &CatalogRow| {
                view! { <span class="entry-title">{row.title}</span> }.into_any()
            },
            sort: Some(|row| row.title.to_lowercase()),
        },
        Column {
            label: category,
            cell: |row| view! { <span class="entry-cat">{row.category}</span> }.into_any(),
            sort: Some(|row| row.category.to_lowercase()),
        },
        Column {
            label: date,
            cell: |row| view! { <span class="entry-date">{row.date}</span> }.into_any(),
            sort: None,
        },
        Column {
            label: status,
            cell: |row| chip_toggle(row.status, !row.draft, "Published", "Draft").into_any(),
            sort: Some(|row| row.status.to_lowercase()),
        },
    ];

    data_table(
        label,
        CATALOG_WIDTHS,
        columns,
        rows.to_vec(),
        move |row| {
            view! {
                <a class="row-edit" href=format!("{base_path}/{}", row.slug)>
                    "Edit"
                </a>
                <button type="button" class="button-danger small">
                    "Delete"
                </button>
            }
            .into_any()
        },
        TABLE_PAGE_SIZE,
    )
}

#[derive(Clone)]
pub(super) struct EditorContent {
    pub section: &'static str,
    pub back_href: &'static str,
    pub title: String,
    pub status: String,
    pub draft: bool,
    pub fields: Vec<(String, String)>,
    pub body_label: &'static str,
    pub body: String,
    pub delete_label: &'static str,
}

pub(super) fn static_fields(fields: &'static [Field]) -> Vec<(String, String)> {
    fields
        .iter()
        .map(|field| (field.label.to_string(), field.value.to_string()))
        .collect()
}

fn field_inputs(fields: Vec<(String, String)>) -> impl IntoView {
    view! {
        <div class="admin-field-row">
            {fields
                .into_iter()
                .map(|(label, value)| {
                    view! {
                        <div class="field">
                            <label>{label}</label>
                            <input type="text" value=value />
                        </div>
                    }
                })
                .collect_view()}
        </div>
    }
}

pub(super) fn catalog_editor(
    content: &EditorContent,
    entry_id: impl Fn() -> String + Send + Sync + 'static,
) -> impl IntoView {
    view! {
        <section class="admin-edit" aria-label=format!("Edit {}", content.section)>
            <div class="admin-edit-head">
                <div>
                    <p class="back-crumb">
                        <a href=content.back_href>"← ~" {content.back_href}</a>
                    </p>
                    <p class="section-index">{content.section} " / " {entry_id}</p>
                    <h2>{content.title.clone()}</h2>
                </div>
                {chip_toggle_owned(content.status.clone(), !content.draft)}
            </div>
            {field_inputs(content.fields.clone())}
            <div class="field">
                <label>{content.body_label}</label>
                <textarea>{content.body.clone()}</textarea>
            </div>
            <div class="admin-edit-footer">
                <p class="admin-note">
                    "Changes publish to the live site on save — click the status chip to publish or unpublish."
                </p>
                <div class="admin-action-group">
                    <button type="button" class="button-danger">
                        {content.delete_label}
                    </button>
                    <button type="button" class="button-ghost">
                        "Discard"
                    </button>
                    <button type="button" class="button-primary">
                        "Save changes ↘"
                    </button>
                </div>
            </div>
        </section>
    }
}
