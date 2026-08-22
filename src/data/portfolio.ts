export const EXPERIENCE = [
  {
    company: "Zennit",
    role: "Full Stack Engineer",
    period: "Jan 2024 — Present",
    type: "Full-time",
    summary: [
      "Architected a nine-module Laravel SaaS backend and identity platform with 10 OAuth providers, passwordless login, account linking, TOTP MFA, and auditable session termination.",
      "Built production authorization, product interfaces, and repeatable delivery systems across six products using Laravel, Django, React/Next.js, PostgreSQL, Redis, Docker, Ansible, and GitHub/GitLab CI.",
    ],
    technologies: [
      "Laravel",
      "React / Next.js",
      "PostgreSQL",
      "Docker",
      "Ansible",
    ],
  },
  {
    company: "Hire A Loo",
    role: "Backend Developer",
    period: "Aug 2025 — Jun 2026",
    type: "Contract",
    summary: [
      "Authored 18 CRM pull requests spanning Typesense search, web-lead ingestion, price quoting, email templating, CardDAV contacts, legacy migrations, and shared application infrastructure.",
      "Delivered an end-to-end quotation workflow and extracted the Notifyre SMS integration into an open-source Laravel package with 183 tests.",
    ],
    technologies: ["Laravel", "Typesense", "PostgreSQL", "Pest"],
  },
  {
    company: "Clickservice GmbH",
    role: "Full Stack Developer",
    period: "Jan 2023 — Jan 2024",
    summary: [
      "Optimized Django and PostgreSQL services with targeted raw SQL, built third-party integrations and automated reporting, and delivered React/TypeScript interfaces for production workflows.",
    ],
  },
  {
    company: "Vodafone Albania",
    role: "Mobile Developer",
    period: "Jan 2022 — Dec 2022",
    summary: [
      "Delivered React Native features for production iOS and Android applications, integrating REST APIs, WebSockets, authentication, and release workflows.",
    ],
  },
  {
    company: "EnRedYAte",
    role: "Junior Frontend Developer",
    period: "Jan 2021 — Dec 2021",
    summary: [
      "Built responsive React and WordPress interfaces from product and design requirements, contributing to maintenance and peer review.",
    ],
  },
] as const;

export const PROJECTS = [
  {
    category: "Robotics · University MVP",
    kind: "robotics",
    title: "Cave Robot",
    subtitle: "Autonomous cave-navigation drone",
    description: [
      "Six-crate Rust workspace integrating procedural 3D voxel caves, EKF localization, SLAM, ROS 2, and Gazebo.",
      "Clearance-weighted A* uses the known map for outbound planning while LiDAR builds an occupancy map during traversal for return-path planning.",
    ],
    facts: [
      ["Workspace", "6 Rust crates"],
      ["Planning", "Clearance A*"],
      ["Integration", "ROS 2 / Gazebo"],
    ],
    links: [
      {
        label: "Explore the source",
        href: "https://github.com/somethim/cave-robot",
      },
    ],
  },
  {
    category: "Robotics · Simulation",
    kind: "robotics",
    title: "Roomba",
    subtitle: "Autonomous cleaning robot",
    description: [
      "A documented 10× real-time simulator that visits reachable rooms, detects and cleans multiple dirt types, replans around obstacles, and returns to dock.",
      "Five independently clocked Tokio sensor tasks feed timestamp-ordered fusion with bounded replay and innovation-gated LiDAR-to-wall EKF corrections.",
    ],
    facts: [
      ["Sensors", "5 async tasks"],
      ["Fusion", "EKF + replay"],
      ["Control", "Fixed-step"],
    ],
    links: [
      {
        label: "Explore the source",
        href: "https://github.com/somethim/roomba",
      },
    ],
  },
  {
    category: "Research · B.Sc. Thesis",
    kind: "research",
    title: "Event-Aware Traffic Prediction",
    subtitle: "A negative result, tested reproducibly",
    description: [
      "Evaluated 5.68 million sensor-time rows and 164 verified concerts through 540 controlled Random Forest and XGBoost fits.",
      "Event metadata degraded real-data predictions. Controlled synthetic experiments recovered the injected event effect, validating the mechanism without overstating the real-world outcome.",
    ],
    facts: [
      ["Rows", "5.68M"],
      ["Concerts", "164"],
      ["Fits", "540"],
    ],
    links: [
      {
        label: "Read the research",
        href: "https://github.com/somethim/event-aware-traffic-prediction",
      },
    ],
  },
  {
    category: "Platform · JunctionX Tirana",
    kind: "platform",
    title: "Pyramid Backstage",
    subtitle: "Venue operations, unified",
    description: [
      "Hackathon platform for event intake, space matching, quotations, reservations, approvals, and task planning.",
      "A typed Bun/Hono and Next.js monorepo with transactional availability, AI-assisted request processing, interactive 3D venue exploration, PostgreSQL, Drizzle, and Docker deployment.",
    ],
    links: [
      {
        label: "Open live project",
        href: "https://hypernova.arbikullakshi.com",
      },
      {
        label: "Source",
        href: "https://github.com/hypernova3643725/hypernova",
      },
    ],
  },
] as const;

export const CAPABILITIES = [
  {
    title: "Languages",
    items: ["Rust", "PHP", "Python", "TypeScript"],
  },
  {
    title: "Robotics",
    items: ["ROS 2 / rclrs", "Gazebo", "LiDAR / SLAM", "EKF / pathfinding"],
  },
  {
    title: "Applications",
    items: ["Laravel", "Django", "React / Next.js", "React Native"],
  },
  {
    title: "Data & delivery",
    items: [
      "PostgreSQL / Redis",
      "Typesense",
      "Docker / Traefik",
      "CI / Ansible",
    ],
  },
] as const;

export const CREDENTIALS = [
  {
    year: "In progress · 2026",
    title: "Rust Live Accelerator",
    institution: "Let's Get Rusty LLC · Virtual",
    detail:
      "100+ hour advanced Rust curriculum spanning async services, persistence, embedded systems, and production delivery.",
  },
  {
    year: "2026",
    title: "B.Sc. Informatics Engineering",
    institution: "European University of Tirana",
    detail: "Thesis: Event-Aware Traffic Prediction",
  },
  {
    year: "2023",
    title: "ICT Vocational Degree",
    institution: "Hermann Gmeiner High School",
    detail: "Albanian · English C2 · German B1",
  },
] as const;
