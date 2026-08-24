mod blog;
mod common;
mod contact;
mod home;
mod library;
mod now;
mod projects;
mod work;

use leptos::prelude::*;
use leptos_router::{
    components::{ParentRoute, Route},
    ParamSegment, StaticSegment,
};

use crate::{components::layout::ClientRouteLayout, constants::routes};

use blog::{BlogPage, BlogPostPage};
use contact::ContactPage;
use home::HomePage;
use library::LibraryPage;
use now::NowPage;
use projects::{ProjectDetailPage, ProjectsPage};
use work::{WorkDetailPage, WorkPage};

#[component(transparent)]
pub fn ClientRoutes() -> impl leptos_router::MatchNestedRoutes + Clone {
    view! {
        <ParentRoute path=StaticSegment(routes::client::HOME) view=ClientRouteLayout>
            <Route path=StaticSegment(routes::client::HOME) view=HomePage />
            <Route path=StaticSegment(routes::client::WORK) view=WorkPage />
            <Route
                path=(StaticSegment(routes::client::WORK), ParamSegment("work_id"))
                view=WorkDetailPage
            />
            <Route path=StaticSegment(routes::client::PROJECTS) view=ProjectsPage />
            <Route
                path=(StaticSegment(routes::client::PROJECTS), ParamSegment("project_id"))
                view=ProjectDetailPage
            />
            <Route path=StaticSegment(routes::client::LIBRARY) view=LibraryPage />
            <Route path=StaticSegment(routes::client::BLOG) view=BlogPage />
            <Route
                path=(StaticSegment(routes::client::BLOG), ParamSegment("blog_id"))
                view=BlogPostPage
            />
            <Route path=StaticSegment(routes::client::NOW) view=NowPage />
            <Route path=StaticSegment(routes::client::CONTACT) view=ContactPage />
        </ParentRoute>
    }
    .into_inner()
}
