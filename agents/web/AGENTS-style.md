# Code Style

Core coding conventions for the synis-ai JS/TS ecosystem. These apply to both `apps/web/` and `packages/`.

---

## 1. Use `const` Only — Never `let`

Always declare variables with `const`. Avoid `let` entirely. If a value needs to change, restructure the logic (e.g., use `reduce`, `map`, callbacks, or extract a function) so the binding stays immutable.

```ts
// ✅ Good
const result = await resultify(() => fetch(url));
const items = data.map((item) => transform(item));

// ❌ Bad
let accumulated = 0;
for (const x of items) accumulated += x;
```

**Exception:** In rare cases where a loop truly requires reassignment (e.g., algorithmic constraints), prefer refactoring to avoid it. If unavoidable, document why.

---

## 2. Use Arrow Functions Everywhere

All functions — components, handlers, callbacks, helpers — use arrow function syntax. No `function` keyword.

```ts
// ✅ Good
export const getProfile = async (id: string): Promise<Profile | null> => { ... };
export const Button = ({ ... }: Button.Props): JSX.Element => { ... };
const transform = (input: string): string => input.trim().toLowerCase();

// ❌ Bad
export function getProfile(id: string): Promise<Profile | null> { ... }
export function Button({ ... }: Button.Props): JSX.Element { ... }
```

**Exception:** Next.js page and layout exports (`export default function`) may use the `function` keyword since that is standard framework convention.

---

## 3. Never Abbreviate Names

Use full, descriptive names. No abbreviations like `ctx`, `req`, `res`, `msg`, `err`, `fn`, `cb`, `val`, `ref`, `idx`, `num`, `str`, `obj`, `arr`, etc.

```ts
// ✅ Good
const context = await getContext();
const request = await fetch(url);
const response = await request.json();
const message = error.message;

// ❌ Bad
const ctx = ...; const req = ...; const res = ...; const msg = ...;
```

---

## 4. Prefer Single-Word Variable Names

When possible, name variables with a single word. Use camelCase only when the concept genuinely needs multiple words.

```ts
// ✅ Good (single word)
const result = await resultify(() => fetch(url));
const profile = await getProfile(id);
const controller = new AbortController();

// ✅ Acceptable (multi-word when needed)
const searchParams = new URLSearchParams(query);
const isSubmitting = ...;
```

---

## 5. Use IIFE for Scoped Logic

Use IIFEs `(() => { ... })()` when you need to compute a value with intermediate steps or branching without polluting the outer scope.

```ts
// ✅ Good — element rendering via IIFE + switch
const element = (() => {
  switch (props.shape) {
    case "text":
      return <TextField {...field} {...props} />;
    case "select":
      return <Select {...field} {...props} />;
    default:
      return null;
  }
})();

// ✅ Good — value derivation
const label = (() => {
  if (items.length === 0) return "No items found";
  if (items.length === 1) return "1 item";
  if (items.length < 10) return `${items.length} items`;
  return `Over ${items.length} items`;
})();

// ✅ Good — destructuring with transformation
const { type = "text", ...elementProps } = (() => {
  if (props.type !== "password") return props;
  const { masked, defaultMasked, onMaskChange, ...rest } = props;
  return { ...rest };
})();
```

---

## 6. Use `switch (true)` for Conditional Chains

When you have multiple independent conditions that map to different outcomes, use `switch (true)` with `case` clauses instead of long `if / else if` chains.

```ts
// ✅ Good
const inferNameFromLink = (link: string) => {
  switch (true) {
    case link.includes("facebook.com"):
      return "facebook";
    case link.includes("instagram.com"):
      return "instagram";
    case z.url().safeParse(link).success:
      return "website";
    case z.email().safeParse(link).success:
      return "email";
    default:
      return "contact link";
  }
};
```

When rendering different JSX elements based on a discriminated value, combine IIFE + `switch`:

```tsx
// ✅ Good
const element = (() => {
  switch (props.shape) {
    case "text": {
      return (
        <TextField {...field} {...props}>
          <TextFieldInput />
          {props.type === "password" && <TextFieldMaskToggle />}
        </TextField>
      );
    }
    case "checkbox":
      return <Checkbox {...field} {...props} />;
    case "select":
      return <Select {...field} {...props} />;
  }
})();
```

