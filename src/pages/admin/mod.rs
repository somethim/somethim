mod blogs;
mod common;
mod experience;
mod library;
mod login;
mod messages;
mod metrics;
mod now;
mod profile;
mod projects;
mod quips;
mod security;

use leptos::prelude::*;
use leptos_router::{
    components::{ParentRoute, Route},
    ParamSegment, StaticSegment,
};

use crate::{components::layout::AdminLayout, constants::routes};

use blogs::{AdminBlogEditPage, AdminBlogsPage};
use experience::{AdminExperienceEditPage, AdminExperiencePage};
use library::{AdminLibraryEditPage, AdminLibraryPage};
use login::AdminLoginPage;
use messages::{AdminMessageDetailPage, AdminMessagesPage};
use metrics::AdminMetricsPage;
use now::AdminNowPage;
use profile::AdminProfilePage;
use projects::{AdminProjectEditPage, AdminProjectsPage};
use quips::AdminQuipsPage;
use security::AdminSecurityPage;

#[component(transparent)]
pub fn AdminRoutes() -> impl leptos_router::MatchNestedRoutes + Clone {
    view! {
        <ParentRoute path=StaticSegment(routes::admin::ROOT) view=AdminLayout>
            <Route path=StaticSegment("") view=AdminProfilePage />
            <Route path=StaticSegment(routes::admin::EXPERIENCE) view=AdminExperiencePage />
            <Route
                path=(StaticSegment(routes::admin::EXPERIENCE), ParamSegment("experience_id"))
                view=AdminExperienceEditPage
            />
            <Route path=StaticSegment(routes::admin::PROJECTS) view=AdminProjectsPage />
            <Route
                path=(StaticSegment(routes::admin::PROJECTS), ParamSegment("project_id"))
                view=AdminProjectEditPage
            />
            <Route path=StaticSegment(routes::admin::LIBRARY) view=AdminLibraryPage />
            <Route
                path=(StaticSegment(routes::admin::LIBRARY), ParamSegment("library_id"))
                view=AdminLibraryEditPage
            />
            <Route path=StaticSegment(routes::admin::BLOGS) view=AdminBlogsPage />
            <Route
                path=(StaticSegment(routes::admin::BLOGS), ParamSegment("blog_id"))
                view=AdminBlogEditPage
            />
            <Route path=StaticSegment(routes::admin::NOW) view=AdminNowPage />
            <Route path=StaticSegment(routes::admin::MESSAGES) view=AdminMessagesPage />
            <Route
                path=(StaticSegment(routes::admin::MESSAGES), ParamSegment("message_id"))
                view=AdminMessageDetailPage
            />
            <Route path=StaticSegment(routes::admin::METRICS) view=AdminMetricsPage />
            <Route path=StaticSegment(routes::admin::QUIPS) view=AdminQuipsPage />
            <Route path=StaticSegment(routes::admin::SECURITY) view=AdminSecurityPage />
            <Route path=StaticSegment(routes::admin::LOGIN) view=AdminLoginPage />
        </ParentRoute>
    }
    .into_inner()
}
