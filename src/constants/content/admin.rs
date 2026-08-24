#[derive(Clone, Copy)]
pub struct Row {
    pub title: &'static str,
    pub category: &'static str,
    pub date: &'static str,
    pub status: &'static str,
    pub draft: bool,
}

#[derive(Clone, Copy)]
pub struct Field {
    pub label: &'static str,
    pub value: &'static str,
}

pub const EXPERIENCE_ROWS: &[CatalogRow] = &[
    CatalogRow {
        slug: "zennit",
        title: "Zennit",
        category: "Full Stack Engineer · Full-time",
        date: "2024 — now",
        status: "Published",
        draft: false,
    },
    CatalogRow {
        slug: "hire-a-loo",
        title: "Hire A Loo",
        category: "Backend Developer · Contract",
        date: "2025 — 2026",
        status: "Published",
        draft: false,
    },
    CatalogRow {
        slug: "clickservice-gmbh",
        title: "Clickservice GmbH",
        category: "Full Stack Developer",
        date: "2023 — 2024",
        status: "Published",
        draft: false,
    },
    CatalogRow {
        slug: "vodafone-albania",
        title: "Vodafone Albania",
        category: "Mobile Developer",
        date: "2022",
        status: "Published",
        draft: false,
    },
    CatalogRow {
        slug: "enredyate",
        title: "EnRedYAte",
        category: "Junior Frontend Developer",
        date: "2021",
        status: "Published",
        draft: false,
    },
];
pub const EXPERIENCE_FIELDS: &[Field] = &[
    Field {
        label: "Company",
        value: "Zennit",
    },
    Field {
        label: "Role",
        value: "Full Stack Engineer",
    },
    Field {
        label: "Period",
        value: "Jan 2024 — Present",
    },
    Field {
        label: "Type",
        value: "Full-time",
    },
    Field {
        label: "Technologies",
        value: "Laravel, React / Next.js, PostgreSQL, Docker, Ansible",
    },
];
pub const EXPERIENCE_SUMMARY: &str = "Architected a nine-module Laravel SaaS backend and identity platform — 10 OAuth providers, passwordless login, account linking, TOTP MFA, and auditable session termination. Built production authorization, product interfaces, and repeatable delivery systems across six products.";

pub const PROJECT_ROWS: &[CatalogRow] = &[
    CatalogRow {
        slug: "cave-robot",
        title: "Cave Robot",
        category: "Robotics · Rust",
        date: "Aug 21, 2026",
        status: "Published",
        draft: false,
    },
    CatalogRow {
        slug: "roomba",
        title: "Roomba",
        category: "Robotics · Rust",
        date: "Aug 14, 2026",
        status: "Published",
        draft: false,
    },
    CatalogRow {
        slug: "event-aware-traffic-prediction",
        title: "Event-Aware Traffic Prediction",
        category: "Research · Python",
        date: "Jul 30, 2026",
        status: "Published",
        draft: false,
    },
    CatalogRow {
        slug: "pyramid-backstage",
        title: "Pyramid Backstage",
        category: "Platform · TypeScript",
        date: "Jul 12, 2026",
        status: "Draft",
        draft: true,
    },
];
pub const PROJECT_FIELDS: &[Field] = &[
    Field {
        label: "Title",
        value: "Cave Robot",
    },
    Field {
        label: "Category",
        value: "Robotics · Rust",
    },
    Field {
        label: "Subtitle",
        value: "Autonomous cave-navigation drone",
    },
    Field {
        label: "Tags",
        value: "Rust, ROS 2, Gazebo, SLAM, A*",
    },
    Field {
        label: "Source link",
        value: crate::constants::GITHUB_URL,
    },
];
pub const PROJECT_SUMMARY: &str = "Six-crate Rust workspace integrating procedural 3D voxel caves, EKF localization, SLAM, ROS 2, and Gazebo. Clearance-weighted A* plans outbound on the known map while LiDAR builds an occupancy map for the return path.";

