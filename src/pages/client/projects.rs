use leptos::prelude::*;

use crate::components::TypedText;
use leptos_icons::Icon;
use leptos_meta::Title;

use super::common::detail_page;
use crate::constants::{
    content::client::{PROJECTS, PROJECT_DETAIL},
    page_title,
};

#[component]
pub fn ProjectsPage() -> impl IntoView {
    view! {
        <Title text=page_title("projects") />
        <div class="page-heading">
            <p class="section-index">"02 / Selected work"</p>
            <h1 class="page-title page-title-path">
                <TypedText text="~/projects" />
                <span class="title-cursor" />
            </h1>
        </div>
        <div class="card-list">
            {PROJECTS
                .iter()
                .map(|project| {
                    view! {
                        <a class="card" href=format!("/projects/{}", project.slug)>
                            <p class=project.kind_class>{project.kind}</p>
                            <div class="card-header">
                                <div>
                                    <h2 class="card-title">{project.title}</h2>
                                    <p class="card-subtitle">{project.subtitle}</p>
                                </div>
                                <span class="card-link-icon">
                                    <Icon icon=icondata::LuArrowRight width="18" height="18" />
                                </span>
                            </div>
                            <div class="card-body">
                                <p>{project.summary}</p>
                            </div>
                            <div class="tags">
                                {project
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
pub fn ProjectDetailPage() -> impl IntoView {
    detail_page(PROJECT_DETAIL)
}
