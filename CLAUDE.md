# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo overview

This is a monorepo with two independent ecosystems — a JS/TS side and a PHP side — that share no build pipeline.

- **`apps/web/`** — Next.js 16 + React 19 product
- **`apps/provider/`** — Laravel 13 backend (PHP 8.5)
- **`apps/mobile/`** — Expo/React Native (paused, do not touch unless asked)
- **`apps/arbi/`** — Arbi Kullakshi's portfolio (Next.js, see `ARBI.md`) *(in progress)*
- **`packages/web/`** — `@synis-ai/web` — 39 Base UI component library
- **`packages/shared/`** — `@synis-ai/utils`, `@synis-ai/icons`, `@synis-ai/inferred-form`, `@synis-ai/data-table`, `@synis-ai/config`, `@synis-ai/phone`
- **`packages/docs/`** — Component API docs for `@synis-ai/web`

Before working in either ecosystem, read its detailed guide:
- **JS/TS**: `agents/web/WEB.md` + sub-guides in `agents/web/`
- **PHP**: `agents/provider/PROVIDER.md` + sub-guides in `agents/provider/`

---

## JS/TS commands

| Task | Command |
|------|---------|
| Dev (all) | `bun dev` |
| Dev (web only) | `bun --filter web dev` |
| Build | `bun build` |
| Lint | `bun lint` (Biome) |
| Format | `bun format` (Biome check --write) |
| Typecheck | `bun typecheck` (tsc --noEmit) |
| Build a package | `cd packages/<name> && bun build` |

**Verification order**: `biome check --write .` → `tsc --noEmit`. No JS tests exist.

Tooling: **Bun** (not npm/pnpm/yarn), **Biome** (not ESLint/Prettier), **tsdown** (not tsup/vite), **Tailwind v4** (config in CSS, no `tailwind.config.*`).

---

## PHP (provider) commands

All commands run inside Sail (`vendor/bin/sail <cmd>`). Run from `apps/provider/`.

| Task | Command |
|------|---------|
| Start Sail | `vendor/bin/sail up -d` |
| Dev (full stack) | `composer run dev` |
| Lint | `vendor/bin/sail pint` |
| Test | `vendor/bin/sail test` |
| Single test | `vendor/bin/sail artisan test --compact --filter=testName` |
| Lint + test | `composer run verify` |
| Create module | `vendor/bin/sail artisan make:module {Name}` |
| Refresh migrations | `vendor/bin/sail artisan modules:refresh-migrations && vendor/bin/sail artisan migrate` |

---

## JS/TS architecture

### Package-first component model

App code consumes `@synis-ai/web/components` — never `@base-ui/react` directly. Check `packages/docs/web/` for component API before implementing. If a component is missing, create it in `packages/web/src/components/`.

Key utilities:
- `cn(...)` from `@synis-ai/utils` for class merging
- `resultify` from `@synis-ai/utils` instead of `try/catch`
- `createContext` from `@synis-ai/utils/hooks` for React context
- `useAsyncAction` from `@synis-ai/utils/hooks` for async state
- `InferredForm` + `field()` for all forms (never raw react-hook-form)
- `DataTableProvider` + `DataTable` for all tables
- `es-toolkit` for lodash-style utilities

### Component file placement

| Component type | Location |
|---------------|----------|
| Only used by one page | `app/**/_components/` |
| Used by multiple pages | `components/` |
| Shared across apps | `packages/web/src/components/` |

Pages (`app/**/page.tsx`) own their logic directly — no thin wrapper pages that just re-export a component.

### Key code rules (see `agents/web/AGENTS-style.md` for full details)

- No `useMemo`, `useCallback`, `useEffect` — React compiler handles memoization
- `const` only, arrow functions everywhere, no abbreviated names
- `resultify` over `try/catch`; `switch (true)` for multi-branch conditionals
- `"use client"` at leaf boundaries only
- `satisfies` over `as Type` assertions; `unknown` over `any`
- No `types/` folder at root — declare in `types/[domain].ts` or co-locate

### Auth proxy

API calls go through Next.js middleware that forwards to `NEXT_PUBLIC_API_URL`, attaching the Sanctum session cookie and `Authorization` header.

### CSS

Tailwind v4 with **semantic design tokens** (`bg-background`, `text-foreground`, `bg-primary`) — these adapt to dark mode automatically, no `dark:` prefix needed for colors. `globals.css` contains only `@import "tailwindcss"`, `@variant dark`, `@theme`, `@layer base`, font-face, and minimal resets. Dark mode via `next-themes` (`ThemeProvider` in `app/providers.tsx`).

---

## PHP (provider) architecture

### Modular monolith

Domain code lives in `Modules/`, not `app/`. 9 modules registered in `config/modules.php`:

`Common` → `Auth` → `Organization` → `LeaveManagement` → `ProjectManagement` → `TimeTracking` → `Event` → `OfflineSync` → `AI`

`ModuleServiceProvider` auto-loads routes, migrations, channels, and providers from each module directory. Never change module dependencies or create new top-level `Modules/` folders without approval.

### Module structure

Each module is self-sustainable — models, controllers, services, routes, migrations, DTOs, enums, policies, jobs, notifications all live inside the module. The `Common` module provides shared base classes only.

### Database conventions

Primary keys: `_id` (uuid). Timestamps: `_createdAt`, `_updatedAt`, `_deletedAt` (via `Blueprint::_id()` and `Blueprint::_timestamps()` macros). Foreign keys use the `_<table>` naming pattern.

### Route conventions

Protected routes use `['auth', 'account.verified', 'profile.session', 'abac']` middleware. Public routes are placed outside middleware groups. Each module's entrypoint: `Modules/<Module>/Routes/api.php`.

### Migration workflow

1. Add file to `Modules/<Module>/Database/Migrations/` with next numeric prefix (`0_`, `1_`, etc.)
2. Run `vendor/bin/sail artisan modules:refresh-migrations`
3. Run `vendor/bin/sail artisan migrate`
