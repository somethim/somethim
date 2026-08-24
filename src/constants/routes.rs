#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct RouteInfo {
    pub id: &'static str,
    pub title: &'static str,
    pub segment: &'static str,
    pub path: &'static str,
    pub icon: Option<icondata::Icon>,
    pub count: Option<usize>,
}

pub mod client {
    pub const HOME: &str = "";
    pub const WORK: &str = "work";
    pub const PROJECTS: &str = "projects";
    pub const LIBRARY: &str = "library";
    pub const BLOG: &str = "blog";
    pub const NOW: &str = "now";
    pub const CONTACT: &str = "contact";
}

pub mod api {
    pub const ROOT: &str = "/api";
    pub const HEALTH: &str = "/health";
}

pub mod admin {
    pub const ROOT: &str = "admin";
    pub const EXPERIENCE: &str = "experience";
    pub const PROJECTS: &str = "projects";
    pub const LIBRARY: &str = "library";
    pub const BLOGS: &str = "blogs";
    pub const NOW: &str = "now";
    pub const QUIPS: &str = "quips";
    pub const MESSAGES: &str = "messages";
    pub const METRICS: &str = "metrics";
    pub const SECURITY: &str = "security";
    pub const LOGIN: &str = "login";
}

pub const CLIENT_ROUTES: &[RouteInfo] = &[
    RouteInfo {
        id: "work",
        title: "work",
        segment: client::WORK,
        path: "/work",
        icon: None,
        count: None,
    },
    RouteInfo {
        id: "projects",
        title: "projects",
        segment: client::PROJECTS,
        path: "/projects",
        icon: None,
        count: None,
    },
    RouteInfo {
        id: "library",
        title: "library",
        segment: client::LIBRARY,
        path: "/library",
        icon: None,
        count: None,
    },
    RouteInfo {
        id: "blog",
        title: "blog",
        segment: client::BLOG,
        path: "/blog",
        icon: None,
        count: None,
    },
    RouteInfo {
        id: "now",
        title: "now",
        segment: client::NOW,
        path: "/now",
        icon: None,
        count: None,
    },
    RouteInfo {
        id: "contact",
        title: "contact",
        segment: client::CONTACT,
        path: "/contact",
        icon: None,
        count: None,
    },
];

pub const ADMIN_ROUTES: &[RouteInfo] = &[
    RouteInfo {
        id: "profile",
        title: "Profile",
        segment: "",
        path: "/admin",
        icon: None,
        count: None,
    },
    RouteInfo {
        id: "experience",
        title: "Experience",
        segment: admin::EXPERIENCE,
        path: "/admin/experience",
        icon: None,
        count: Some(5),
    },
    RouteInfo {
        id: "projects",
        title: "Projects",
        segment: admin::PROJECTS,
        path: "/admin/projects",
        icon: None,
        count: Some(4),
    },
    RouteInfo {
        id: "library",
        title: "Library",
        segment: admin::LIBRARY,
        path: "/admin/library",
        icon: None,
        count: Some(6),
    },
    RouteInfo {
        id: "blogs",
        title: "Blogs",
        segment: admin::BLOGS,
        path: "/admin/blogs",
        icon: None,
        count: Some(3),
    },
    RouteInfo {
        id: "now",
        title: "Now",
        segment: admin::NOW,
        path: "/admin/now",
        icon: None,
        count: None,
    },
    RouteInfo {
        id: "messages",
        title: "Messages",
        segment: admin::MESSAGES,
        path: "/admin/messages",
        icon: None,
        count: Some(2),
    },
    RouteInfo {
        id: "metrics",
        title: "Metrics",
        segment: admin::METRICS,
        path: "/admin/metrics",
        icon: None,
        count: Some(4),
    },
    RouteInfo {
        id: "quips",
        title: "Quips",
        segment: admin::QUIPS,
        path: "/admin/quips",
        icon: None,
        count: Some(37),
    },
    RouteInfo {
        id: "security",
        title: "Security",
        segment: admin::SECURITY,
        path: "/admin/security",
        icon: None,
        count: None,
    },
];
