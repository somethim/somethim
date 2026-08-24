use leptos::prelude::*;
use leptos_meta::Title;

use crate::{
    components::nav::AdminNav,
    constants::{content::client::HOME_METRICS, page_title},
};

#[component]
pub fn AdminMetricsPage() -> impl IntoView {
    view! {
        <Title text=page_title("admin / metrics") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Metrics"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <section class="admin-edit" aria-label="Evidence metrics">
                    <div class="admin-edit-head">
                        <div>
                            <p class="section-index">"Metrics / Home page"</p>
                            <h2>"Evidence metrics"</h2>
                        </div>
                    </div>
                    <p class="admin-note">
                        "The four strongest numbers — shown as the evidence strip on the home page."
                    </p>
                    {HOME_METRICS
                        .iter()
                        .enumerate()
                        .map(|(index, metric)| {
                            view! {
                                <div class="admin-field-row">
                                    <div class="field">
                                        <label for=format!("metric-{index}")>"Value"</label>
                                        <input
                                            id=format!("metric-{index}")
                                            type="text"
                                            value=metric.value
                                        />
                                    </div>
                                    <div class="field">
                                        <label for=format!("metric-{index}-label")>"Label"</label>
                                        <input
                                            id=format!("metric-{index}-label")
                                            type="text"
                                            value=metric.label
                                        />
                                    </div>
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
                                "Save metrics ↘"
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
}
