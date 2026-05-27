# Synis AI — Monorepo

This repo contains two parallel ecosystems: a **JS/TS** side (Bun + Turborepo with Next.js 16 and shared packages) and a
**PHP** side (two Laravel apps). Tooling is completely separate — no shared build pipeline.

## Agent instruction files

- [`agents/web/WEB.md`](./agents/web/WEB.md) — Web app, shared packages, coding conventions, JS toolchain
- [`agents/provider/PROVIDER.md`](./agents/provider/PROVIDER.md) — Laravel provider backend (Sail, Octane, Horizon, Pest)

> **Before implementing any task, read the relevant file(s) under `agents/` for full conventions and architecture context.**

## TL;DR for a new agent

| Question        | Answer                                                       |
|-----------------|--------------------------------------------------------------|
| Package manager | `bun` (root), `composer` (Laravel)                           |
| Linter          | `biome` for JS, `pint` for PHP                               |
| Tests           | none for JS, `pest` for provider                             |
| Task runner     | `turbo` for JS, `sail` for Laravel                           |
| Component docs  | `packages/docs/` has @synis-ai/web component API docs        |
| Framework       | Next.js 16 (web), Laravel 13 (provider)                      |
| State           | `apps/web` consumes `@synis-ai/*` packages; mobile is paused |
| Verification    | `bun lint && bun typecheck` (web), `pint && pest` (provider) |
| Portfolio       | `apps/arbi` — Arbi Kullakshi's standalone Next.js portfolio, no shared packages, see `ARBI.md` |
| File size caps  | Rough line ranges that follow from single-responsibility: Route 30-80, Hook 100-250, Component 50-200, Types 20-80, Data 50-150. If a file exceeds its range, it's almost certainly doing more than one thing — split it. Don't pad or strip whitespace to hit the number; if a file genuinely does one thing well and is longer, that's fine. |
