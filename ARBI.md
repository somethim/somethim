# Arbi Kullakshi

Full Stack Engineer. I architect and ship production-ready systems end-to-end — React and Next.js web apps, React Native mobile apps, scalable backend infrastructure, and automated CI/CD pipelines. I focus on pragmatic architecture, performance, and infrastructure ownership so teams move fast without accumulating technical debt.

**Email:** contact@arbikullakshi.com  
**GitHub:** somethim  
**Website:** https://arbikullakshi.com

---

## What I Do

- **Full Stack Engineering** — end-to-end product delivery across web, mobile, and backend: React/Next.js frontends, REST APIs, real-time services, and database design
- **Backend Architecture** — designing production SaaS backends from scratch: system structure, deployment workflows, scalability strategy, and high-availability environments
- **Infrastructure & DevOps** — CI/CD pipelines, containerized deployments with Docker and Traefik, reverse proxy configuration, and GitHub/GitLab CI automation
- **Auth & Security** — custom identity systems: multi-provider OAuth, MFA, security keys, ABAC permission management, device-level session control
- **Mobile Development** — React Native apps for iOS and Android with REST/WebSocket integration and automated deployment workflows

---

## Experience

**Full Stack Engineer — zennit**
Jan 2024 – Present · Remote

Developed high-performance React and Next.js web applications and React Native mobile apps with real-time backend integration. Architected backend infrastructure from scratch — system structure, deployment workflows, and scalability strategy. Designed and automated CI/CD pipelines using Docker, Traefik, and GitHub/GitLab CI. Led backend system design for production SaaS platforms in high-availability environments. Built a custom authentication and identity system supporting multi-provider OAuth, MFA, security keys, and single-use password flows. Implemented a multi-organization user model with profile-based relationships and custom ABAC permission management. Added device-level remote session management and secure session invalidation.

---

**Backend Developer — Hire A Loo**
Aug 2025 – Feb 2026

Implemented backend APIs and integrated full-text search using Laravel Scout with Typesense. Ensured synchronisation between database models and search indexing workflows, optimising data retrieval and search accuracy. Refactored data models and business logic for improved performance. Facilitated migration of a legacy backend system to a redesigned architecture, improving reliability and maintainability.

---

**Full Stack Developer — Clickservice GmbH**
Jan 2023 – Jan 2024

Worked on click-clock.work — an internal workforce management platform: time tracking, worker scheduling, and operational tooling for internal teams. Built the Django backend with optimised PostgreSQL queries, improved performance through direct SQL query tuning beyond ORM abstractions, integrated third-party APIs, and developed the React/TypeScript frontend.

---

**Mobile Developer — Vodafone Albania**
Jan 2022 – Dec 2022

Developed and maintained React Native applications for iOS and Android, enhancing user experience across platforms. Integrated REST APIs and WebSocket connections to enable real-time features. Implemented secure authentication mechanisms and automated deployment workflows.

---

## Works

### zennstream
*Full Stack · Backend Platform · zennit*

Zennstream is the core infrastructure layer of the Zennit SaaS platform — a multi-tenant backend that organizations use to manage their workforce, projects, time, leave, events, and AI-assisted workflows in one place. It serves HR teams, project leads, and individual contributors inside an organization, with product modules that can be enabled or disabled per tenant. Other products built on Zennit plug into Zennstream as a composable foundation rather than building tenant, auth, and permission logic from scratch.

**Architecture**

Modular Laravel monolith with 10 independently scoped modules, auto-loaded at boot. Each module is fully self-contained — routes, migrations, models, services, jobs, and notifications live within it. Composable, not independently deployable.

**Multi-tenancy**

A user can belong to multiple organizations simultaneously through independent profile records. Every request is scoped to an active organization, anchoring all downstream queries — leave, projects, time, permissions — to that context rather than raw user identity. Feature modules are enabled or disabled per organization, gating entire product areas without per-route conditionals.

**Auth**

