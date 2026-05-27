# Synis AI — Web / JS Ecosystem

## Summary Checklist

Quick reference for all coding conventions. See linked sub-guides for details.

- [ ] **Repo structure** — `apps/web/` (Next.js), `packages/web/` (Base UI components), `packages/shared/*/` (utils, icons, config, etc.)
- [ ] **Commands** — `bun dev`, `bun build`, `bun lint`, `bun format`, `bun typecheck` (see [commands](#commands))

### Code Style ([AGENTS-style.md](./AGENTS-style.md))

- [ ] No `useMemo`, `useCallback`, or `useEffect` — React compiler handles memoization; `useEffect` signals unplanned side effects
- [ ] Use `const` only; avoid `let`
- [ ] Use arrow functions everywhere
- [ ] No abbreviated names (use full words)
- [ ] Prefer single-word variable names where possible
- [ ] Use IIFEs for scoped computations and element rendering
- [ ] Use `switch (true)` for multi-branch conditionals
- [ ] Use `resultify` instead of `try/catch` for async operations
- [ ] Early returns for guard clauses
- [ ] Omit `{}` for single-statement conditionals
- [ ] Don't exhaustively handle every error case
- [ ] Return `null` for "not found" instead of throwing
- [ ] Prefix unused destructured variables with `_`
- [ ] Use `as const` for literal narrowing and static data arrays
- [ ] Document `@ts-expect-error` / `biome-ignore` with rationale
- [ ] Use `void` for fire-and-forget async
- [ ] Default parameters for optional options
- [ ] Object shorthand when names match
- [ ] No `types` folder at root — declare domain types in `types/[domain].ts`, or co-locate with their primary consumer if single-use
- [ ] Generic filenames — group related hooks/utils in one file
- [ ] Prefer `satisfies` over `as Type` assertions
- [ ] Use `unknown` (not `any`) for truly unknown types
- [ ] Suppress unavoidable `any` with `// biome-ignore lint/suspicious/noExplicitAny`

### Components ([AGENTS-components.md](./AGENTS-components.md))

- [ ] Arrow functions for all components; `function` keyword only for Next.js pages/layouts
- [ ] Named exports for all components; anonymous defaults only for Next.js pages/layouts
- [ ] Namespace + component pattern for all typed components (`Component.Props`, `Component.State`)
- [ ] Explicit `JSX.Element` return type for package components
- [ ] Implicit return (parens) for JSX-only components; block body only when logic precedes return
- [ ] Static data defined outside the component with `as const`
- [ ] Inline unexported sub-components for local discriminated rendering
- [ ] Use `createContext` from `@synis-ai/utils/hooks` for all React context
- [ ] Use `useRender` + `mergeProps` from Base UI for `packages/web/` components
- [ ] Use `classList` + `ClassList<K>` for sub-element styling in package components
- [ ] `"use client"` at leaf boundaries only (components using hooks/state), not every file

### Next.js ([AGENTS-nextjs.md](./AGENTS-nextjs.md))

- [ ] Read `apps/web/node_modules/next/dist/docs/` before any Next.js work — docs are source of truth
- [ ] Server components for pages; extract interactive parts to `_components/`
- [ ] No raw `<input>`, `<textarea>`, `<select>` — use `@synis-ai/web/components`

### CSS — Tailwind Only ([#css-convention](#css-convention)) + next-themes

- [ ] See [AGENTS-theme.md](./AGENTS-theme.md) for full theme standards
- [ ] `globals.css` only contains `@import "tailwindcss"`, `@variant dark`, `@theme`, `@layer base`, global resets, and `@font-face`
- [ ] No component-specific CSS in globals.css — all component styling via Tailwind utility classes (`className`)
- [ ] Custom component CSS extracted to a co-located `.css` module file when Tailwind can't express the style
- [ ] Use **semantic** design tokens (`bg-background`, `text-foreground`, `bg-primary`) before palette tokens (`bg-white`, `text-slate-900`)
- [ ] `next-themes` provides theme toggling; `ThemeProvider` wired in `app/providers.tsx`, `useTheme` in components
- [ ] `suppressHydrationWarning` on `<html>` in `app/layout.tsx`

### @synis-ai Packages ([AGENTS-packages.md](./AGENTS-packages.md))

- [ ] **Package-first** — always prefer `@synis-ai/web/components`; check `packages/docs/web/` first; create in `packages/web/src/components/` if missing; stop and consult if existing component needs changes
- [ ] Import icons from `@synis-ai/icons` — all named `[Name]Icon`; verify exports before using
- [ ] Use `cn(...)` from `@synis-ai/utils` for class merging
- [ ] Use `ClassList<K>` for `classList` props on components with sub-elements
- [ ] Use `createContext` from `@synis-ai/utils/hooks` for all React context
- [ ] Use `useAsyncAction` from `@synis-ai/utils/hooks` for async actions with loading state
- [ ] Use `resultify` from `@synis-ai/utils` instead of `try/catch`
- [ ] Use `InferredForm` + `field()` for all forms — never raw react-hook-form
- [ ] Use `DataTableProvider` + `DataTable` for all tables
- [ ] Import all UI from `@synis-ai/web/components`, never from `@base-ui/react` directly in app code
- [ ] Use semantic design tokens; avoid raw Tailwind colors
- [ ] Use `es-toolkit` for lodash-style utilities (debounce, throttle, merge, etc.)

---

## Repo structure (JS side)

```
synis-ai/
├── apps/
│   ├── web/              # Next.js 16 + React 19 — THE product (standalone)
│   └── mobile/           # Expo/React Native (paused, still in workspace)
├── packages/
│   ├── web/              @synis-ai/web       — 39 Base UI components (tsdown)
│   ├── mobile/           @synis-ai/mobile    — RN components (paused)
│   └── shared/
│       ├── utils/        @synis-ai/utils     — cn(), ClassList, type utilities, hooks
│       ├── icons/        @synis-ai/icons     — 90+ SVG icon components
│       ├── phone/        @synis-ai/phone     — Phone number validation
│       ├── data-table/   @synis-ai/data-table — Data table logic
│       ├── inferred-form/ @synis-ai/inferred-form — Inferred form system
│       └── config/       @synis-ai/config    — TS configs, Tailwind theme, tsdown presets
├── packages/docs/        # Component library docs (@synis-ai)
├── turbo.json            # Task orchestrator
├── biome.json            # Linter/formatter (no ESLint/Prettier)
└── package.json          # Bun workspace root
```

## Key architectural facts

- **`apps/web` now consumes `@synis-ai/*` packages** — added workspace refs: `@synis-ai/icons`, `@synis-ai/phone`,
  `@synis-ai/utils`, `@synis-ai/web`, `@synis-ai/config`. See `packages/docs/` for component API docs.
- **`apps/web` has its own Laravel backend removed** — all PHP backend work moved to `apps/provider`.
- **Mobile is paused** but kept in the workspace. Don't touch unless asked.
- **All packages use `@synis-ai/*` scope.** Docs at `packages/docs/` list a `Calendar` component that does not yet exist in
  source — build from `@base-ui/react/calendar` if needed.
- **`packages/web/` provides 39 components** (Accordion, Button, Dialog, Select, Table, etc.) built on Base UI. Calendar
  component does not yet exist — build it from `@base-ui/react/calendar` if needed.
- **`apps/web/` follows the same coding patterns** as packages — arrow functions, named exports, namespace types.

## Page vs Component Architecture

### Pages live in `app/`, Components live in `components/`

```
# ✅ Good — pages contain actual logic
app/(public)/pricing/page.tsx
  export default function PricingPage() {
    return (
      <main>
        <PricingHeader />
        <PricingPlans />
      </main>
    );
  }

# ❌ Bad — thin wrapper pages
app/(public)/pricing/page.tsx
  import { PricingPage } from "@/components/public/pricing/PricingPage";
  export default () => <PricingPage />;

# ❌ Bad — page-specific components in global components/
components/public/pricing/PricingHeader.tsx  # Only used by pricing page

# ✅ Good — page-specific components co-located
app/(public)/pricing/_components/PricingHeader.tsx
```

### When to use each location:

| Location | Purpose | Example |
|----------|---------|---------|
| `app/**/page.tsx` | Page entry point with layout + logic | `app/(auth)/dashboard/page.tsx` |
| `app/**/_components/*.tsx` | Page-specific components | `app/(auth)/dashboard/_components/Stats.tsx` |
| `components/*.tsx` | Shared components used by multiple pages | `components/ui/AppIcon.tsx` |
| `components/dashboard/*.tsx` | Shared dashboard components | `components/dashboard/WorkflowBuilder.tsx` |

### Rule of thumb:
- If a component is only used by **one page** → put it in `app/**/_components/`
- If a component is used by **multiple pages** → put it in `components/`
- If a component is **shared across apps** → put it in `packages/web/src/components/`

### One File, One Thing Principle

The line count guidelines (Route 30-80, Hook 100-250, Component 50-200, Types 20-80, Data 50-150) are **warning signals, not targets**. A file should have exactly one responsibility:

| File Type | Responsibility | What to Exclude |
|-----------|---------------|-----------------|
| **Types** | Type definitions only | No logic, no runtime code |
| **Constants** | Static data only | No functions, no components |
| **Hooks** | Single custom hook | No type definitions, no unrelated utilities |
| **Components** | Single component | No embedded data arrays, no type definitions |
| **Utils** | Single utility or tightly related group | No business logic, no components |

If a file exceeds its line range, it's almost certainly doing more than one thing — **split it**. Don't pad files to hit the number; don't strip whitespace to fit. If a file genuinely does one thing well and is longer, that's acceptable, but this should be rare.

**Examples of violations:**
- A hook file that defines 50 lines of types + 100 lines of hook logic → Split types to `types/` or co-locate with domain
- A component with 60 lines of static data + 120 lines of JSX → Extract data to `constants/` or `data/`
- A provider with types, constants, utilities, AND the component → Split each concern

### When Thin Wrapper Pages Are Acceptable

Pages that simply return a component are discouraged but acceptable when:
1. The wrapped component is large/complex (justifies separation)
2. The component is reused elsewhere (e.g., modal, storybook)
3. The page is a redirect route

Thin wrappers should be **enhanced** when they could handle server-side data fetching instead of delegating to the component.

## Commands

| What          | How                                                   |
|---------------|-------------------------------------------------------|
| Dev all       | `bun dev` (turbo dev)                                 |
| Build all     | `bun build` (turbo build)                             |
| Lint JS       | `bun lint` (turbo run //#lint — biome)                |
| Format JS     | `bun format` (biome check --write)                    |
| Typecheck JS  | `bun typecheck` (turbo typecheck — tsc --noEmit)      |
| Test JS       | **not configured** — no test framework or tests exist |
| Dev web only  | `bun --filter web dev` or `cd apps/web && bun dev`    |
| Build package | `cd packages/<name> && bun build` (runs tsdown)       |
| Package dev   | `cd packages/<name> && bun dev` (tsdown --watch)      |

**Order for JS changes**: `biome check --write .` → `tsc --noEmit` (no test step).

## Tooling quirks

- **Package manager**: Bun (v1.3.6), not npm/pnpm/yarn. Lockfile is `bun.lock`. Root has `linker = "isolated"` in
  `bunfig.toml`.
- **Linter/formatter**: **Biome** is the only JS tool. No ESLint, Prettier, Husky, lint-staged.
    - Import organization on save via `assist.actions.source.organizeImports`.
    - CSS class sorting (warn) enabled for `clsx`, `cva`, `tw`, `cn`.
    - Rules: `noForEach` is error, `noSvgWithoutTitle` is off, `noNonNullAssertion` is warn,
      `useAsConstAssertion` is error, `noInferrableTypes` is error.
- **Package build**: `tsdown` (not tsup, not vite, not tsc). Each package has a `tsdown.config.ts`. Consumed from
  `dist/`.
- **`@synis-ai/config`** provides shared tsdown and TypeScript config presets.
- **Tailwind CSS v4** via `@tailwindcss/postcss`. No tailwind.config.* file — config is in CSS.
- **Shared packages are workspace-linked** (`"workspace:*"` in package.json). No need for npm publish.
- **No CI workflows** exist yet (`.github/workflows/` absent).
- **No JS tests** anywhere in the repo. Test step between lint and typecheck is a no-op.

## Auth Proxy Pattern

API calls go through a Next.js middleware proxy that forwards to the provider:

1. The proxy matches paths defined in the proxy matcher list (e.g., `/api/*`, `/auth/*`, `/social/*`)
2. It attaches the user's Sanctum session cookie and `Authorization` header from the request
3. Forwards to the provider backend at `NEXT_PUBLIC_API_URL`
4. Responses (including `Set-Cookie`) are relayed back to the browser

## Server Actions

Use Next.js server actions (`"use server"`) for form submissions and data mutations that don't need streaming responses. Named async functions in files with `"use server"` at the top — not inline `action={}` props. Prefer `resultify` from `@synis-ai/utils` over try/catch inside server actions.

## EditorDoc (TipTap)

The editor uses TipTap's `JSONContent` type. The document shape follows ProseMirror's JSON schema:

```ts
interface EditorDoc {
  type: 'doc';
  content: EditorNode[];
}
```

Nodes: `paragraph`, `heading` (attrs: `level: 1-6`), `bulletList` → `listItem` → `paragraph`, `orderedList`, `taskList` → `taskItem`, `image` (attrs: `src`, `alt`, `title`), `horizontalRule`, `hardBreak`. Marks: `bold`, `italic`, `underline`, `strike`, `link` (attrs: `href`), `code`, `highlight`.

## CSS Convention

See [AGENTS-theme.md](./AGENTS-theme.md) for the full theme system (palette tokens, semantic tokens, dark mode via next-themes, Tailwind v4 `@theme`).

### What goes in `globals.css`

Only Tailwind infrastructure and global theme settings:

```
globals.css allowed content:
  ├── @import "tailwindcss";
  ├── @variant dark              ← next-themes class-based dark mode
  ├── @theme { … }               ← palette tokens + semantic design tokens
  ├── @layer base { :root { … } } ← dark-mode CSS variable overrides
  ├── @media (prefers-reduced-motion)
  ├── @font-face { … }
  ├── html/body resets           ← minimal, ~10 lines max
  └── @utility / @variant        ← Tailwind v4 custom utilities (rare)
```

### Component styling

**All component styling** must use Tailwind utility classes in `className`:

```tsx
// ✅ Good — Tailwind utilities on the element
export const Card = ({ title, children }: Card.Props): JSX.Element => (
  <div className="rounded-xl bg-background p-6 shadow-sm">
    <h3 className="font-semibold text-foreground text-lg">{title}</h3>
    {children}
  </div>
);

// ❌ Bad — component class added to globals.css
export const Card = ({ title, children }: Card.Props): JSX.Element => (
  <div className="card">
    <h3 className="card-title">{title}</h3>
    {children}
  </div>
);
```

Always prefer **semantic tokens** (`bg-background`, `text-foreground`) over raw palette tokens (`bg-white`, `text-slate-900`) — semantic tokens automatically adapt to dark mode.

**When Tailwind can't express a style** (e.g. complex keyframes, container queries), use a co-located `.module.css` file:

```
components/card/
├── card.tsx
├── card.module.css    ← only the exception, ~5-15 lines
└── index.ts
```

### Dark mode

Themes are toggled via `next-themes` (`ThemeProvider` in `app/providers.tsx`, `useTheme()` hook in components). The `@variant dark` in `globals.css` enables `dark:` Tailwind utilities for structural overrides. Semantic color tokens switch automatically — no `dark:` needed for colors.

## Environment

- `.env*` files are gitignored — look for `.env.example` files.
- Turbo global passthrough env: `APP_VARIANT`, `EAS_BUILD`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_WS_URL`.
- `bunfig.toml` uses `linker = "isolated"`.