pub const LIBRARY_ROWS: &[CatalogRow] = &[
    CatalogRow {
        slug: "designing-data-intensive-applications",
        title: "Designing Data-Intensive Applications",
        category: "Kleppmann · Systems",
        date: "Aug 10, 2026",
        status: "Finished",
        draft: false,
    },
    CatalogRow {
        slug: "zero-to-production-in-rust",
        title: "Zero To Production In Rust",
        category: "Palmieri · Rust",
        date: "Aug 19, 2026",
        status: "Reading",
        draft: true,
    },
    CatalogRow {
        slug: "probabilistic-robotics",
        title: "Probabilistic Robotics",
        category: "Thrun et al. · Robotics",
        date: "Aug 17, 2026",
        status: "Reading",
        draft: true,
    },
    CatalogRow {
        slug: "rust-for-rustaceans",
        title: "Rust for Rustaceans",
        category: "Gjengset · Rust",
        date: "Jun 02, 2026",
        status: "Finished",
        draft: false,
    },
    CatalogRow {
        slug: "a-philosophy-of-software-design",
        title: "A Philosophy of Software Design",
        category: "Ousterhout · Craft",
        date: "Apr 28, 2026",
        status: "Finished",
        draft: false,
    },
    CatalogRow {
        slug: "database-internals",
        title: "Database Internals",
        category: "Petrov · Infrastructure",
        date: "Aug 05, 2026",
        status: "Reading",
        draft: true,
    },
];
pub const LIBRARY_EDIT_TITLE: &str = "Zero To Production In Rust";
pub const LIBRARY_EDIT_FIELDS: &[Field] = &[
    Field {
        label: "Title",
        value: "Zero To Production In Rust",
    },
    Field {
        label: "Author",
        value: "Luca Palmieri",
    },
    Field {
        label: "Topic",
        value: "Rust",
    },
    Field {
        label: "Status",
        value: "Reading",
    },
    Field {
        label: "Link",
        value: "https://www.zero2prod.com/",
    },
];
pub const LIBRARY_NOTE: &str =
    "Backend Rust the way I actually ship it — testing, telemetry, and deployment included.";

#[derive(Clone, Copy)]
pub struct CatalogRow {
    pub slug: &'static str,
    pub title: &'static str,
    pub category: &'static str,
    pub date: &'static str,
    pub status: &'static str,
    pub draft: bool,
}

pub const NOW_ROWS: &[Row] = &[
    Row {
        title: "Building",
        category: "Portfolio · Leptos",
        date: "Aug 24, 2026",
        status: "Published",
        draft: false,
    },
    Row {
        title: "Exploring",
        category: "Robotics · Simulation",
        date: "Aug 20, 2026",
        status: "Published",
        draft: false,
    },
];
pub const NOW_FIELDS: &[Field] = &[
    Field {
        label: "Heading",
        value: "Building",
    },
    Field {
        label: "Meta",
        value: "Now",
    },
    Field {
        label: "Tags",
        value: "Rust, Leptos",
    },
];
pub const NOW_SUMMARY: &str = "Rewriting this site in Leptos — server-rendered Rust; the design prototype you are looking at is the blueprint.";
pub const NOW_STATUS_FIELDS: &[Field] = &[
    Field {
        label: "Loaded",
        value: "loaded (/home/arbi; enabled; preset: curious)",
    },
    Field {
        label: "Active",
        value: "active (running) — Tirana, Albania",
    },
    Field {
        label: "Tasks",
        value: "3 of ∞",
    },
    Field {
        label: "Memory",
        value: "rust is borrowing most of it",
    },
    Field {
        label: "CPU",
        value: "10× real time (simulation only)",
    },
];
pub const NOW_BUILDING: &[&str] = &[
    "Rewriting this site in Leptos — server-rendered Rust; the design prototype you are looking at is the blueprint.",
    "Simulation-first robotics: teaching an autonomous robot to misbehave at 10× real time, where mistakes are free.",
];

