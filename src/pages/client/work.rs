use leptos::prelude::*;

use crate::components::TypedText;
use leptos_meta::Title;

use super::common::detail_page;
use crate::constants::{
    content::client::{EXPERIENCE, WORK_DETAIL},
    page_title,
};

#[component]
pub fn WorkPage() -> impl IntoView {
    view! {
        <Title text=page_title("work") />
        <div class="page-heading">
            <p class="section-index">"01 / Experience"</p>
            <h1 class="page-title page-title-path">
                <TypedText text="~/work" />
                <span class="title-cursor" />
            </h1>
        </div>
        <div class="card-list">
            {EXPERIENCE
                .iter()
                .map(|entry| {
                    view! {
                        <a class="card" href=format!("/work/{}", entry.slug)>
                            <div class="card-header">
                                <div>
                                    <h2 class="card-title">{entry.company}</h2>
                                    <p class="card-subtitle">{entry.role}</p>
                                </div>
                                <span class="card-meta">{entry.dates}</span>
                            </div>
                            <div class="card-body">
                                {entry
                                    .summary
                                    .iter()
                                    .map(|summary| view! { <p>{*summary}</p> })
                                    .collect_view()}
                            </div>
                            <div class="tags">
                                {entry
                                    .tags
                                    .iter()
                                    .map(|tag| view! { <span class="tag">{*tag}</span> })
                                    .collect_view()}
                            </div>
                        </a>
                    }
                })
                .collect_view()}
        </div>
    }
}

#[component]
pub fn WorkDetailPage() -> impl IntoView {
    detail_page(WORK_DETAIL)
}