Identity and credentials are separated — one user can hold multiple credential accounts (email/password plus any of 12 OAuth providers), each independently verified. MFA is tracked per credential rather than per user. Every login event writes a full audit record: session fingerprint, IP, platform, and location — without storing the session token in plaintext. Passwordless entry uses time-limited signed links.

**Access control**

Access rules are stored in the database as a composable policy graph, not hard-coded in the application. Policies define what operation is permitted on what resource; condition groups attach AND/OR logic; individual checks compare actor and resource attributes. The evaluator returns a scoped query rather than a boolean — listing endpoints automatically return only rows the caller is permitted to see, with no separate filtering step needed.

**AI**

12 LLM providers selectable per conversation or per user preference. Conversations can be forked at any message, with the branch point stored as an exact reference so it remains stable as the parent thread grows — designed for exploratory workflows where users try alternate continuations. Documents are stored as 1536-dim vector embeddings for semantic retrieval during conversations. An MCP server exposes the AI layer to compatible clients natively. Sharing uses a two-phase model: owners grant access directly; non-owners submit a request that goes through an approval flow — both paths converge on the same underlying permission grant.

**Offline-first sync**

A single batch endpoint accepts named reads and typed mutations (insert, update, delete) in one request. Mutations are routed through the same validation and business logic as standard REST calls, with per-item error isolation in the response. Designed for clients that queue operations offline and replay them on reconnect — not for real-time push. WebSocket infrastructure is in place as the transport layer for a future broadcast implementation.

**Social publishing**

OAuth tokens for 5 platforms are stored encrypted per organization with proactive refresh before expiry. Posts are scheduled and dispatched with full status tracking and error capture per platform.

**Design decisions**

- Uniform schema conventions are enforced at the framework level across all tables — primary key format, timestamp fields, and foreign key naming are all standardized as infrastructure, not documentation.
- All many-to-many relationships are first-class models with their own primary keys and soft deletes, making every relationship independently auditable and extensible without retrofitting.
- Task dependencies are encoded as a directed graph — independently queryable and auditable.
- Event types carry a JSON attributes payload validated against a separate schema definition, so new event types can be added without a migration.
- Leave requests are tied to a specific contract allowance rather than just a profile, making quota enforcement exact per employment period.

**Stack**

PHP 8.5, Laravel 13, PostgreSQL + pgvector, Redis, Laravel Horizon, Laravel Reverb, Laravel Octane, Laravel Pulse, Laravel Passport + Sanctum, Laravel Socialite (12 providers), TOTP, Twilio, zennit/abac, spatie/laravel-data, Resend, Laravel Scout

**Scale**

10 modules · ~65 DB tables · 8 background jobs · 24 notification classes · 3 notification channels · 12 AI providers · 12 OAuth providers · 5 social platforms · 3 MCP components · ~140 API endpoints

---

### Mektrin Motors
*Full Stack · zennit*

Mektrin Motors is a bilingual (Albanian/English) vehicle dealership platform serving a high-end multi-brand dealership in Albania. It replaces a manually-managed showroom workflow with a full product and CRM system: staff upload listings, manage pricing and discounts, publish blog articles, post job openings, and handle inbound customer inquiries — all from a role-gated internal dashboard. Customers browse a public storefront surfacing cars, trucks, and yachts with faceted filtering, book test drives, apply for jobs, and chat live with sales agents.

**Frontend**

Next.js 14 (App Router), React 18, TypeScript. Two route groups: a public storefront and a protected staff CMS. The storefront covers vehicle listings for three vehicle types, a merchandise store, blog, service pages, test drive booking, and about section. The CMS covers listings, templates, store items, staff management, job postings, applications, blog posts, and live chat.

Faceted filtering returns distinct attribute values narrowed by the current filter context server-side — selecting one filter prunes the available options for every other filter automatically, in a single round trip. All filter state lives in the URL, making filtered views shareable and bookmarkable. Drag-and-drop image ordering is persisted server-side. PDF offer sheets are generated client-side. Blog posts are authored in a rich MDX editor. Role authorization runs at the edge in middleware before any React code executes — no flash of unauthorized content.

**Backend**