---

## 7. Use `resultify` for Async Error Handling

Wrap async operations in `resultify` from `@synis-ai/utils` instead of `try/catch`. Handle failures by checking `result.success` and returning early.

```ts
// ✅ Good
const result = await resultify(() =>
  fetch(url, { ...options, signal: controller.signal }),
);

if (!result.success) {
  if (result.error?.name === "AbortError")
    return { success: false, error: new TimeoutError("Request timeout") };
  return { success: false, error: result.error };
}

return { success: true, data: result.data };
```

```ts
// ❌ Bad — avoid try/catch for expected failure paths
try {
  const data = await fetch(url);
  return data;
} catch (error) {
  // exhaustive handling of every case
}
```

---

## 8. Early Returns

Prefer early returns over nested conditionals. Exit as soon as a guard condition is met.

```ts
// ✅ Good
if (!profile) return null;
if (!user) return null;
if (isPending) return null;

// ❌ Bad — deep nesting
if (profile) {
  if (user) {
    // ...
  }
}
```

---

## 9. Omit Braces for Single Statements

When a conditional has a single statement, omit the braces.

```ts
// ✅ Good
if (!signature)
  return new Response("Missing header", { status: 400 });
if (!result.success)
  return { success: false, error: result.error };

// ❌ Bad — unnecessary braces
if (!signature) {
  return new Response("Missing header", { status: 400 });
}
```

**Exception:** Use braces when the body spans multiple lines or when it improves readability (e.g., multi-line JSX or object literals).

---

## 10. No Exhaustive Error Handling

You do **not** need to handle every possible error case. Return or propagate errors when appropriate.

```ts
// ✅ Good — simple propagation
if (!result.success)
  return { success: false, error: result.error };

// ❌ Bad — over-handling
if (!result.success) {
  if (result.error instanceof NetworkError) { ... }
  else if (result.error instanceof ParseError) { ... }
}
```

---

## 11. Return `null` for "Not Found"

Prefer returning `null` over throwing when something is not found. Let the caller decide how to handle the absence.

```ts
// ✅ Good
if (!profile) return null;
if (!booking) return null;
return { ...profile, user };
```

---

## 12. Underscore Prefix for Unused Variables

When destructuring, prefix unused variables with `_` to signal they are intentionally ignored.

```ts
// ✅ Good
const { user: _user, ...rest } = profile;
return { ...rest, affiliations };

// ✅ Good — unused index in map
{features.map((feature, _index) => (
  <div key={feature.title}>...</div>
))}
```

---

## 13. `as const` for Literal Narrowing

Use `as const` when returning object literals that need to narrow a union type, or for static data arrays defined outside components.

```ts
// ✅ Good — static data
const tiers = [
  { name: "Scan", price: "Free", highlighted: false },
  { name: "Dominate", price: 449, highlighted: true },
] as const;

// ✅ Good — literal narrowing in return
return { type: "client" as const, profile: active };
return { type: "artist" as const, profile: active, affiliation };
```

---

## 14. Prefer `satisfies` Over `as Type` Assertions

Use `satisfies` to assert a value conforms to a type without widening it. Avoid `as Type` assertions unless unavoidable (e.g., DOM event targets, JSON.parse, CSS custom properties).

```ts
// ✅ Good — satisfies preserves the narrowest type
const config = { theme: "dark", fontSize: 14 } satisfies Config;

// ✅ Good — satisfies for tuple literals
const snaps = ["0%", "80%"] satisfies Tuple<SnapPoint, 2>;

// ✅ Acceptable — as const for readonly narrowing
const CHANNELS = ["instagram", "facebook"] as const;

// ✅ Acceptable — as Type when unavoidable (DOM, CSS, JSON.parse)
e.target as Node
style={{ ["--rot" as string]: `${deg}deg` } as CSSProperties}
JSON.parse(raw) as Profile

// ❌ Bad — avoid as Type when satisfies works
const config = { theme: "dark", fontSize: 14 } as Config;
```

---

## 15. Use `unknown` Instead of `any`

When a type is truly unknown, use `unknown` rather than `any`. This forces type narrowing before use and prevents accidental unsound operations.

