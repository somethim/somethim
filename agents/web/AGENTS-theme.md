# Theme & CSS Standards

How theming works in `apps/web/` — Tailwind CSS v4 + next-themes.

---

## 1. Architecture

```
apps/web/app/globals.css    ← Single CSS entry point
```

`globals.css` owns all theme configuration. It contains:
- `@import "tailwindcss"` — Tailwind v4 framework
- `@variant dark` — enables class-based dark mode (next-themes toggles `.dark` on `<html>`)
- `@theme { … }` — palette tokens + semantic design tokens
- `@layer base { :root { @variant dark { … } } }` — dark overrides

No other CSS file defines tokens. No `tailwind.config.*` file — Tailwind v4 reads everything from `@theme`.

---

## 2. Next.js Setup

### Root layout (`app/layout.tsx`)
- The `<html>` tag must have `suppressHydrationWarning` (next-themes injects inline script before hydration).
- Children are wrapped in `<Providers>` from `app/providers.tsx`.

### Providers (`app/providers.tsx`)
- `"use client"` component that wraps `ThemeProvider` from `next-themes`.
- Configured with `attribute="class"` so toggling theme adds/removes `.dark` on `<html>`.

---

## 3. Token Categories

Tokens live in `@theme { }` and become Tailwind utilities automatically.

```
@theme {
  --color-*: initial;          ← reset Tailwind defaults
  --color-slate-50: …;         ← palette tokens (raw colors)
  --color-background: …;       ← semantic tokens (meaning-based names)
}
```

### 3.1 Palette Tokens

Named after the raw color. Used for one-off accents or when no semantic token exists.

```css
--color-slate-50: #f8fafc;
--color-orange-500: #f97316;
```

Usage: `bg-slate-50`, `text-orange-500`, `border-stone-200`

### 3.2 Semantic Tokens

Named by *purpose*, not color. These are the primary API for components.

| Token            | Light value     | Dark value      | Usage                        |
|------------------|-----------------|-----------------|------------------------------|
| `background`     | `#ffffff`       | `#020617`       | `bg-background`              |
| `background-dimmed` | `#f8fafc`   | `#0f172a`       | `bg-background-dimmed`       |
| `background-rich`   | `#f1f5f9`   | `#1e293b`       | `bg-background-rich`         |
| `foreground`     | `#0f172a`       | `#f1f5f9`       | `text-foreground`            |
| `foreground-dimmed` | `#64748b`   | `#94a3b8`       | `text-foreground-dimmed`     |
| `foreground-rich`   | `#020617`   | `#f8fafc`       | `text-foreground-rich`       |
| `primary`        | `#f97316`       | `#fb923c`       | `bg-primary` / `text-primary`|
| `primary-dimmed` | `#ffedd5`       | `#3d1a03`       | `bg-primary-dimmed`          |
| `primary-rich`   | `#c2410c`       | `#fdba74`       | `bg-primary-rich`            |
| `accent`         | `#94a3b8`       | `#64748b`       | `text-accent` / `border-accent`|
| `accent-rich`    | `#475569`       | `#94a3b8`       | `text-accent-rich`           |
| `accent-foreground` | `#e2e8f0`   | `#334155`       | `border-accent-foreground`   |
| `error`          | `#ef4444`       | `#f87171`       | `text-error`                 |
| `error-dimmed`   | `#fef2f2`       | `#3b0a0a`       | `bg-error-dimmed`            |
| `error-foreground`  | `#b91c1c`   | `#fca5a5`       | `text-error-foreground`      |
| `success`        | `#10b981`       | `#34d399`       | `text-success`               |
| `success-dimmed` | `#ecfdf5`       | `#022c22`       | `bg-success-dimmed`          |
| `success-foreground` | `#047857` | `#6ee7b7`       | `text-success-foreground`    |

---

## 4. Adding a New Token

1. Add to `@theme { }` in `globals.css`
2. If it changes in dark mode, add the dark override in `@layer base { :root { @variant dark { … } } }`
3. Use it in components via Tailwind class: `bg-<name>`, `text-<name>`, `border-<name>`

Do NOT add random CSS custom properties outside `@theme`. Tailwind v4 only generates utilities from `@theme`.

---

## 5. Theme Switching (next-themes)

### Toggle component
```tsx
"use client";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};
```

### How it works
- `ThemeProvider` (from `app/providers.tsx`) is configured with `attribute="class"`.
- On toggle, next-themes adds/removes `class="dark"` on `<html>`.
- Tailwind v4's `@variant dark (&:where(.dark, .dark *))` activates `dark:` utilities.
- The `@layer base { … }` block swaps CSS variable values when `.dark` is present.
- **No flash of wrong theme** — next-themes injects an inline script before React hydrates.

---

## 6. Using Tokens in Components

Always prefer **semantic tokens** over raw palette tokens. This makes dark mode work for free.

```tsx
// ✅ Good — semantic tokens adapt to dark mode
<div className="bg-background text-foreground">
  <p className="text-foreground-dimmed">Subtitle</p>
  <button className="bg-primary text-white">Action</button>
</div>

// ✅ Acceptable — palette token for one-off accents
<div className="bg-orange-100 text-orange-800">Label</div>

// ❌ Bad — hardcoded colors that break in dark mode
<div style={{ backgroundColor: "#fff", color: "#000" }}>
```

