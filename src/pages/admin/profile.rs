use crate::{
    components::nav::AdminNav,
    constants::content::client::{PROFILE_SUMMARY, PROFILE_TAGLINE},
};
use leptos::prelude::*;
use leptos_meta::Title;

#[component]
pub fn AdminProfilePage() -> impl IntoView {
    view! {
        <Title text=crate::constants::page_title("admin / profile") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Profile"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <section class="admin-edit">
                    <div class="admin-edit-head">
                        <div>
                            <p class="section-index">"Profile / Identity"</p>
                            <h2>"Identity"</h2>
                        </div>
                    </div>
                    <div class="admin-field-row">
                        <div class="field">
                            <label for="prof-name">"Name"</label>
                            <input id="prof-name" value=crate::constants::OWNER />
                        </div>
                        <div class="field">
                            <label for="prof-location">"Location"</label>
                            <input id="prof-location" value=crate::constants::LOCATION />
                        </div>
                    </div>
                    <div class="field">
                        <label for="prof-tagline">"Tagline"</label>
                        <input id="prof-tagline" value=PROFILE_TAGLINE />
                    </div>
                    <div class="field">
                        <label for="prof-summary">"Summary"</label>
                        <textarea id="prof-summary">{PROFILE_SUMMARY}</textarea>
                    </div>
                </section>
                <section class="admin-edit">
                    <div class="admin-edit-head">
                        <div>
                            <p class="section-index">"Profile / Contact"</p>
                            <h2>"Links & files"</h2>
                        </div>
                    </div>
                    <div class="admin-field-row">
                        <div class="field">
                            <label>"GitHub"</label>
                            <input value=crate::constants::GITHUB_URL />
                        </div>
                        <div class="field">
                            <label>"LinkedIn"</label>
                            <input value=crate::constants::LINKEDIN_URL />
                        </div>
                    </div>
                    <div class="admin-field-row">
                        <div class="field">
                            <label>"Cal.com"</label>
                            <input value=crate::constants::CAL_URL />
                        </div>
                        <div class="field">
                            <label>"Public email"</label>
                            <input value=crate::constants::EMAIL />
                        </div>
                    </div>
                    <div class="field">
                        <label for="prof-cv">"CV"</label>
                        <div class="admin-inline-field">
                            <input id="prof-cv" value="Arbi_Kullakshi_CV.pdf" readonly />
                            <button type="button" class="button-ghost">
                                "Replace"
                            </button>
                        </div>
                    </div>
                    <div class="admin-edit-footer">
                        <p class="admin-note">"Changes publish to the live site on save."</p>
                        <div class="admin-action-group">
                            <button class="button-ghost" type="button">
                                "Discard"
                            </button>
                            <button class="button-primary" type="button">
                                "Save profile ↘"
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    }
}
