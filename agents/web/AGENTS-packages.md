# @synis-ai Package Usage

Always reach for `@synis-ai` internal packages before installing external ones.

---

## 0. Package-First Rule

**Always prefer using `@synis-ai/*` packages before building custom UI or logic.**

1. **Check** — look in `packages/docs/web/` for the component API docs. The index lists all 39 existing components (Button, TextField, Select, Dialog, etc.).
2. **Use** — import from `@synis-ai/web/components/<name>` if the component already exists.
3. **Create** — if the component doesn't exist, create it in `packages/web/src/components/<name>.tsx` following the patterns in [AGENTS-components.md](./AGENTS-components.md):
   - Arrow function + named export + companion `namespace` for Props/State types
   - `useRender` + `mergeProps` from Base UI for props composition
   - `cva` + `cn` for variant-based styling, `resolveClassName` for state-aware classes
   - `createContext` from `@synis-ai/utils/hooks` when React context is needed
   - `"use client"` only at leaf boundaries (components using hooks/state)
   - Explicit `JSX.Element` return type
4. **Consult** — if the use case requires changing an existing component's API, behavior, or contract, **stop and ask the user** before modifying it.

---

## 1. Icons — `@synis-ai/icons`

All icons are named `[Name]Icon` and imported from `@synis-ai/icons`. Used as JSX elements with Tailwind sizing.

```tsx
import { CheckIcon, CheckBadgeIcon, CursorGrowIcon } from "@synis-ai/icons";

<CheckIcon className="size-4 text-primary" />
<CheckBadgeIcon className={cn(feature.color, "size-16")} />
```

Always verify an icon exists before importing. Check `packages/shared/icons/src/` or the barrel export at `packages/shared/icons/src/index.ts`.

---

## 2. Utilities — `@synis-ai/utils`

```ts
import { cn, cva, type VariantProps, type ClassList, type ClassProp } from "@synis-ai/utils";
import { resultify, type Result, unwrapResult } from "@synis-ai/utils";
import type { Nullable, Prettify, DistributiveOmit, EmptyObject } from "@synis-ai/utils/types";
```

- `cn(...)` — Tailwind class merging (clsx + tailwind-merge)
- `cva(...)` — class variance authority for variant-based components
- `ClassList<K>` — type for `classList` prop (targeted sub-element styling)
- `resultify(fn)` — wraps sync/async function in `Result<T, E>`
- `type Result<T, E>` — `{ success: true; data: T } | { success: false; error: E }`
- `unwrapResult(result)` — extracts data or throws error
- `type Prettify<T>` — collapses intersection types into a single object
- `type Nullable<T>` — `T | null | undefined`

---

## 3. Hooks — `@synis-ai/utils/hooks`

```ts
import { createContext } from "@synis-ai/utils/hooks";
import { useAsyncAction } from "@synis-ai/utils/hooks";
import { useControlled } from "@synis-ai/utils/hooks";
import { useStableCallback } from "@synis-ai/utils/hooks";
import { useMergedRefs } from "@synis-ai/utils/hooks";
```

**`createContext`** — wraps React's `createContext` with auto-error-on-undefined. Returns `[Context, useContextHook]` tuple.

```ts
const [ThemeContext, useTheme] = createContext<ThemeContext>({
  name: "Theme",
  // or: error: "useTheme must be used within a ThemeProvider",
});
```

**`useAsyncAction`** — wraps an async action with `isPending` state tracking. Returns `[handledAction, isPending]`.

```ts
const [submit, isPending] = useAsyncAction(async (data: FormData) => {
  const result = await resultify(() => createItem(data));
  if (!result.success) return;
  router.push("/dashboard");
});
```

---

## 4. Forms — `@synis-ai/inferred-form`

Use `InferredForm` for all forms. Never build raw `react-hook-form` forms from scratch.

```tsx
import { InferredForm, field, applyFormOptions } from "@synis-ai/inferred-form";
import { z } from "zod";

// Option A: field() helper — direct config
const config = {
  email: field({
    shape: "text",
    validator: z.string().email(),
    label: "Email",
    placeholder: "you@example.com",
  }),
  role: field({
    shape: "select",
    validator: z.enum(["admin", "user"]),
    label: "Role",
  }),
};

// Option B: applyFormOptions() — schema-driven
const schema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "user"]),
});
const config = applyFormOptions(schema, {
  email: { shape: "text", label: "Email" },
  role: { shape: "select", label: "Role" },
});

<InferredForm config={config} onSubmit={(data) => console.log(data)} />
```

---

## 5. DataTable — `@synis-ai/data-table`