Semantic tokens also compose:
```tsx
// Primary ghost button
<button className="rounded-lg bg-primary-dimmed px-4 py-2 font-medium text-primary-rich">
  Edit
</button>

// Error alert
<div className="rounded-xl bg-error-dimmed px-4 py-3 text-error-foreground">
  <p>Connection failed.</p>
</div>
```

---

## 7. Dark Mode with `@variant`

Components don't need explicit dark mode classes for colors that use semantic tokens — they switch automatically.

Use `dark:` only for **structural** changes (different layout, different content):

```tsx
// ✅ Good — structural dark mode change
<Image className="dark:brightness-75" src={logo} alt="" />

// ❌ Unnecessary — semantic tokens already handle this
<p className="text-foreground dark:text-foreground-rich">
```

---

## 8. Command to Rebuild globals.css

Run this to regenerate `apps/web/app/globals.css` from scratch (palette + semantic tokens + next-themes integration):

```bash
cat > apps/web/app/globals.css << 'CSS'
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  --color-*: initial;

  /* ── Palette tokens ── */
  --color-white: #ffffff;
  --color-black: #0a0a0a;

  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  --color-slate-200: #e2e8f0;
  --color-slate-300: #cbd5e1;
  --color-slate-400: #94a3b8;
  --color-slate-500: #64748b;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1e293b;
  --color-slate-900: #0f172a;
  --color-slate-950: #020617;

  --color-orange-50: #fff7ed;
  --color-orange-100: #ffedd5;
  --color-orange-200: #fed7aa;
  --color-orange-300: #fdba74;
  --color-orange-400: #fb923c;
  --color-orange-500: #f97316;
  --color-orange-600: #ea580c;
  --color-orange-700: #c2410c;

  --color-stone-50: #fafaf9;
  --color-stone-100: #f5f5f4;
  --color-stone-200: #e7e5e4;
  --color-stone-300: #d6d3d1;
  --color-stone-400: #a8a29e;
  --color-stone-500: #78716c;
  --color-stone-600: #57534e;
  --color-stone-700: #44403c;
  --color-stone-800: #292524;
  --color-stone-900: #1c1917;
  --color-stone-950: #0c0a09;

  --color-emerald-50: #ecfdf5;
  --color-emerald-100: #d1fae5;
  --color-emerald-200: #a7f3d0;
  --color-emerald-300: #6ee7b7;
  --color-emerald-400: #34d399;
  --color-emerald-500: #10b981;
  --color-emerald-600: #059669;
  --color-emerald-700: #047857;

  --color-red-50: #fef2f2;
  --color-red-100: #fee2e2;
  --color-red-200: #fecaca;
  --color-red-300: #fca5a5;
  --color-red-400: #f87171;
  --color-red-500: #ef4444;
  --color-red-600: #dc2626;
  --color-red-700: #b91c1c;

  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;

  /* ── Semantic tokens ── */
  --color-background: #ffffff;
  --color-background-dimmed: #f8fafc;
  --color-background-rich: #f1f5f9;
  --color-foreground: #0f172a;
  --color-foreground-dimmed: #64748b;
  --color-foreground-rich: #020617;

  --color-primary: #f97316;
  --color-primary-dimmed: #ffedd5;
  --color-primary-rich: #c2410c;

  --color-accent: #94a3b8;
  --color-accent-rich: #475569;
  --color-accent-foreground: #e2e8f0;

  --color-error: #ef4444;
  --color-error-dimmed: #fef2f2;
  --color-error-foreground: #b91c1c;

  --color-success: #10b981;
  --color-success-dimmed: #ecfdf5;
  --color-success-foreground: #047857;

  --color-info: #3b82f6;
  --color-info-dimmed: #eff6ff;

  --color-warning: #f59e0b;
  --color-warning-dimmed: #fffbeb;
}

@layer base {
  :root {
    color: var(--color-foreground);
    background-color: var(--color-background);
  }

  @variant dark {
    --color-background: #020617;
    --color-background-dimmed: #0f172a;
    --color-background-rich: #1e293b;
    --color-foreground: #f1f5f9;
    --color-foreground-dimmed: #94a3b8;
    --color-foreground-rich: #f8fafc;

    --color-primary: #fb923c;
    --color-primary-dimmed: #3d1a03;
    --color-primary-rich: #fdba74;

    --color-accent: #64748b;
    --color-accent-rich: #94a3b8;
    --color-accent-foreground: #334155;

    --color-error: #f87171;
    --color-error-dimmed: #3b0a0a;
    --color-error-foreground: #fca5a5;

    --color-success: #34d399;
    --color-success-dimmed: #022c22;
    --color-success-foreground: #6ee7b7;

    --color-info: #60a5fa;
    --color-info-dimmed: #0c1f3f;

    --color-warning: #fbbf24;
    --color-warning-dimmed: #3b2f00;
  }
}
CSS

echo "globals.css rebuilt"
```

---

## 9. Quick Reference

| What                | How                                                              |
|---------------------|------------------------------------------------------------------|
| Add a color token   | `--color-<name>: <value>` in `@theme`                            |
| Use in a component  | `bg-<name>`, `text-<name>`, `border-<name>`                      |
| Dark mode override  | `@variant dark { --color-<name>: <dark-value> }` in `@layer base`|
| Toggle theme        | `useTheme()` from `next-themes`                                  |
| Structural dark     | Use `dark:` prefix (`dark:hidden`, `dark:brightness-75`)         |
| One-off color       | Use palette tokens (`bg-slate-100`, `text-orange-600`)           |
| Per-schema styling  | Always prefer semantic tokens first                              |
