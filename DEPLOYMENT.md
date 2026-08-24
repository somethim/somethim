# Deployment notes

This document records deployment work that is intentionally deferred while the
application stack is built.

## Verified VPS topology

Verified read-only over SSH on 2026-08-24 against the VPS managed by
`/home/arbi/Work/Personal/infra`.

- One `postgres:17-alpine` service is already shared by CRM and Hypernova.
- The existing application databases are `crm` (owned by `crm`) and `prizm`
  (owned by `prizm`).
- PostgreSQL persists its data in the `crm_crm-pgdata` Docker volume.
- PostgreSQL and `prizm-provider` communicate over the external `data` network.
- `portfolio-web` and `portfolio-legacy` currently belong only to `edge`.
- No PostgreSQL backup timer or backup container was found. The VPS
  `dpkg-db-backup` timer is unrelated to PostgreSQL.

## Database decision

Use the existing PostgreSQL service. Do not deploy another PostgreSQL container
and do not introduce SQLite.

Portfolio requires PostgreSQL 18 (the seed and future backend use the native
`uuidv7()` function, added in 18). The shared service currently runs
`postgres:17-alpine`, so the infra repo must upgrade it — note this touches
the `crm` and `prizm` databases too, so it needs a planned `pg_upgrade` (or
dump/restore) with backups taken first, not just an image-tag bump.

Create an isolated database and least-privilege role within the shared service:

- database: `portfolio`
- owner/role: `portfolio`
- deployment secret: `PORTFOLIO_DB_PASSWORD`
- internal host: `postgresql:5432`

The resulting server-side connection URL has this shape:

```text
postgres://portfolio:<url-encoded-password>@postgresql:5432/portfolio
```

Database and role creation must be an idempotent Ansible task. Adding another
file under `/docker-entrypoint-initdb.d` is insufficient because those scripts
only run when PostgreSQL initializes a fresh data directory.

## Deferred infrastructure work

1. Add `PORTFOLIO_DB_PASSWORD` to the infra deployment secrets and required
   Ansible variables.
2. Provision the `portfolio` role and database idempotently in the existing
   PostgreSQL service.
3. Connect only `portfolio-web` to the external `data` network; the legacy site
   does not need database access.
4. Render `DATABASE_URL` into the Portfolio environment without logging it.
5. Replace the Portfolio stack's remaining Next.js runtime configuration with
   the Leptos server configuration:
   `LEPTOS_SITE_ADDR=0.0.0.0:3000` and health check path `/api/health`.
   Set `WEBAUTHN_ORIGIN=https://arbikullakshi.com` — passkeys are bound to
   this origin, and credentials enrolled against a different one stop working.
   See `.env.example` for the full list of variables.
6. Add a persistent volume for CV storage and expose its path through a
   server-only environment variable.
7. Add scheduled, tested, off-site backups for PostgreSQL and the CV storage
   volume, including a documented restore procedure.

Traefik already sends all paths on the Portfolio hostname to one application,
so page routes and `/api/*` remain same-origin. No CORS layer is required.
