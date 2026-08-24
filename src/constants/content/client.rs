#[derive(Clone, Copy)]
pub struct Experience {
    pub slug: &'static str,
    pub company: &'static str,
    pub role: &'static str,
    pub dates: &'static str,
    pub summary: &'static [&'static str],
    pub tags: &'static [&'static str],
}

pub const EXPERIENCE: &[Experience] = &[
    Experience { slug: "zennit", company: "Zennit", role: "Full Stack Engineer · Full-time", dates: "Jan 2024 — Present", summary: &["Architected a nine-module Laravel SaaS backend and identity platform — 10 OAuth providers, passwordless login, account linking, TOTP MFA, and auditable session termination.", "Built production authorization, product interfaces, and repeatable delivery systems across six products."], tags: &["Laravel", "React / Next.js", "PostgreSQL", "Docker", "Ansible"] },
    Experience { slug: "hire-a-loo", company: "Hire A Loo", role: "Backend Developer · Contract", dates: "Aug 2025 — Jun 2026", summary: &["Authored 18 CRM pull requests spanning Typesense search, web-lead ingestion, price quoting, email templating, CardDAV contacts, and legacy migrations.", "Delivered an end-to-end quotation workflow and extracted the Notifyre SMS integration into an open-source Laravel package with 183 tests."], tags: &["Laravel", "Typesense", "PostgreSQL", "Pest"] },
    Experience { slug: "clickservice-gmbh", company: "Clickservice GmbH", role: "Full Stack Developer", dates: "Jan 2023 — Jan 2024", summary: &["Optimized Django and PostgreSQL services with targeted raw SQL, built third-party integrations and automated reporting, and delivered React/TypeScript interfaces for production workflows."], tags: &["Django", "PostgreSQL", "React"] },
    Experience { slug: "vodafone-albania", company: "Vodafone Albania", role: "Mobile Developer", dates: "Jan 2022 — Dec 2022", summary: &["Delivered React Native features for production iOS and Android applications, integrating REST APIs, WebSockets, authentication, and release workflows."], tags: &["React Native", "iOS / Android"] },
    Experience { slug: "enredyate", company: "EnRedYAte", role: "Junior Frontend Developer", dates: "Jan 2021 — Dec 2021", summary: &["Built responsive React and WordPress interfaces from product and design requirements, contributing to maintenance and peer review."], tags: &["React", "WordPress"] },
];

#[derive(Clone, Copy)]
pub struct Project {
    pub slug: &'static str,
    pub kind: &'static str,
    pub kind_class: &'static str,
    pub title: &'static str,
    pub subtitle: &'static str,
    pub summary: &'static str,
    pub tags: &'static [&'static str],
}

pub const PROJECTS: &[Project] = &[
    Project { slug: "cave-robot", kind: "Robotics · University MVP", kind_class: "card-topline", title: "Cave Robot", subtitle: "Autonomous cave-navigation drone", summary: "Six-crate Rust workspace integrating procedural 3D voxel caves, EKF localization, SLAM, ROS 2, and Gazebo. Clearance-weighted A* plans outbound on the known map while LiDAR builds an occupancy map for the return path.", tags: &["Rust", "ROS 2", "Gazebo", "SLAM", "A*"] },
    Project { slug: "roomba", kind: "Robotics · Simulation", kind_class: "card-topline", title: "Roomba", subtitle: "Autonomous cleaning robot", summary: "A documented 10× real-time simulator that visits reachable rooms, cleans multiple dirt types, replans around obstacles, and returns to dock. Five independently clocked Tokio sensor tasks feed timestamp-ordered fusion with innovation-gated EKF corrections.", tags: &["Rust", "Tokio", "EKF", "Sensor fusion"] },
    Project { slug: "event-aware-traffic-prediction", kind: "Research · B.Sc. Thesis", kind_class: "card-topline lavender", title: "Event-Aware Traffic Prediction", subtitle: "A negative result, tested reproducibly", summary: "Evaluated 5.68 million sensor-time rows and 164 verified concerts through 540 controlled Random Forest and XGBoost fits. Event metadata degraded real-data predictions; controlled synthetic experiments recovered the injected effect, validating the mechanism without overstating the outcome.", tags: &["Python", "XGBoost", "Random Forest"] },
    Project { slug: "pyramid-backstage", kind: "Platform · JunctionX Tirana", kind_class: "card-topline warm", title: "Pyramid Backstage", subtitle: "Venue operations, unified", summary: "Hackathon platform for event intake, space matching, quotations, reservations, approvals, and task planning. A typed Bun/Hono and Next.js monorepo with transactional availability, AI-assisted request processing, and interactive 3D venue exploration.", tags: &["Bun / Hono", "Next.js", "PostgreSQL", "Drizzle"] },
];