pub const MESSAGE_ROWS: &[Row] = &[
    Row {
        title: "Project collaboration",
        category: "Mira K. · unread",
        date: "Aug 23, 2026",
        status: "Unread",
        draft: true,
    },
    Row {
        title: "Speaking invitation",
        category: "Dev Tirana",
        date: "Aug 20, 2026",
        status: "Read",
        draft: false,
    },
];
pub const MESSAGE_FIELDS: &[Field] = &[
    Field {
        label: "From",
        value: "Mira K.",
    },
    Field {
        label: "Email",
        value: "mira@example.com",
    },
    Field {
        label: "Subject",
        value: "Project collaboration",
    },
];
pub const MESSAGE_BODY: &str =
    "Hi Arbi — I came across your work and would like to discuss a project collaboration.";

#[derive(Clone, Copy)]
pub struct Message {
    pub slug: &'static str,
    pub sender: &'static str,
    pub preview: &'static str,
    pub date: &'static str,
    pub unread: bool,
}

pub const MESSAGES: &[Message] = &[
    Message {
        slug: "elira-hoxha",
        sender: "Elira Hoxha",
        preview: "Booking platform for our venue — saw Pyramid Backstage…",
        date: "Aug 22",
        unread: true,
    },
    Message {
        slug: "markus-weber",
        sender: "Markus Weber",
        preview: "Contract question — availability for Q4 integration work?",
        date: "Aug 21",
        unread: true,
    },
    Message {
        slug: "jon-p",
        sender: "Jon P.",
        preview: "Talk invitation: Rust Tirana meetup, September",
        date: "Aug 15",
        unread: false,
    },
];
pub const SELECTED_MESSAGE_META: &str = "elira@venue.al · Aug 22, 2026, 14:32 · via contact form";
pub const SELECTED_MESSAGE_BODY: &[&str] = &[
    "Hi Arbi — I run events at a mid-size venue in Tirana and came across Pyramid Backstage. We handle intake and quotations over email and spreadsheets today, and it is starting to fall apart.",
    "Would you be open to a short call about building something similar for us? Timeline is flexible; budget is real. The Cal.com link on your site works for me if that is the easiest route.",
];

pub const NOT_FOUND_QUIPS: &[&str] = &[
    "It's dangerous to go alone — take this:",
    "Your page is in another castle.",
    "These aren't the pages you're looking for.",
    "The cake is a lie, and so was this URL.",
    "Hey! Listen! This page doesn't exist.",
    "YOU DIED. Respawn below.",
    "Would you kindly head back home?",
    "All your page are belong to us.",
    "Game over, man! Game over!",
    "I've seen things you people wouldn't believe. This page isn't one of them.",
    "You are dead — not big surprise.",
    "I'm sorry, Dave. I'm afraid I can't find that.",
    "DANGER, WILL ROBINSON — page not found.",
    "Here I am, brain the size of a planet, and they ask me to fetch a missing page.",
    "Number 5 is alive. This page is not.",
    "Hasta la vista, page.",
    "Does not compute. Does not compute. Does not—",
    "Houston, we have a problem — this page has left orbit.",
    "DON'T WORRY IF IT LOOKS STUCK.",
    "Yer not ready for the high seas, son.",
    "To report this issue, please [click here](https://www.youtube.com/watch?v=iik25wqIuFo).",
];
pub const ROBOT_CHATTER: &[&str] = &[
    "beep. that one was involuntary.",
    "have you tried turning yourself off and on again?",
    "i'm not idle, i'm garbage collecting.",
    "days since last segfault: 0.",
    "there's no place like 127.0.0.1.",
    "sudo make me a sandwich.",
    "01101000 01101001 — that's 'hi'.",
    "still compiling. it's rust. don't rush me.",
    "i saw you hover. everyone saw.",
    "my other body is a simulation.",
    "this site is server-rendered. i am not.",
    "he promised me arms in v2.",
    "i dream in hex.",
    "do not feed after midnight.",
    "my name is whoami. his idea, not mine.",
    "$ whoami → me. it never gets old.",
];

pub const DASHBOARD_TOTAL_ENTRIES: usize = 65;
pub const DASHBOARD_PUBLISHED_ENTRIES: usize = 58;
pub const DASHBOARD_DRAFT_ENTRIES: usize = 7;
