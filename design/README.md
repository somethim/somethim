# Portfolio design prototype

Static HTML/CSS design reference for the Leptos rebuild. There is no build
step, dependency, data layer, form submission, authentication, or backend
behavior. JavaScript is limited to prototype presentation states: theme,
typing effects, robot motion, dialogs, and cookie UI.

## Viewing

Serve the design directory over HTTP:

```sh
cd design
python -m http.server 8080
# → http://localhost:8080
```

Navigation links explicitly target each area's `index.html`, so the prototype
also works when its files are opened directly. Serving it remains the easiest
way to review it as a small site.

## Structure

```text
design/
├── assets/
│   ├── css/styles.css       # tokens, components, page layouts
│   └── js/prototype.js      # presentation-only interactions
├── admin/                   # dashboard mockups
├── blog/                    # index + post detail
├── contact/                 # contact UI
├── library/                 # bookshelf UI
├── not-found/               # 404 UI + page-specific quips
├── projects/                # index + project detail
├── work/                    # index + experience detail
└── index.html               # home
```

Use one folder per top-level area, `index.html` for its landing page, and a
short content-type name such as `detail.html` or `post.html` for secondary
screens. Keep shared presentation files in `assets/`; keep page-specific files
beside their page.

## Pages

- `/` — home (typed `whoami` hero, robot mascot, evidence metrics)
- `/work/` → `/work/detail.html` — experience list → engagement detail
- `/projects/` → `/projects/detail.html` — projects list → README-style detail
- `/library/` — bookshelf (cards link to each book's site)
- `/blog/` → `/blog/post.html` — writing list → article
- `/contact/` — contact buttons + email dialog mockup
- `/not-found/` — 404 design (lost robot + random quip)
- `/admin/login.html` — admin sign-in UI
- `/admin/` — dashboard designs for projects, experience, library, posts,
  messages, metrics, quips, and profile

The 404 quip list lives in `not-found/quips.js` as mock design content. Every
page carries a cookie consent banner on first visit; the footer "Cookies"
button reopens the settings dialog.

## Review helpers

- `?theme=light` / `?theme=dark` — force a theme for screenshots
- `?cookies=banner` / `?cookies=settings` — force cookie UI states
- `/contact/?dialog=open` — open the email dialog
- Robot: click it = jump · click elsewhere = blue antenna flash · typing =
  amber (backspace red, enter green) · 7 quick taps on the hero robot = party
  mode · 30s idle = falls asleep · opening devtools = caught-you alert
- All colors and spacing live as tokens at the top of `assets/css/styles.css`
