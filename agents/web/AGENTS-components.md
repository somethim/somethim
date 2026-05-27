# Component Patterns

React component conventions for synis-ai. These apply to both `packages/web/` (library components) and `apps/web/` (app components).

---

## 1. Arrow Functions + Named Exports

All components use arrow functions with named exports. Anonymous default exports are reserved for Next.js pages and layouts only.

```tsx
// ✅ Good — app or package component
export const Pricing = ({ ... }: Pricing.Props): JSX.Element => (
  <section>...</section>
);

// ✅ Good — Next.js page (anonymous default is acceptable)
export default () => (
  <main>...</main>
);

// ✅ Good — Next.js layout
export default ({ children }: PropsWithChildren) => (
  <html lang="en">{children}</html>
);

// ❌ Bad — function keyword for components
export function Pricing({ ... }: Pricing.Props) { ... }

// ❌ Bad — default export for non-page components
export default const Pricing = () => { ... };
```

**Exception:** Next.js `page.tsx` and `layout.tsx` files use anonymous default exports with `function` keyword (framework convention). All other files use arrow functions.

---

## 2. Namespace + Component Pattern

Every typed component has a companion `export namespace ComponentName` containing `Props`, `State`, and related types.

```tsx
// ✅ Good — app component
export const Pricing = ({ tiers }: Pricing.Props): JSX.Element => (
  <section>...</section>
);
export namespace Pricing {
  export type Props = {
    tiers: readonly Tier[];
    className?: string;
  };
}

// ✅ Good — package component with RenderComponentProps
export const Button = ({ variant = "default", className, ...props }: Button.Props): JSX.Element => {
  const state: Button.State = { disabled: Boolean(props.disabled) };
  const element = useRender({
    render: render ?? <ButtonPrimitive />,
    props: mergeProps<typeof ButtonPrimitive>(props, {
      className: cn(buttonVariants({ variant }), resolveClassName(className, state)),
    }),
    state,
  });
  return element;
};
export namespace Button {
  export type Props = RenderComponentProps<"button", { disabled: boolean }, ButtonPrimitive.Props, ComponentProps<typeof ButtonPrimitive>> & VariantProps<typeof buttonVariants>;
  export type State = ButtonPrimitive.State;
}
```

---

## 3. Explicit Return Types

Package components (`packages/web/`) must have explicit `JSX.Element` return types. App components (`apps/web/`) should also annotate returns, but TypeScript inference is acceptable for simple cases.

```tsx
// ✅ Good — package component
export const Button = ({ ... }: Button.Props): JSX.Element => { ... };

// ✅ Good — app component
export const Pricing = ({ ... }: Pricing.Props): JSX.Element => (
  <section>...</section>
);
```

---

## 4. Implicit Returns for JSX-Only Components

If the component body is only a return statement, use implicit return with parens. Use a block body only when there is logic before the return.

```tsx
// ✅ Good — implicit return, JSX-only
export const Navbar = () => (
  <nav>...</nav>
);

// ✅ Good — block body when there's logic
export const Hero = () => {
  const data = computeSomething();
  return <div>{data}</div>;
};
```

---

## 5. Static Data Outside Components

Define static arrays and config objects outside the component with `as const`.

```tsx
// ✅ Good
const tiers = [
  { name: "Scan", price: "Free", highlighted: false },
  { name: "Dominate", price: 449, highlighted: true },
] as const;

export const Pricing = ({ tiers }: Pricing.Props): JSX.Element => (
  <section>
    {tiers.map((tier, index) => (
      <div key={index}>{tier.name}</div>
    ))}
  </section>
);
```

---

## 6. Inline Sub-Components for Local Rendering

Define small presentational sub-components inline in the same file (not exported) when they are only used locally.

```tsx
// ✅ Good — StatusCell lives in comparison.tsx, not exported
const StatusCell = ({ status }: { status: Status }): JSX.Element => {
  switch (status) {
    case "yes":
      return <span className="text-primary">✓</span>;
    case "partial":
      return <span className="text-foreground-dimmed text-sm">Partial</span>;
    case "no":
      return <span className="text-neutral">—</span>;
  }
};
```

---

## 7. `createContext` from `@synis-ai/utils/hooks`

Use `createContext` from `@synis-ai/utils/hooks` for all React context creation. It auto-throws a descriptive error when consumed outside its provider.

```ts
import { createContext } from "@synis-ai/utils/hooks";

type ThemeContext = [theme: Theme, setTheme: (theme: Theme) => void];

const [ThemeContext, useTheme] = createContext<ThemeContext>({
  name: "Theme",
  // or: error: "useTheme must be used within a ThemeProvider",
});

// Provider
export const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => {
  const context = useMemo(() => [theme, setTheme] as ThemeContext, [theme]);
  return <ThemeContext value={context}>{children}</ThemeContext>;
};

// Consumer
export { useTheme };
```

---

## 8. `useRender` + `mergeProps` (packages/web)

Package components use `useRender` from `@base-ui/react/use-render` with `mergeProps` for props composition. This pattern provides state-aware classNames and render prop support.

```tsx
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

export const Button = ({ render, className, ...props }: Button.Props): JSX.Element => {
  const state: Button.State = { disabled: Boolean(props.disabled) };
  const element = useRender({
    render: render ?? <ButtonPrimitive />,
    props: mergeProps<typeof ButtonPrimitive>(props, {
      className: cn(
        buttonVariants({ variant, size, color, disabled: props.disabled }),
        resolveClassName(className, state),
      ),
    }),
    state,
  });
  return element;
};
```

---

## 9. `classList` + `ClassList<K>` Pattern

Components with sub-elements expose a `classList` prop typed via `ClassList<K>` from `@synis-ai/utils`. This enables targeted sub-element styling without wrapping.

```tsx
// ✅ Good — package component with classList
export namespace SelectTrigger {
  export type ClassListKey = "trigger" | { icon: "root" | "icon" };
}

export const SelectTrigger = ({ className, classList, ...props }: SelectTrigger.Props): JSX.Element => (
  <SelectPrimitive.Trigger
    className={createClassName(
      "flex items-center gap-2",
      className,
      classList?.trigger,
    )}
    {...props}
  >
    {children}
    <ChevronYIcon className={createClassName("size-4", classList?.icon?.root)} />
  </SelectPrimitive.Trigger>
);
```

---

## 10. `"use client"` at Leaf Boundaries

The `"use client"` directive goes on the leaf-most component that uses React hooks or state, not on every file. Package components that wrap headless primitives may add it where they use hooks/context.

```tsx
// ✅ Good — only the interactive component needs "use client"
// components/ThemeProvider.tsx
"use client";
export const ThemeProvider = ({ children }: PropsWithChildren): JSX.Element => { ... };

// components/Pricing.tsx (no "use client" — server component if no hooks)
export const Pricing = ({ tiers }: Pricing.Props): JSX.Element => (
  <section>{tiers.map(...)}</section>
);
```
