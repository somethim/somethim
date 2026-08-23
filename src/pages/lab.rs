use leptos::prelude::*;
use leptos_meta::Title;

use crate::components::ExampleBadge;

/// A route-level component. Keeping pages in their own module prevents
/// `app.rs` from becoming the home for every screen in the site.
#[component]
pub fn LabPage() -> impl IntoView {
    view! {
        <Title text="Example route"/>

        <section class="lab-page">
            <div class="example-card">
                <ExampleBadge text="Reusable component"/>
                <h1>"This is another route."</h1>
                <p>"Replace this component with your own page whenever you are ready."</p>
            </div>
        </section>
    }
}
