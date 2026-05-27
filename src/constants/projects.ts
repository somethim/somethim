import type { ReactNode } from "react";

export type SectionBlock =
  | { type: "p"; children: string }
  | {
      type: "p-inline";
      children: (string | { highlight: string } | { code: string })[];
    }
  | { type: "link"; href: string; label: string }
  | { type: "model-grid"; items: { model: string; detail: string }[] }
  | { type: "decision-list"; items: { decision: string; rationale: string }[] }
  | { type: "tech-stack"; items: string[] }
  | { type: "stat-grid"; items: { label: string; value: string }[] }
  | {
      type: "field-table";
      caption?: string;
      items: { table: string; fields: string[]; desc: string }[];
    }
  | { type: "cmd-grid"; items: { cmd: string; desc: string }[] }
  | {
      type: "endpoint-list";
      caption?: string;
      items: { method: string; path: string; desc: string }[];
    }
  | { type: "info-grid"; items: { label: string; value: string }[] }
  | { type: "feature-badges"; items: { label: string; className: string }[] }
  | {
      type: "app-grid";
      caption?: string;
      items: { app: string; desc: string }[];
    }
  | {
      type: "flow";
      caption?: string;
      items: { name: string; detail: string; arrow: boolean }[];
      bottom?: { label: string; detail: string; color: string };
    }
  | { type: "module-chain"; items: string[] }
  | { type: "custom"; children: ReactNode };

export type ProjectSection = {
  id: string;
  title: string;
  blocks: SectionBlock[];
};

export type ProjectCard = {
  video?: string;
  videoSpeed?: number;
  videoLoopEndTime?: number;
  videoLoopEndOffset?: number;
  videoScale?: number;
  videoPosition?: string;
  thumbnail?: string;
  background?: string;
};

export type ProjectData = {
  drawerId: string;
  title: string;
  service: string;
  accentColor: string;
  quickLinks: { label: string; id: string }[];
  sections: ProjectSection[];
  nextDrawerId: string;
  card: ProjectCard;
};