Django 5.0 + Django REST Framework, six self-contained apps. The server runs in dual mode: one process handles HTTP/REST, a separate one handles WebSocket — deployed as independent containers behind the same proxy. Auto-generated OpenAPI schema is exposed for the full API surface.

The vehicle catalog splits into Templates (master product catalog, staff-only) and Listings (published inventory, public read). Three vehicle types share a common attribute shape, with type-specific fields added where needed. A shared filtering implementation across all vehicle endpoints handles multi-value params, range filters, text search, and sort via inheritance — no duplicated logic per type.

Live chat encrypts messages per room using a unique symmetric key stored with the room record. Messages buffer in Redis during an active session and flush to the database on disconnect — still encrypted. Staff connect with an authenticated WebSocket; anonymous sessions are finalized on disconnect. Historical messages are replayed in order on reconnect.

The auth system uses a custom user model with name as the login identifier and a role enum that drives both API access and Django superuser status automatically. Per-verb permission rules on viewsets mean each HTTP method carries its own access policy without separate view classes. Auth responses return the token and role together so the frontend can initialize in one round trip.

Blog content is stored as markdown files on disk rather than in the database. Store items auto-compute sale percentages and final prices on save. CMS-managed banner content is keyed by position and fetched dynamically by the frontend.

**Infrastructure & deployment**

Single bare-metal VPS. Seven Docker containers managed via Ansible: reverse proxy with Let's Encrypt TLS, PostgreSQL, Redis, HTTP API server, WebSocket server, static file server, and Next.js frontend. Hardware metrics collected via Prometheus Node Exporter as a systemd service.

Two CI workflows trigger on semver tags scoped to path filters: one builds three backend images (HTTP, WebSocket, static file server) from a multi-stage Dockerfile and pushes to GHCR; the other builds the frontend image and pushes to GHCR. Deployment runs an Ansible playbook that pulls images, recreates containers, and runs database migrations — no manual steps on the server. All credentials are managed with Ansible Vault and injected as container environment variables at deploy time — no env files on disk in production.

Traefik handles TLS with Let's Encrypt ACME, routes containers via Docker labels, and globally redirects HTTP to HTTPS. Network and hardware metrics are exposed at authenticated endpoints for monitoring.

**Design decisions**

- Separate HTTP and WebSocket server processes rather than a single ASGI server — REST gets a mature process model optimized for throughput, WebSocket gets its own isolated process. Stability trade-off for a system where HTTP traffic vastly outnumbers WebSocket connections.
- Redis as a hot buffer for chat, Postgres as cold archive — bulk flush on disconnect avoids write contention under concurrent WebSocket sessions. Acceptable durability trade-off for a support chat context.
- Per-room symmetric encryption — message content is protected against database dumps without external key management infrastructure. Intentional operational simplicity trade-off.
- Context-aware filter options — each attribute's available values are computed with all other active filters applied except its own, so the UI stays coherent with the current selection in one server round trip.
- Role authorization at the edge — the role is read from a cookie and matched against allowed path sets in middleware before any page renders.

**Stack**

Next.js 14, React 18, TypeScript, TailwindCSS, Radix UI, Framer Motion, @dnd-kit, TanStack Query v5, TanStack Table v8, react-hook-form, zod, MDXEditor, @react-pdf/renderer, next-intl, recharts, Mux, PostHog, Google Analytics GA4 · Django 5.0, Django REST Framework, Django Channels, PostgreSQL 16, Redis 7, Fernet encryption · Docker, Traefik, Nginx, Ansible, GitHub Actions, GHCR, Prometheus

**Scale**

49 pages · 130 components · 76 server actions · ~55 REST endpoints · 1 WebSocket endpoint · 6 backend apps · ~23 DB tables · 7 Docker containers · 2 CI workflows (4 images total) · 7 Ansible roles · 4 roles · 3 vehicle types × 2 (listing + template) · 2 locales

---

### LookUp — Traffic & Demand Prediction
*Machine Learning · BSc Thesis Research*

