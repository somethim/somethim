# Next.js Conventions

Patterns for `apps/web/` — Next.js 16 with App Router.

---

<!-- BEGIN:nextjs-agent-rules -->

## Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `apps/web/node_modules/next/dist/docs/`. Your training data may be outdated — the docs are the source of truth.

Docs structure:

```
apps/web/node_modules/next/dist/docs/
├── 01-app/          # App Router (getting started, guides, API reference)
├── 02-pages/        # Pages Router
├── 03-architecture/ # Architecture docs
├── 04-community/    # Community docs
└── index.md         # Landing page with AI agent hints
```

<!-- END:nextjs-agent-rules -->

---

## 1. Page and Layout Structure

- `layout.tsx` — Server component. Exports metadata, wraps children with providers.
- `page.tsx` — Contains actual page logic, not just a re-export. Pages live in `app/` directories.
- **Page-specific components** belong in `_components/` (underscore prevents routing), NOT in `@/components/*`.
- **`@/components/*` is for truly reusable components** used across multiple pages.

```
app/(auth)/dashboard/
├── page.tsx                  # Page with actual logic (65 lines max ideally)
├── layout.tsx                # Layout wrapper
└── _components/
    ├── dashboard-stats.tsx   # Page-specific interactive component
    └── chart.tsx             # Page-specific chart component

# ❌ Bad — don't create thin wrapper pages
app/(public)/workflow/page.tsx
  import { WorkflowPage } from "@/components/public/workflow/WorkflowPage";
  export default function WorkflowRoute() { return <WorkflowPage />; }

# ✅ Good — page contains the actual content
app/(public)/workflow/page.tsx
  import { WorkflowCanvas } from "./_components/workflow-canvas";
  export default function WorkflowPage() {
    return (
      <main>
        <h1>Workflow</h1>
        <WorkflowCanvas />
      </main>
    );
  }
```

---

## 2. Server vs Client Boundaries

Keep pages as server components when possible. Extract interactive parts (forms, event handlers, state) into client components in `_components/`.

```tsx
// ✅ Good — page.tsx is a server component
// app/settings/page.tsx
import { SettingsForm } from "./_components/settings-form";

export default () => (
  <div>
    <h1 className="text-foreground text-xl font-medium">Settings</h1>
    <SettingsForm />
  </div>
);

// _components/settings-form.tsx
"use client";
export const SettingsForm = (): JSX.Element => {
  const [submit, isPending] = useAsyncAction(async (data) => { ... });
  return <InferredForm config={config} onSubmit={submit} />;
};
```

---

## 3. No Raw HTML Inputs

Never use raw `<input>`, `<textarea>`, `<select>`, or unstyled form elements. Always use `@synis-ai/web/components`.

```tsx
// ✅ Good
import { TextField, TextFieldInput } from "@synis-ai/web/components/text-field";

<TextField value={query} onValueChange={setQuery}>
  <TextFieldInput placeholder="Search..." />
</TextField>

// ❌ Bad — raw HTML
<input value={query} onChange={e => setQuery(e.target.value)} />
```

See [AGENTS-packages.md](./AGENTS-packages.md) for compound component patterns.

---

## 4. Named Exports (Default Only for Pages)

All app components use named exports. Only `page.tsx` and `layout.tsx` use anonymous default exports.

```tsx
// ✅ Good — page
export default () => <main>...</main>;

// ✅ Good — app component
export const DashboardStats = ({ ... }: DashboardStats.Props): JSX.Element => { ... };

// ❌ Bad — default export for a non-page component
export default const DashboardStats = () => { ... };
```

---

## 5. Arrow Functions Throughout

All components in `apps/web/` use arrow functions. `function` keyword is reserved for Next.js framework exports (pages/layouts).

```tsx
// ✅ Good
export const SettingsForm = (): JSX.Element => { ... };
export const Navbar = (): JSX.Element => <nav>...</nav>;

// ❌ Bad
export function SettingsForm(): JSX.Element { ... }
```

---

## 6. Namespace Pattern for Props

Every exported component has a companion `namespace` for its types.

```tsx
// ✅ Good
export const DashboardStats = ({ posts, brand }: DashboardStats.Props): JSX.Element => { ... };
export namespace DashboardStats {
  export type Props = {
    posts: Post[];
    brand: Brand;
  };
}
```

---

## 7. Optional Special Files

Next.js provides special files for handling specific UI states. **Only create these when you actually need them** — don't add empty boilerplate.

| File | Purpose | When to Add |
|------|---------|-------------|
| `loading.tsx` | Shows while page data fetches | Only for async server components with slow data fetching |
| `error.tsx` | Error boundary fallback | Only when you need custom error UI (e.g., retry button) |
| `not-found.tsx` | 404 page for this route | Only when route has specific not-found needs |
| `template.tsx` | Re-mounts on navigation | Rarely needed — use `layout.tsx` instead |

```
# ✅ Good — minimal setup
app/(auth)/dashboard/
├── page.tsx
└── layout.tsx

# ✅ Good — when needed
app/(auth)/dashboard/
├── page.tsx          # Has async data fetching
├── loading.tsx       # Shows skeleton while loading
├── error.tsx         # Custom error UI with retry
└── layout.tsx

# ❌ Bad — unnecessary boilerplate
app/(public)/pricing/
├── page.tsx
├── loading.tsx       # Empty/default
├── error.tsx         # Empty/default
├── not-found.tsx     # Never used
└── layout.tsx
```

**Default behavior is fine:**
- No `loading.tsx` → Next.js shows nothing during load (fine for fast pages)
- No `error.tsx` → Next.js shows default error overlay (fine for dev)
- No `not-found.tsx` → Root `not-found.tsx` handles it
```