#[derive(Clone, Copy)]
pub struct Book {
    pub href: &'static str,
    pub topic: &'static str,
    pub topic_class: &'static str,
    pub title: &'static str,
    pub author: &'static str,
    pub status: &'static str,
    pub status_class: &'static str,
    pub note: &'static str,
}

pub const BOOKS: &[Book] = &[
    Book { href: "https://dataintensive.net/", topic: "Systems", topic_class: "card-topline", title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", status: "Finished", status_class: "book-status", note: "The mental model I reach for when weighing storage engines, replication, and consistency trade-offs." },
    Book { href: "https://www.zero2prod.com/", topic: "Rust", topic_class: "card-topline", title: "Zero To Production In Rust", author: "Luca Palmieri", status: "Reading", status_class: "book-status reading", note: "Backend Rust the way I actually ship it — testing, telemetry, and deployment included." },
    Book { href: "https://mitpress.mit.edu/9780262201629/probabilistic-robotics/", topic: "Robotics", topic_class: "card-topline lavender", title: "Probabilistic Robotics", author: "Thrun, Burgard & Fox", status: "Reading", status_class: "book-status reading", note: "The theory behind the EKF and SLAM work in Cave Robot and Roomba." },
    Book { href: "https://rust-for-rustaceans.com/", topic: "Rust", topic_class: "card-topline", title: "Rust for Rustaceans", author: "Jon Gjengset", status: "Finished", status_class: "book-status", note: "Intermediate-to-advanced Rust: API design, unsafe, async internals." },
    Book { href: "https://web.stanford.edu/~ouster/cgi-bin/book.php", topic: "Craft", topic_class: "card-topline warm", title: "A Philosophy of Software Design", author: "John Ousterhout", status: "Finished", status_class: "book-status", note: "Deep modules, shallow interfaces — quietly changed how I split up systems." },
    Book { href: "https://www.databass.dev/", topic: "Infrastructure", topic_class: "card-topline blue", title: "Database Internals", author: "Alex Petrov", status: "Reading", status_class: "book-status reading", note: "What PostgreSQL is actually doing under the workloads I tune." },
];

pub const BLOG_FILTERS: &[&str] = &["all", "rust", "robotics", "laravel", "research", "process"];
pub const TOOLBOX: &[&str] = &[
    "Arch Linux",
    "Hyprland",
    "Neovim",
    "Rust",
    "Laravel",
    "PostgreSQL",
    "Docker",
    "IBM Plex Mono",
];

pub const PROFILE_TAGLINE: &str = "systems · full stack · robotics";
pub const PROFILE_SUMMARY: &str = "I build backend systems, security platforms, delivery infrastructure, and autonomous robots — from architecture through testing, deployment, and operation.";

#[derive(Clone, Copy)]
pub struct Metric {
    pub value: &'static str,
    pub label: &'static str,
}

pub const HOME_METRICS: &[Metric] = &[
    Metric {
        value: "9",
        label: "Laravel platform modules",
    },
    Metric {
        value: "10",
        label: "External OAuth providers",
    },
    Metric {
        value: "10×",
        label: "Real-time robot simulation",
    },
    Metric {
        value: "5.68M",
        label: "Research rows evaluated",
    },
];

#[derive(Clone, Copy)]
pub struct Fact {
    pub value: &'static str,
    pub label: &'static str,
}

#[derive(Clone, Copy)]
pub struct PageLink {
    pub label: &'static str,
    pub href: &'static str,
}

#[derive(Clone, Copy)]
pub struct MediaItem {
    pub label: &'static str,
    pub caption: &'static str,
}

#[derive(Clone, Copy)]
pub enum ProseBlock {
    Heading(&'static str),
    Paragraph(&'static str),
    List(&'static [&'static str]),
    Quote(&'static str),
    Code(&'static str),
    Media(MediaItem),
    MediaGrid(&'static [MediaItem]),
}

#[derive(Clone, Copy)]
pub struct Detail {
    pub title: &'static str,
    pub back_href: &'static str,
    pub back_label: &'static str,
    pub topline: &'static str,
    pub meta: &'static [&'static str],
    pub blocks: &'static [ProseBlock],
    pub tags: &'static [&'static str],
    pub tags_in_header: bool,
    pub source: Option<PageLink>,
    pub facts: &'static [Fact],
    pub previous: PageLink,
    pub next: PageLink,
}

pub const WORK_DETAIL: Detail = Detail {
    title: "Zennit",
    back_href: "/work",
    back_label: "← ~/work",
    topline: "Full-time · Jan 2024 — Present",
    meta: &["Full Stack Engineer", "SaaS infrastructure · six products"],
    blocks: &[
        ProseBlock::Heading("The platform"),
        ProseBlock::Paragraph("Zennit builds SaaS products, open-source packages, and client software. My core work is the shared backend that everything runs on: a nine-module Laravel platform covering identity, authorization, billing, notifications, files, auditing, and delivery — the infrastructure each new product inherits instead of rebuilding."),
        ProseBlock::Heading("Identity & access"),
        ProseBlock::Paragraph("The identity module is the deepest piece: ten external OAuth providers behind one account model, passwordless email login, account linking across providers, TOTP multi-factor, and session management with auditable termination — every revocation traceable to who ended which session, when, and why."),
        ProseBlock::List(&[
            "Authorization is policy-based and shared across products, with an open-sourced attribute-based access control package (zennit-dev/abac) extracted from it.",
            "Delivery is repeatable by design: Docker images, Ansible playbooks, and GitHub/GitLab CI pipelines shared across all six products.",
        ]),
        ProseBlock::MediaGrid(&[
            MediaItem { label: "identity-console.png", caption: "Session & device management in the identity console." },
            MediaItem { label: "provider-matrix.png", caption: "Provider linking matrix across the ten OAuth integrations." },
        ]),
        ProseBlock::Heading("Product work"),
        ProseBlock::Paragraph("On top of the platform I build the products themselves — Laravel and Django services, React/Next.js interfaces, and React Native apps — moving between backend architecture and the screens users touch. The through-line is ownership: architecture, implementation, tests, deployment, and operation of the same system."),
    ],
    tags: &["Laravel", "React / Next.js", "PostgreSQL", "Redis", "Docker", "Ansible"],
    tags_in_header: true,
    source: None,
    facts: &[Fact { value: "9", label: "Platform modules" }, Fact { value: "10", label: "OAuth providers" }, Fact { value: "6", label: "Products shipped on it" }],
    previous: PageLink { label: "← All experience", href: "/work" },
    next: PageLink { label: "Hire A Loo →", href: "/work/hire-a-loo" },
};

pub const PROJECT_DETAIL: Detail = Detail {
    title: "Roomba",
    back_href: "/projects",
    back_label: "← ~/projects",
    topline: "Robotics · Simulation",
    meta: &["Autonomous cleaning robot", "Rust · Tokio", "Updated Aug 2026"],
    blocks: &[
        ProseBlock::Media(MediaItem { label: "roomba-simulation-demo.mp4 · 1:42", caption: "Full cleaning run at 10× real time — coverage, obstacle replanning, and return to dock." }),
        ProseBlock::Heading("Overview"),
        ProseBlock::Paragraph("A fully documented simulator for an autonomous cleaning robot. The robot visits every reachable room, detects and cleans multiple dirt types, replans around obstacles that appear mid-run, and returns to its dock before the battery model runs out. Everything runs at 10× real time with a fixed-step control loop."),
        ProseBlock::Heading("Architecture"),
        ProseBlock::Paragraph("The simulator is built around five independently clocked sensor tasks — wheel odometry, IMU, LiDAR, cliff sensor, and bump ring — each running in its own Tokio task on its own sample rate. Their measurements flow into a fusion task that applies them in timestamp order:"),
        ProseBlock::List(&[
            "Bounded replay buffer — measurements are staged and sorted so late arrivals never corrupt the filter.",
            "Innovation-gated corrections — LiDAR-to-wall corrections pass a chi-squared gate before touching the estimate.",
            "Fixed-step control — planning and motion run on a deterministic tick, independent of sensor timing.",
        ]),
        ProseBlock::Code("fn drain_ready(&mut self, now: SimTime) -> Vec<Measurement> {\n    let horizon = now - REPLAY_WINDOW;\n    self.staged.split_off_ready(horizon)  // sorted by timestamp\n}"),
        ProseBlock::MediaGrid(&[
            MediaItem { label: "occupancy-map.png", caption: "Occupancy map after a full coverage run." },
            MediaItem { label: "fusion-timing.png", caption: "Sensor arrival skew vs. the replay window." },
        ]),
        ProseBlock::Heading("Results"),
        ProseBlock::Paragraph("The filter holds pose error under 3 cm across a full apartment run while rejecting roughly 2% of LiDAR corrections as outliers — a rejection rate that doubles as the system's best health metric. The whole run is reproducible: the same seed produces the same dirt layout, the same obstacle schedule, and the same trajectory."),
        ProseBlock::Heading("Running it"),
        ProseBlock::Code("# headless run with the default apartment\ncargo run --release -- --map apartment --speed 10\n\n# with the visualizer\ncargo run --release --features viz"),
    ],
    tags: &["Rust", "Tokio", "EKF", "Sensor fusion"],
    tags_in_header: true,
    source: Some(PageLink { label: "Source", href: "https://github.com/somethim/roomba" }),
    facts: &[Fact { value: "5", label: "Async sensor tasks" }, Fact { value: "EKF + replay", label: "Fusion pipeline" }, Fact { value: "10×", label: "Real-time simulation" }],
    previous: PageLink { label: "← Cave Robot", href: "/projects/cave-robot" },
    next: PageLink { label: "Event-Aware Traffic Prediction →", href: "/projects/event-aware-traffic-prediction" },
};