```ts
// ✅ Good
const parseJSON = (input: string): unknown => JSON.parse(input);

// ✅ Good — narrow before use
const data: unknown = fetchData();
if (typeof data === "object" && data !== null && "id" in data) {
  const id = (data as { id: string }).id;
}

// ❌ Bad — any bypasses type checking
const parseJSON = (input: string): any => JSON.parse(input);
```

---

## 16. No `any` Without Justification

Avoid `any` entirely. When `any` is unavoidable (e.g., function argument constraints), suppress with `biome-ignore` and add a comment explaining why.

```ts
// ✅ Good — documented suppression
// biome-ignore lint/suspicious/noExplicitAny: required for generic resultify wrapper
export function resultify<T extends (...args: unknown[]) => unknown, E = Error>(fn: T): ...

// ❌ Bad — undocumented any
export function resultify<T extends (...args: any[]) => any>(fn: T): ...
```

---

## 17. Document Suppressions with Rationale

When using `@ts-expect-error` or `biome-ignore`, add a short comment explaining why.

```ts
// ✅ Good
// @ts-expect-error - void is not a valid type for Omit
// biome-ignore lint/suspicious/noExplicitAny: required for generic constraint
// biome-ignore lint/suspicious/noExplicitAny: no better way to describe error union
```

---

## 18. `void` for Fire-and-Forget Async

When invoking async code without awaiting, wrap in `void` to make the intent explicit.

```ts
// ✅ Good
void (async () => {
  const result = await resultify(() => action(client));
  if (!result.success) {
    setError(result.error);
    return;
  }
  setData(result.data);
})();
```

---

## 19. Default Parameters for Options

Use default parameters for optional options objects.

```ts
// ✅ Good
export const request = async (
  url: string,
  options: RequestInit,
  { timeout = 60000 }: { timeout?: number } = {},
) => { ... };
```

---

## 20. Object Shorthand

Use shorthand when property and variable names match.

```ts
// ✅ Good
{ id, profile, user }
{ data, isLoading, error }

// ❌ Redundant
{ id: id, profile: profile, user: user }
```

---

## 21. No `types` Folder — Declare Types as Utils

Never create a folder called `types`. Declare types alongside their related logic in util files.

```ts
// ✅ Good — types in utils files
// utils/result.ts
export type Result<T, E = Error> = ...
// utils/validator.ts
export type Validator<T> = ...

// ❌ Bad — dedicated types folder
// types/result.ts
// types/validator.ts
```

---

## 22. Generic Filenames — Group Related Items

Use generic filenames and put multiple related exports in one file. Do not create one file per hook or util.

```ts
// ✅ Good — all utils in one file
// utils/format.ts
export const formatDate = (...) => { ... };
export const formatCurrency = (...) => { ... };

// ✅ Good — multiple hooks in one file
// hooks/auth.ts
export const useAuth = () => { ... };
export const useIsAuthenticated = () => { ... };

// ❌ Bad — one file per function
// utils/format-date.ts
// utils/format-currency.ts
// hooks/use-auth.ts
// hooks/use-is-authenticated.ts
```

---

## 23. Avoid `useMemo`, `useCallback`, and `useEffect`

This project uses the React compiler (React Forget), which automatically memoizes components and values. Explicit memoization via `useMemo` and `useCallback` is redundant and adds unnecessary noise.

`useEffect` is an inherent antipattern — its presence usually signals a missing data flow, an unplanned side effect, or a lifecycle concern that should be modelled differently. Prefer:

- **Event handlers** for user-initiated side effects
- **Derived state** / computed values instead of effect-driven state
- React 19's **`use()` hook** for promise-based data dependencies
- Custom hooks that encapsulate unavoidable side-effect logic

```tsx
// ❌ Bad — unnecessary memoization (React compiler handles this automatically)
const sorted = useMemo(() => [...items].sort(), [items]);
const handleClick = useCallback(() => { ... }, [deps]);

// ❌ Bad — useEffect for derived state
const [fullName, setFullName] = useState("");
useEffect(() => { setFullName(`${first} ${last}`); }, [first, last]);

// ✅ Good — derived value, no hook needed
const fullName = `${first} ${last}`;

// ✅ Good — event handler, not an effect
const handleSubmit = () => { ... };

// ✅ Good — React 19 use() for async data
const data = use(fetchData());
```