Use `DataTableProvider` + `DataTable` + `DataTablePagination` for all tables.

```tsx
import {
  DataTable, DataTableProvider, DataTablePagination, DataTableEmpty,
} from "@synis-ai/data-table";
import type { ColumnDef } from "@tanstack/react-table";

type Row = { _id: string; name: string; status: string };
const columns: ColumnDef<Row>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "status", header: "Status" },
];

export const UsersTable = ({ data }: { data: Row[] }): JSX.Element => (
  <DataTableProvider data={data} columns={columns}>
    <DataTable>
      <DataTableEmpty>No users found.</DataTableEmpty>
    </DataTable>
    <DataTablePagination />
  </DataTableProvider>
);
```

---

## 6. UI Primitives — Always from `@synis-ai/web/components`

All headless UI is from `@base-ui/react` wrapped and re-exported from `@synis-ai/web/components`. In app code, always import from `@synis-ai/web/components`, never directly from `@base-ui/react`.

```tsx
import {
  TextField, TextFieldInput, TextFieldMaskToggle,
  Select, SelectTrigger, SelectValue, SelectPositioner, SelectPopup, SelectItem,
  Checkbox,
  NumberField,
  PhoneField, PhoneFieldInput, PhoneFieldCountryCombobox,
  Button,
  Dialog, DialogTrigger, DialogPopup, DialogTitle, DialogDescription, DialogClose,
  FileUpload, FileUploadInput, FileUploadPreview,
  Form, Field, FieldLabel, FieldError, FieldDescription,
  Switch,
  Accordion,
  Tabs,
  Tooltip,
  Popover,
  ToastProvider,
} from "@synis-ai/web/components";
```

```tsx
// ✅ Good
import { Button } from "@synis-ai/web/components/button";
import { TextField, TextFieldInput } from "@synis-ai/web/components/text-field";

// ❌ Bad — importing from Base UI directly in app code
import { Button as ButtonPrimitive } from "@base-ui/react/button";
```

**Compound component pattern:** Components like `TextField`, `Textarea`, `Select` use compound components — the root is the styled container, and input elements are sub-components.

```tsx
// ✅ Good — TextField compound
<TextField value={query} onValueChange={setQuery}>
  <TextFieldInput placeholder="Search..." />
</TextField>

// ❌ Bad — raw HTML
<input value={query} onChange={e => setQuery(e.target.value)} />
```

---

## 7. Design Tokens (Tailwind v4)

Use the semantic design tokens defined in `packages/shared/config/src/tailwind/globals.css`. Do not use raw color values unless building genuinely outside the design system.

**Color families** (each has `-dimmed`, base, `-rich`, `-foreground`):

| Token | Usage |
|-------|-------|
| `bg-background` / `bg-background-dimmed` / `bg-background-rich` | Page/section backgrounds |
| `text-foreground` / `text-foreground-dimmed` / `text-foreground-rich` | Text colors |
| `text-emphasis` / `bg-emphasis` | Emphasis (warm brown) |
| `text-accent` / `border-accent` | Accent (cool gray) |
| `text-primary` / `bg-primary` / `bg-primary-dimmed` / `bg-primary-rich` | Primary brand (orange) |
| `text-secondary` / `bg-secondary` | Secondary brand (teal) |
| `text-error` / `bg-error-dimmed` / `text-error-foreground` | Error states |
| `text-success` / `bg-success` | Success states |
| `text-info` / `bg-info-dimmed` | Info states |
| `text-warning` / `bg-warning` | Warning states |
| `border-accent-foreground` | Standard borders |

```tsx
// ✅ Good
<p className="font-light text-foreground-dimmed text-lg">{caption}</p>
<div className="border border-accent-foreground">{content}</div>
<button className="bg-primary text-white">Submit</button>

// ❌ Bad — raw colors bypass the design system
<p className="text-gray-400">{caption}</p>
```

---

## 8. `es-toolkit` for Utilities

Use `es-toolkit` for lodash-style utilities (debounce, throttle, merge, clamp, omitBy, isEqual, etc.). Import specific functions by name.

```ts
import { debounce, throttle, merge, clamp } from "es-toolkit";
import { isEqual, omitBy } from "es-toolkit/compat";
```

---

## 9. Type Utilities from `@synis-ai/utils/types`

```ts
import type { Nullable, Prettify, DistributiveOmit, DistributiveOverride, EmptyObject, Branded } from "@synis-ai/utils/types";
```

Also re-exports from `type-fest`: `UnionToIntersection`, `DeepPartial`, `ConditionalPick`, `PickDeep`, `SetFieldType`, `Exact`, `IsUnion`, `IsEmptyObject`, etc.
