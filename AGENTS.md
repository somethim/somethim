# AGENTS.md - Docs-First Engineering Guide

This repository uses `docs/` as the canonical source of truth for product context, implementation patterns, and package usage.

Use this file as the entrypoint for any AI agent or developer, regardless of tool/editor.

---


## How To Work In This Repo

1. Start with `docs/index.md` for navigation.
2. Read `docs/context/` before making product or UX decisions.
3. Read `docs/agents/` before implementing code.
4. Read package-level docs in `docs/web/` and `docs/shared/` before building components.

If code and docs disagree, prefer docs intent unless explicitly instructed otherwise.

---

## Priority Sources


### Implementation Rules

- `docs/agents/AGENTS-checklist.md` - execution checklist.
- `docs/agents/AGENTS-style.md` - TypeScript and coding style conventions.
- `docs/agents/AGENTS-components.md` - React component patterns.
- `docs/agents/AGENTS-nextjs.md` - Next.js architecture and rendering patterns.
- `docs/agents/AGENTS-packages.md` - required use of `@zenncore/*` packages.

### Package Docs

- `docs/web/index.md` - web components.
- `docs/shared/index.md` - shared packages (`utils`, `icons`, `data-table`, `inferred-form`, `phone`).

---

## Non-Negotiable Standards

- Use `@zenncore/web` components for interactive UI; avoid custom raw HTML implementations for controls.
- Prefer `@zenncore/*` packages before adding local duplicates.
- Use semantic Tailwind tokens (`text-primary`, `bg-background`, `border-accent-foreground`, etc.), not raw color utility classes.
- Use `const` over `let`, descriptive variable names, early returns, and `resultify`-style error handling.
- Follow PPR/streaming on non-onboarding/non-auth pages: server-rendered shell in `page.tsx`, async server components wrapped in `<Suspense>` with matching skeletons.
- Do not invent product facts or KPI definitions when they already exist in `docs/context/`.

---

## Delivery Expectations

- Align implementation with documented product behavior and naming.
- Keep docs in sync when behavior changes intentionally.
- Prefer small, composable server/client boundaries over monolithic client pages.
- Use documented component APIs and package contracts before introducing new patterns.

---

## Learned User Preferences

- Keep onboarding and dashboard UX clear and structured, preferring dedicated pages when flows need detailed field explanations.
- Treat `docs/context/` as the canonical source for project-specific product context before implementation decisions.
