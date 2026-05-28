type ExperienceSection = {
  title: string;
  body: string;
};

type ExperienceItem = {
  role: string;
  company: string;
  impact: string;
  period: string;
  initials: string;
  logo: string;
  accentColor: string;
  overview: string;
  sections: ExperienceSection[];
  stack: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Full Stack Engineer",
    company: "zennit",
    impact: "SaaS infrastructure, auth, CI/CD, mobile",
    period: "Jan 2024 – Present",
    initials: "Z",
    logo: "/zennit.webp",
    accentColor: "#A855F7",
    overview:
      "Architected and built the core infrastructure of a production multi-tenant SaaS platform from scratch — system design, deployment pipeline, auth, permissions, real-time sync, and the React and React Native products on top.",
    sections: [
      {
        title: "Infrastructure & Deployment",
        body: "Designed and automated CI/CD pipelines using Docker, Traefik, and GitHub/GitLab CI. Led backend system design for production SaaS environments targeting high availability. Managed containerized deployments on bare-metal and cloud infrastructure with reverse proxy configuration and TLS automation.",
      },
      {
        title: "Auth & Identity",
        body: "Built a custom authentication and identity system supporting multi-provider OAuth (12 providers), MFA, security keys, and single-use password flows. Identity and credentials are separated — one user can hold multiple credential accounts, each independently verified. Every login event writes a full audit record without storing session tokens in plaintext. Implemented device-level remote session management and secure session invalidation.",
      },
      {
        title: "Multi-tenancy & Permissions",
        body: "A user can belong to multiple organizations simultaneously through independent profile records. Every request is scoped to an active organization, anchoring all downstream queries to that context. Feature modules can be enabled or disabled per organization. Access rules are stored in the database as a composable policy graph — evaluation returns a scoped query rather than a boolean, so listing endpoints automatically return only rows the caller is permitted to see.",
      },
      {
        title: "Frontend & Mobile",
        body: "Developed high-performance React and Next.js web applications and React Native mobile apps with real-time backend integration across iOS and Android.",
      },
    ],
    stack: [
      "PHP 8.5",
      "Laravel 13",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Laravel Horizon",
      "Laravel Reverb",
      "React",
      "Next.js",
      "TypeScript",
      "React Native",
      "Docker",
      "Traefik",
      "GitHub CI",
    ],
  },
  {
    role: "Backend Developer",
    company: "Hire A Loo",
    impact: "Laravel APIs, full-text search, legacy migration",
    period: "Aug 2025 – Present",
    initials: "HL",
    logo: "/hirealoo.webp",
    accentColor: "#002d62",
    overview:
      "Backend development for a facility management platform — Laravel APIs, full-text search with Typesense, and migrating a legacy backend to a redesigned architecture.",
    sections: [
      {
        title: "Search",
        body: "Implemented full-text search using Laravel Scout with Typesense. Ensured synchronisation between database models and search indexing workflows, optimising data retrieval and search accuracy.",
      },
      {
        title: "API & Data",
        body: "Implemented backend APIs and refactored data models and business logic for improved performance.",
      },
      {
        title: "Migration",
        body: "Facilitated migration of a legacy backend system to a redesigned architecture, improving reliability and maintainability.",
      },
    ],
    stack: ["PHP", "Laravel", "Laravel Scout", "Typesense", "PostgreSQL"],
  },
  {
    role: "Full Stack Developer",
    company: "Clickservice GmbH",
    impact: "Django backend, React frontend, workforce platform",
    period: "Jan 2023 – Jan 2024",
    initials: "CS",
    logo: "/clickservice.webp",
    accentColor: "#78d9ef",
    overview:
      "Full stack development of click-clock.work — an internal workforce management platform for time tracking, worker scheduling, and operational tooling.",
    sections: [
      {
        title: "Backend",
        body: "Built the Django backend with optimised PostgreSQL queries, improving performance through direct SQL query tuning beyond ORM abstractions. Integrated third-party APIs.",
      },
      {
        title: "Frontend",
        body: "Developed the React/TypeScript frontend covering time tracking, worker scheduling, and internal operational tooling.",
      },
    ],
    stack: [
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "React",
      "TypeScript",
    ],
  },
  {
    role: "Mobile Developer",
    company: "Vodafone Albania",
    impact: "React Native iOS & Android, real-time features",
    period: "Jan 2022 – Dec 2022",
    initials: "V",
    logo: "/vodafone.webp",
    accentColor: "#e60000",
    overview:
      "React Native development for Vodafone Albania's customer-facing iOS and Android app — real-time features, secure auth, and automated deployment workflows.",
    sections: [
      {
        title: "Mobile Development",
        body: "Developed and maintained React Native applications for iOS and Android, enhancing user experience across platforms. Integrated REST APIs and WebSocket connections to enable real-time features.",
      },
      {
        title: "Auth & Deployment",
        body: "Implemented secure authentication mechanisms and automated deployment workflows.",
      },
    ],
    stack: ["React Native", "iOS", "Android", "REST APIs", "WebSocket"],
  },
];
