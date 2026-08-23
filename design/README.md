# Portfolio design prototype

Static HTML/CSS design for the Leptos rebuild. No build step, no dependencies —
JS is used only for animation and navigation (theme toggle, typing effects,
robot behaviors, dialog open/close).

## Viewing

Serve over HTTP (avoids Chrome's `file://` unique-origin warnings):

```sh
python -m http.server 8080
# → http://localhost:8080
```

Opening the files directly also works; the console may show a harmless
"Unsafe attempt to load URL file://…" warning from Chrome's link prefetching.

## Pages

- `index.html` — home (typed `whoami` hero, robot mascot, evidence metrics)
- `work.html` → `work-detail.html` — experience list → engagement detail
- `projects.html` → `project-detail.html` — projects list → README-style detail
- `library.html` — bookshelf (cards link to each book's site)
- `blog.html` → `blog-post.html` — writing list → article
- `contact.html` — contact buttons + Resend dialog mockup (`?dialog=open` previews it)
- `404.html` — not-found page (lost robot + random quip; quips are admin-managed)
- `admin-login.html` — admin sign-in (email, password, TOTP)
- `admin*.html` — the `/admin` dashboard designs (projects, experience, library,
  posts, messages, metrics, quips, profile)

The 404 quip list lives in `quips.js` (stand-in for the backend-managed list).
Every page carries a cookie consent banner on first visit (session + first-party
view counter); the footer "Cookies" button reopens the settings dialog.

## Review helpers

- `?theme=light` / `?theme=dark` — force a theme for screenshots
- `?cookies=banner` / `?cookies=settings` — force the consent banner / settings dialog
- Robot: click it = jump · click elsewhere = blue antenna flash · typing = amber
  (backspace red, enter green) · 7 quick taps on the hero robot = party mode ·
  30s idle = falls asleep · opening devtools = caught-you alert
- All colors/spacing live as tokens at the top of `styles.css`