ML research project developed as part of the LookUp smart parking platform and as the basis of my BSc thesis at the European University of Tirana. The core problem: most traffic prediction models perform well under normal conditions but degrade when traffic is disrupted by planned public events — concerts, sports matches, large gatherings — because those spikes can't be inferred from historical data alone.

The research investigates whether incorporating event-related signals alongside historical traffic data meaningfully improves prediction accuracy. Event data (location, time, expected scale) is collected via web scraping and used as additional model input. A model trained on combined signals is evaluated against a baseline trained on historical data only, with accuracy, reliability, and response time as evaluation criteria. The resulting predictions feed into the LookUp platform's pricing and availability surfaces, where demand spikes around nearby events are an important signal.

**Thesis:** *Machine Learning-Based Traffic Prediction Using Historical Data and Event Information* — European University of Tirana, Faculty of Engineering, Informatics and Architecture. Supervisor: Dr. Jora Banda.

---

### ABAC
*Open Source · Laravel Package*

An attribute-based access control library for Laravel 13+, built as the permission layer for zennstream and then extracted and open-sourced. RBAC assigns permissions to roles; ABAC attaches constraints to those permissions — a user can read a resource, but only if their attributes match the resource's attributes. Rules are stored in the database, not code, so they can be created and modified at runtime without a deployment.

The key design decision is that evaluation returns a **scoped query, not a boolean**. Access control is embedded directly into the ORM layer — collection reads are automatically filtered to rows the caller is permitted to see, rather than blocking the request outright. A single evaluation call covers both "can this user access this resource" and "give me only what they're allowed to see."

Policies are evaluated through a composable three-level graph: a policy defines what operation is permitted on what resource type; condition groups attach AND/OR logic with nested sub-groups; individual checks compare actor and resource attributes. The evaluator is recursive — nested condition groups translate directly to nested query clauses, making complex multi-condition rules composable without code changes. Extra evaluation context can be injected at runtime without modifying the underlying model schema.

The service layer is built around swappable contracts for caching, metrics collection, and policy storage. Evaluation performance is monitored per call, with slow evaluations flagged in the log. The package ships with an Artisan command to generate a starter policy scaffold from existing route definitions, and a benchmarking suite.

https://github.com/zennit-dev/abac

**Stack**

PHP 8.3+, Laravel 13, PostgreSQL, PHPStan, Larastan, Pest, PHPBench

---

### laravel-notifyre-sms
*Open Source · Laravel Package*

A Laravel SMS notification package wrapping the Notifyre gateway, built during the Hire A Loo engagement when no maintained Notifyre Laravel SDK existed. Notifyre is a self-hostable SMS gateway — this package gives it first-class Laravel integration: a service facade, notification channel, Artisan commands, REST endpoints, and optional database persistence with webhook handling for delivery callbacks.

The package uses a driver architecture so additional transport backends can be added without touching the service layer. Requests and responses are fully typed via DTOs. Phone number validation runs before any network call is made. Optional database persistence stores sent messages and inbound delivery callbacks. A dedicated log channel with configurable verbosity captures all send and receive activity independently of the application log.

https://github.com/magic-systems-io/laravel-notifyre-sms

**Stack**

PHP 8.3+, Laravel 12.20+, Pest, PHPStan

---

## Stack

| Area | Technologies |
|------|-------------|
| Languages | TypeScript, Python, PHP |
| Frontend | React, Next.js, React Native |
| Backend | Laravel, Django, Convex |
| Data & Search | PostgreSQL, Redis, Typesense |
| Infrastructure | Docker, Traefik, Nginx |
| CI/CD | GitHub Actions, GitLab CI |
| Auth & Security | OAuth, MFA, ABAC |

---

## Education

**BSc Informatic Engineering** — European University of Tirana, 2026  
**ICT Vocational Degree** — Hermann Gmeiner High School, 2023

---

## About

I build systems that are reliable, maintainable, and fast. I care about infrastructure ownership — not just shipping features, but making sure the deployment pipeline, database design, and access control are solid from day one. I started at the frontend and moved progressively deeper into the stack because I wanted to understand every layer of what I was shipping.