export const PROJECTS: ProjectData[] = [
  {
    drawerId: "zennstream",
    title: "Zennstream",
    service: "Full Stack · Backend Platform",
    accentColor: "#A855F7",
    nextDrawerId: "mektrin",
    card: {
      video: "/zennit.mp4",
      videoSpeed: 1.5,
      videoLoopEndTime: 9,
      thumbnail: "/zennit.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Architecture", id: "architecture" },
      { label: "Multi-tenancy", id: "multitenancy" },
      { label: "Auth", id: "auth" },
      { label: "Access Control", id: "access-control" },
      { label: "AI", id: "ai" },
      { label: "Sync & Social", id: "sync" },
      { label: "Design Decisions", id: "design" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "Zennstream is the core infrastructure layer of the Zennit SaaS platform — a multi-tenant backend that organizations use to manage their workforce, projects, time, leave, events, and AI-assisted workflows in one place. It serves HR teams, project leads, and individual contributors, with product modules that can be enabled or disabled per tenant. Other products built on Zennit plug into Zennstream as a composable foundation rather than rebuilding tenant, auth, and permission logic from scratch.",
          },
        ],
      },
      {
        id: "architecture",
        title: "Architecture",
        blocks: [
          {
            type: "p",
            children:
              "Modular Laravel monolith with 10 independently scoped modules, auto-loaded at boot. Each module is fully self-contained — routes, migrations, models, services, jobs, and notifications live within it. Composable, not independently deployable.",
          },
          {
            type: "field-table",
            items: [
              {
                table: "Common",
                fields: ["—"],
                desc: "Base classes, shared macros, Blueprint extensions",
              },
              {
                table: "Auth",
                fields: [
                  "users",
                  "auth_accounts",
                  "mfas",
                  "session_audits",
                  "personal_access_tokens",
                ],
                desc: "Identity, credentials, MFA, audit log, passwordless",
              },
              {
                table: "Organization",
                fields: [
                  "organizations",
                  "profiles",
                  "modules",
                  "organization_modules",
                  "brand_colors",
                ],
                desc: "Multi-tenancy, profile-based membership, feature flags",
              },
              {
                table: "Leave",
                fields: [
                  "profile_contracts",
                  "pto_types",
                  "vacations",
                  "holidays",
                  "holiday_groups",
                ],
                desc: "Contracts, PTO types, leave requests, holiday calendar",
              },
              {
                table: "Projects",
                fields: [
                  "projects",
                  "tasks",
                  "task_lists",
                  "teams",
                  "dependent_tasks",
                  "tags",
                ],
                desc: "Projects, task graph, teams, dependencies, tagging",
              },
              {
                table: "Time",
                fields: ["work_sessions", "break_sessions"],
                desc: "Session start/stop, break tracking",
              },
              {
                table: "Events",
                fields: [
                  "events",
                  "event_participants",
                  "event_attribute_schemas",
                ],
                desc: "Typed events with runtime-validated JSON attribute payloads",
              },
              {
                table: "Sync",
                fields: ["—"],
                desc: "Batch sync endpoint — named reads and typed mutations in one request, per-item error isolation",
              },
              {
                table: "AI",
                fields: [
                  "ai_conversations",
                  "ai_messages",
                  "ai_documents",
                  "ai_user_preferences",
                ],
                desc: "Multi-provider chat, fork graph, vector embeddings, MCP",
              },
              {
                table: "Social",
                fields: ["social_accounts", "social_posts"],
                desc: "Encrypted OAuth tokens for 5 platforms, scheduled post dispatch, status tracking",
              },
            ],
          },
        ],
      },
      {
        id: "multitenancy",
        title: "Multi-tenancy",
        blocks: [
          {
            type: "p",
            children:
              "A user can belong to multiple organizations simultaneously through independent profile records. Every request is scoped to an active organization, anchoring all downstream queries — leave, projects, time, permissions — to that context rather than raw user identity. Feature modules are enabled or disabled per organization, gating entire product areas without per-route conditionals.",
          },
        ],
      },
      {
        id: "auth",
        title: "Auth",
        blocks: [
          {
            type: "p",
            children:
              "Identity and credentials are separated — one user can hold multiple credential accounts (email/password plus any of 12 OAuth providers), each independently verified. MFA is tracked per credential rather than per user. Every login event writes a full audit record: session fingerprint, IP, platform, and location — without storing the session token in plaintext. Passwordless entry uses time-limited signed links.",
          },
        ],
      },
      {
        id: "access-control",
        title: "Access Control",
        blocks: [
          {
            type: "p",
            children:
              "Access rules are stored in the database as a composable policy graph, not hard-coded in the application. Policies define what operation is permitted on what resource; condition groups attach AND/OR logic; individual checks compare actor and resource attributes. The evaluator returns a scoped query rather than a boolean — listing endpoints automatically return only rows the caller is permitted to see, with no separate filtering step needed.",
          },
        ],
      },
      {
        id: "ai",
        title: "AI",
        blocks: [
          {
            type: "p",
            children:
              "12 LLM providers selectable per conversation or per user preference. Conversations can be forked at any message, with the branch point stored as an exact reference so it remains stable as the parent thread grows — designed for exploratory workflows where users try alternate continuations. Documents are stored as 1536-dim vector embeddings for semantic retrieval during conversations. An MCP server exposes the AI layer to compatible clients natively. Sharing uses a two-phase model: owners grant access directly; non-owners submit a request that goes through an approval flow.",
          },
        ],
      },
      {
        id: "sync",
        title: "Sync & Social Publishing",
        blocks: [
          {
            type: "p",
            children:
              "A single batch endpoint accepts named reads and typed mutations (insert, update, delete) in one request. Mutations are routed through the same validation and business logic as standard REST calls, with per-item error isolation in the response. Designed for clients that queue operations offline and replay them on reconnect.",
          },
          {
            type: "p",
            children:
              "OAuth tokens for 5 social platforms are stored encrypted per organization with proactive refresh before expiry. Posts are scheduled and dispatched with full status tracking and error capture per platform.",
          },
        ],
      },
      {
        id: "design",
        title: "Design Decisions",
        blocks: [
          {
            type: "decision-list",
            items: [
              {
                decision: "Uniform schema conventions at the framework level",
                rationale:
                  "Primary key format, timestamp fields, and foreign key naming are standardized as infrastructure across all tables — enforced by custom Blueprint macros, not documentation.",
              },
              {
                decision:
                  "All many-to-many relationships are first-class models",
                rationale:
                  "Every pivot has its own primary key and soft deletes, making each relationship independently auditable and extensible without retrofitting a join table later.",
              },
              {
                decision: "Task dependencies encoded as a directed graph",
                rationale:
                  "Dependency edges are their own model, making the graph independently queryable, auditable, and extensible to multi-level blocking chains.",
              },
              {
                decision:
                  "Event types carry a JSON attributes payload validated against a separate schema definition",
                rationale:
                  "New event types can be added without a migration — the schema definition is a separate record, not a code enum.",
              },
              {
                decision:
                  "Leave requests tied to a specific contract allowance",
                rationale:
                  "Quota enforcement is exact per employment period rather than per profile — a contract change doesn't retroactively affect past or parallel leave allocations.",
              },
            ],
          },
          {
            type: "module-chain",
            items: [
              "Common",
              "Auth",
              "Organization",
              "Leave",
              "Projects",
              "Time",
              "Events",
              "Sync",
              "AI",
              "Social",
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: [
              "PHP 8.5",
              "Laravel 13",
              "PostgreSQL",
              "pgvector",
              "Redis",
              "Laravel Horizon",
              "Laravel Reverb",
              "Laravel Octane",
              "Laravel Passport",
              "Laravel Sanctum",
              "Laravel Socialite",
              "TOTP",
              "Twilio",
              "Resend",
              "Laravel Scout",
            ],
          },
          {
            type: "stat-grid",
            items: [
              { label: "Modules", value: "10" },
              { label: "DB Tables", value: "~65" },
              { label: "API Endpoints", value: "~140" },
              { label: "AI Providers", value: "12" },
              { label: "OAuth Providers", value: "12" },
              { label: "Social Platforms", value: "5" },
              { label: "Background Jobs", value: "8" },
              { label: "MCP Components", value: "3" },
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "mektrin",
    title: "Mektrin Motors",
    service: "Full Stack",
    accentColor: "#9CA3AF",
    nextDrawerId: "lookup",
    card: {
      video: "/mektrin.mp4",
      thumbnail: "/mektrin-thumb.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Frontend", id: "frontend" },
      { label: "Backend", id: "backend" },
      { label: "Infrastructure", id: "infrastructure" },
      { label: "Design Decisions", id: "design" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "Mektrin Motors is a bilingual (Albanian/English) vehicle dealership platform serving a high-end multi-brand dealership in Albania. It replaces a manually-managed showroom workflow with a full product and CRM system: staff upload listings, manage pricing and discounts, publish blog articles, post job openings, and handle inbound customer inquiries — all from a role-gated internal dashboard. Customers browse a public storefront surfacing cars, trucks, and yachts with faceted filtering, book test drives, apply for jobs, and chat live with sales agents.",
          },
        ],
      },
      {
        id: "frontend",
        title: "Frontend",
        blocks: [
          {
            type: "p",
            children:
              "Next.js 14 App Router with two route groups: a public storefront and a protected staff CMS. The storefront covers vehicle listings for three vehicle types, a merchandise store, blog, service pages, test drive booking, and an about section. The CMS covers listings, templates, store items, staff management, job postings, applications, blog posts, and live chat.",
          },
          {
            type: "p",
            children:
              "Faceted filtering returns distinct attribute values narrowed by the current filter context server-side — selecting one filter prunes available options for every other filter automatically, in a single round trip. All filter state lives in the URL, making filtered views shareable and bookmarkable. Drag-and-drop image ordering is persisted server-side. PDF offer sheets are generated client-side. Blog posts are authored in a rich MDX editor. Role authorization runs at the edge in middleware before any React code executes — no flash of unauthorized content.",
          },
        ],
      },
      {
        id: "backend",
        title: "Backend",
        blocks: [
          {
            type: "p",
            children:
              "Django 5.0 + Django REST Framework, six self-contained apps. The server runs in dual mode: one process handles HTTP/REST, a separate one handles WebSocket — deployed as independent containers behind the same proxy. Auto-generated OpenAPI schema is exposed for the full API surface.",
          },
          {
            type: "p",
            children:
              "Live chat encrypts messages per room using a unique symmetric key stored with the room record. Messages buffer in Redis during an active session and flush to the database on disconnect — still encrypted. Staff connect with an authenticated WebSocket; anonymous sessions are finalized on disconnect. Historical messages are replayed in order on reconnect.",
          },
          {
            type: "p",
            children:
              "The vehicle catalog splits into Templates (master product catalog, staff-only) and Listings (published inventory, public read). Three vehicle types share a common attribute shape with type-specific fields added where needed. A shared filtering implementation across all vehicle endpoints handles multi-value params, range filters, text search, and sort via inheritance — no duplicated logic per type.",
          },
          {
            type: "model-grid",
            items: [
              {
                model: "vehicles_cars / cartemplates",
                detail:
                  "Listing + template split per vehicle type · drag-sort images · sale price computed on save",
              },
              {
                model: "vehicles_trucks / trucktemplates",
                detail: "Same shape as cars, type-specific fields",
              },
              {
                model: "vehicles_yachts / yachttemplates",
                detail: "Adds length, capacity, cabin count",
              },
              {
                model: "chat_chatroom + chat_message",
                detail:
                  "Per-room Fernet symmetric key · bytea encrypted messages · Redis buffer",
              },
              {
                model: "accounts_user",
                detail:
                  "name as login identifier · role enum drives API access + superuser status",
              },
              {
                model: "articles_article",
                detail: "Markdown file on disk · tags M2M · thumbnail",
              },
              {
                model: "clients_driverequests + jobapplications",
                detail: "CRM inbound leads — test drives and job applications",
              },
              {
                model: "store_store",
                detail:
                  "Price + sale percentage → discounted price auto-computed on save",
              },
            ],
          },
        ],
      },
      {
        id: "infrastructure",
        title: "Infrastructure & Deployment",
        blocks: [
          {
            type: "p",
            children:
              "Single bare-metal VPS. Seven Docker containers managed via Ansible: reverse proxy with Let's Encrypt TLS, PostgreSQL, Redis, HTTP API server, WebSocket server, static file server, and Next.js frontend. Hardware metrics collected via Prometheus Node Exporter as a systemd service.",
          },
          {
            type: "p",
            children:
              "Two CI workflows trigger on semver tags scoped to path filters: one builds three backend images from a multi-stage Dockerfile and pushes to GHCR; the other builds the frontend image. Deployment runs an Ansible playbook that pulls images, recreates containers, and runs database migrations — no manual steps on the server. All credentials are managed with Ansible Vault and injected as container environment variables at deploy time.",
          },
        ],
      },
      {
        id: "design",
        title: "Design Decisions",
        blocks: [
          {
            type: "decision-list",
            items: [
              {
                decision: "Separate HTTP and WebSocket server processes",
                rationale:
                  "REST gets a mature process model optimized for throughput; WebSocket gets its own isolated process. Stability trade-off for a system where HTTP traffic vastly outnumbers WebSocket connections.",
              },
              {
                decision: "Redis as hot buffer, Postgres as cold archive",
                rationale:
                  "Chat messages buffer in Redis during an active session and flush to the database on disconnect. Avoids write contention under concurrent WebSocket sessions — acceptable durability trade-off for a support chat context.",
              },
              {
                decision:
                  "Per-room symmetric encryption with no external key management",
                rationale:
                  "Each chat room gets a unique Fernet key stored with the room record. Message content is protected against database dumps without the operational complexity of a dedicated key store.",
              },
              {
                decision: "Context-aware filter options computed server-side",
                rationale:
                  "Each attribute's available values are computed with all other active filters applied except its own, so the UI stays coherent with the current selection — and it happens in one server round trip.",
              },
              {
                decision: "Role authorization at the edge in middleware",
                rationale:
                  "The role is read from a cookie and matched against allowed path sets before any React code executes — no flash of unauthorized content, and no per-page access checks.",
              },
            ],
          },
          {
            type: "app-grid",
            caption: "Django app structure",
            items: [
              { app: "accounts", desc: "Custom user model, auth, roles" },
              { app: "vehicles", desc: "Cars, trucks, yachts + templates" },
              { app: "chat", desc: "Encrypted WebSocket live chat" },
              { app: "articles", desc: "MDX blog, tags, photos" },
              { app: "clients", desc: "Test drives, job applications" },
              { app: "store", desc: "Merchandise catalog, pricing" },
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: [
              "Next.js 14",
              "React 18",
              "TypeScript",
              "TailwindCSS",
              "Framer Motion",
              "TanStack Query v5",
              "TanStack Table v8",
              "@dnd-kit",
              "MDXEditor",
              "@react-pdf/renderer",
              "next-intl",
              "PostHog",
              "Django 5.0",
              "Django REST Framework",
              "Django Channels",
              "PostgreSQL 16",
              "Redis 7",
              "Fernet encryption",
              "Docker",
              "Traefik",
              "Nginx",
              "Ansible",
              "GitHub Actions",
              "Prometheus",
            ],
          },
          {
            type: "stat-grid",
            items: [
              { label: "Pages", value: "49" },
              { label: "Components", value: "130" },
              { label: "Server Actions", value: "76" },
              { label: "REST Endpoints", value: "~55" },
              { label: "Backend Apps", value: "6" },
              { label: "DB Tables", value: "~23" },
              { label: "Docker Containers", value: "7" },
              { label: "Locales", value: "2" },
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "lookup",
    title: "LookUp",
    service: "Machine Learning · BSc Thesis",
    accentColor: "#39B54A",
    nextDrawerId: "abac",
    card: {
      video: "/lookup.mp4",
      thumbnail: "/lookup.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Research", id: "research" },
      { label: "Thesis", id: "thesis" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "ML research project developed as part of the LookUp smart parking platform and as the basis of my BSc thesis at the European University of Tirana. The core problem: most traffic prediction models perform well under normal conditions but degrade when traffic is disrupted by planned public events — concerts, sports matches, large gatherings — because those spikes can't be inferred from historical data alone.",
          },
        ],
      },
      {
        id: "research",
        title: "Research",
        blocks: [
          {
            type: "p",
            children:
              "The research investigates whether incorporating event-related signals alongside historical traffic data meaningfully improves prediction accuracy. Event data — location, time, expected scale — is collected via web scraping and used as additional model input. A model trained on combined signals is evaluated against a baseline trained on historical data only, with accuracy, reliability, and response time as evaluation criteria.",
          },
          {
            type: "p",
            children:
              "The resulting predictions feed into the LookUp platform's pricing and availability surfaces, where demand spikes around nearby events are an important signal. Standard traffic models trained only on historical patterns systematically underperform during event-driven disruptions — exactly the scenario where accurate prediction most affects pricing and availability decisions.",
          },
        ],
      },
      {
        id: "thesis",
        title: "Thesis",
        blocks: [
          {
            type: "p-inline",
            children: [
              {
                highlight:
                  "Machine Learning-Based Traffic Prediction Using Historical Data and Event Information",
              },
              " — European University of Tirana, Faculty of Engineering, Informatics and Architecture. Supervisor: Dr. Jora Banda.",
            ],
          },
          {
            type: "info-grid",
            items: [
              { label: "Institution", value: "European University of Tirana" },
              {
                label: "Faculty",
                value: "Engineering, Informatics & Architecture",
              },
              { label: "Year", value: "2026" },
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "abac",
    title: "ABAC",
    service: "Open Source · Laravel",
    accentColor: "#DC143C",
    nextDrawerId: "notifyre",
    card: {
      background: "radial-gradient(ellipse at top left, #DC143C 0%, #111 70%)",
      thumbnail: "/abac-card.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Design", id: "design" },
      { label: "Schema", id: "schema" },
      { label: "Tooling", id: "tooling" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "An attribute-based access control library for Laravel 13+, built as the permission layer for Zennstream and then extracted and open-sourced. RBAC assigns permissions to roles; ABAC attaches constraints to those permissions — a user can read a resource, but only if their attributes match the resource's attributes. Rules are stored in the database, not code, so they can be created and modified at runtime without a deployment.",
          },
          {
            type: "link",
            href: "https://github.com/zennit-dev/abac",
            label: "zennit-dev/abac",
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        blocks: [
          {
            type: "flow",
            caption: "Evaluation graph",
            items: [
              { name: "Policy", detail: "method + resource type", arrow: true },
              {
                name: "ConditionGroup",
                detail: "AND / OR with nested sub-groups",
                arrow: true,
              },
              { name: "Check", detail: "key · operator · value", arrow: false },
            ],
            bottom: {
              label: "evaluate()",
              detail:
                "returns a scoped query, not a boolean — listing endpoints filter automatically",
              color: "border-violet-500/20 bg-violet-500/6 text-violet-300/80",
            },
          },
          {
            type: "p",
            children:
              'The key design decision is that evaluation returns a scoped query, not a boolean. Access control is embedded directly into the ORM layer — collection reads are automatically filtered to rows the caller is permitted to see, rather than blocking the request outright. A single evaluation call covers both "can this user access this resource" and "give me only what they\'re allowed to see."',
          },
          {
            type: "p",
            children:
              "Policies are evaluated through a composable three-level graph: a policy defines what operation is permitted on what resource type; condition groups attach AND/OR logic with nested sub-groups; individual checks compare actor and resource attributes. The evaluator is recursive — nested condition groups translate directly to nested query clauses, making complex multi-condition rules composable without code changes. Extra evaluation context can be injected at runtime without modifying the underlying model schema.",
          },
          {
            type: "p",
            children:
              "The service layer is built around swappable contracts for caching, metrics collection, and policy storage. Evaluation performance is monitored per call, with slow evaluations flagged in the log. The package ships with an Artisan command to generate a starter policy scaffold from existing route definitions, and a benchmarking suite.",
          },
        ],
      },
      {
        id: "schema",
        title: "Schema",
        blocks: [
          {
            type: "p",
            children:
              "Five tables back the full policy engine. Policies and chains are top-level records; checks attach to chains. Additional attribute tables extend actor and resource context at runtime without touching the underlying models.",
          },
          {
            type: "field-table",
            items: [
              {
                table: "abac_policies",
                fields: ["resource", "method"],
                desc: "One record per permission — what operation on what resource type",
              },
              {
                table: "abac_chains",
                fields: ["_policy", "_chain", "operator"],
                desc: "AND / OR condition groups; self-referential for nested sub-groups",
              },
              {
                table: "abac_checks",
                fields: ["_chain", "operator", "key", "value"],
                desc: "Leaf comparison — actor or resource attribute against a stored value",
              },
              {
                table: "abac_actor_additional_attributes",
                fields: ["key", "value"],
                desc: "Runtime context injected onto the actor without model changes",
              },
              {
                table: "abac_resource_additional_attributes",
                fields: ["model", "key", "value"],
                desc: "Runtime context injected onto a resource type without model changes",
              },
            ],
          },
        ],
      },
      {
        id: "tooling",
        title: "Tooling",
        blocks: [
          {
            type: "p",
            children:
              "The package ships an Artisan command that reads existing route definitions and generates a starter policy scaffold — each route becomes a policy stub with the resource and method pre-filled. A benchmarking suite measures evaluation performance per call, with slow evaluations automatically flagged in the log at a configurable threshold.",
          },
          {
            type: "cmd-grid",
            items: [
              {
                cmd: "abac:scaffold",
                desc: "Generate policy stubs from routes",
              },
              {
                cmd: "abac:benchmark",
                desc: "Run evaluation performance suite",
              },
              { cmd: "abac:cache", desc: "Warm the policy evaluation cache" },
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: [
              "PHP 8.3+",
              "Laravel 13",
              "PostgreSQL",
              "PHPStan",
              "Larastan",
              "Pest",
              "PHPBench",
            ],
          },
        ],
      },
    ],
  },
  {
    drawerId: "notifyre",
    title: "laravel-notifyre-sms",
    service: "Open Source · Laravel",
    accentColor: "#f9a8d4",
    nextDrawerId: "zennstream",
    card: {
      background: "radial-gradient(ellipse at top left, #f9a8d4 0%, #111 70%)",
      thumbnail: "/notifyre-card.png",
    },
    quickLinks: [
      { label: "Overview", id: "overview" },
      { label: "Design", id: "design" },
      { label: "Configuration", id: "configuration" },
      { label: "Persistence & Webhooks", id: "persistence" },
      { label: "Stack", id: "stack" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        blocks: [
          {
            type: "p",
            children:
              "A Laravel SMS notification package wrapping the Notifyre gateway, built during the Hire A Loo engagement when no maintained Notifyre Laravel SDK existed. Notifyre is a self-hostable SMS gateway — this package gives it first-class Laravel integration: a service facade, notification channel, Artisan commands, REST endpoints, and optional database persistence with webhook handling for delivery callbacks.",
          },
          {
            type: "link",
            href: "https://github.com/magic-systems-io/laravel-notifyre-sms",
            label: "magic-systems-io/laravel-notifyre-sms",
          },
        ],
      },
      {
        id: "design",
        title: "Design",
        blocks: [
          {
            type: "flow",
            caption: "Package architecture",
            items: [
              {
                name: "Laravel App",
                detail: "notification trigger",
                arrow: true,
              },
              {
                name: "Notifyre Channel",
                detail: "Laravel notification channel",
                arrow: true,
              },
              { name: "Driver", detail: "swappable transport", arrow: true },
              { name: "SMS Gateway", detail: "Notifyre API", arrow: false },
            ],
          },
          {
            type: "feature-badges",
            items: [
              {
                label: "DB Persistence",
                className:
                  "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300/70",
              },
              {
                label: "Webhook Callbacks",
                className:
                  "border-emerald-500/20 bg-emerald-500/[0.06] text-emerald-300/70",
              },
              {
                label: "Typed DTOs",
                className: "border-white/[0.08] bg-white/[0.04] text-white/50",
              },
              {
                label: "Phone Validation",
                className: "border-white/[0.08] bg-white/[0.04] text-white/50",
              },
              {
                label: "Dedicated Log Channel",
                className: "border-white/[0.08] bg-white/[0.04] text-white/50",
              },
            ],
          },
          {
            type: "p",
            children:
              "The package uses a driver architecture so additional transport backends can be added without touching the service layer. Requests and responses are fully typed via DTOs. Phone number validation runs before any network call is made.",
          },
          {
            type: "p",
            children:
              "Optional database persistence stores sent messages and inbound delivery callbacks. A dedicated log channel with configurable verbosity captures all send and receive activity independently of the application log — useful for debugging delivery issues without polluting the main log stream.",
          },
        ],
      },
      {
        id: "configuration",
        title: "Configuration",
        blocks: [
          {
            type: "p-inline",
            children: [
              "Published via ",
              { code: "php artisan vendor:publish" },
              ". All options can be set through environment variables — no code changes needed between environments.",
            ],
          },
          {
            type: "model-grid",
            items: [
              { model: "NOTIFYRE_API_KEY", detail: "Gateway API credential" },
              {
                model: "NOTIFYRE_DEFAULT_FROM",
                detail: "Sender identifier / number",
              },
              {
                model: "NOTIFYRE_PERSIST",
                detail: "Enable DB persistence (true/false)",
              },
              {
                model: "NOTIFYRE_WEBHOOK_SECRET",
                detail: "Signed delivery callback verification",
              },
              {
                model: "NOTIFYRE_LOG_CHANNEL",
                detail: "Dedicated log channel name",
              },
              {
                model: "NOTIFYRE_LOG_LEVEL",
                detail: "Verbosity — info / debug / error",
              },
            ],
          },
        ],
      },
      {
        id: "persistence",
        title: "Persistence & Webhooks",
        blocks: [
          {
            type: "p-inline",
            children: [
              "When persistence is enabled, sent messages are written to a",
              { code: "notifyre_messages" },
              "table with status, recipient, and gateway reference. The package exposes a webhook endpoint that receives delivery callbacks from Notifyre, verifies the signature, and updates the message record with the final delivery status — useful for auditing delivery failures without polling the gateway.",
            ],
          },
          {
            type: "endpoint-list",
            caption: "REST endpoints (when persistence enabled)",
            items: [
              {
                method: "POST",
                path: "/notifyre/webhook",
                desc: "Delivery status callback from gateway",
              },
              {
                method: "GET",
                path: "/notifyre/messages",
                desc: "List sent messages with status",
              },
              {
                method: "GET",
                path: "/notifyre/messages/{id}",
                desc: "Single message detail and delivery log",
              },
            ],
          },
        ],
      },
      {
        id: "stack",
        title: "Stack",
        blocks: [
          {
            type: "tech-stack",
            items: ["PHP 8.3+", "Laravel 12.20+", "Pest", "PHPStan"],
          },
        ],
      },
    ],
  },
];
