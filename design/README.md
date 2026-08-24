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
# → http://localhost:8080/client/
```

Navigation links explicitly target each area's `index.html`, so the prototype
also works when its files are opened directly. Serving it remains the easiest
way to review it as a small site.

## Structure

```text
design/
├── assets/
│   ├── css/styles.css       # tokens, components, page layouts
│   ├── cursors/             # robot cursor SVGs (per interaction × theme)
│   └── js/
│       ├── prototype.js     # presentation-only interactions
│       └── chatter.js       # robot speech-bubble lines (all pages)
├── client/                  # everything a visitor sees
│   ├── index.html           # home
│   ├── work/                # index + experience detail
│   ├── projects/            # index + project detail
│   ├── library/             # bookshelf UI
│   ├── blog/                # index + post detail
│   ├── now/                 # status readout, current focus, toolbox
│   └── contact/             # contact UI
├── not-found/               # 404 UI + quips.js (root: serves client and admin)
└── admin/                   # dashboard mockups
```

Use one folder per top-level area, `index.html` for its landing page, and a
short content-type name such as `detail.html` or `post.html` for secondary
screens. Keep shared presentation files in `assets/`; keep page-specific files
beside their page.

## Pages

- `/client/` — home (typed `whoami` hero, robot mascot, evidence metrics)
- `/client/work/` → `detail.html` — experience list → engagement detail
- `/client/projects/` → `detail.html` — projects list → README-style detail
- `/client/library/` — bookshelf (cards link to each book's site)
- `/client/blog/` → `post.html` — writing list → article
- `/client/now/` — systemd-style status readout, current focus, toolbox,
  reading
- `/client/contact/` — contact buttons + email dialog mockup
- `/not-found/` — 404 design (lost robot + random quip; root-level, not
  client-only)
- `/admin/login.html` — admin sign-in UI
- `/admin/` — dashboard designs for experience, projects, library, posts, now,
  quips, messages, metrics, and profile (sidebar in that order: site content
  first, then inbox, telemetry, account)

## Quips

Two separate pools with different purposes — never merged:

- **404 quips** (`not-found/quips.js`) — third-person lines about the
  missing page, shown under the lost robot. `[label](url)` renders as a link.
- **Robot chatter** (`assets/js/chatter.js`) — first-person lines whoami
  mutters in its speech bubble, on any page.

Both are mock design content, edited at admin → Quips as two collapsible
lists (collapsed by default). Every page carries a cookie consent banner on
first visit; the footer "Cookies" button reopens the settings dialog.

## Review helpers

- `?theme=light` / `?theme=dark` — force a theme for screenshots
- `?cookies=banner` / `?cookies=settings` — force cookie UI states
- `/client/contact/?dialog=open` — open the email dialog
- `?chatter=now` — make the robot speak immediately
- Robot (its name is whoami — hover for the tooltip): click it = jump · click
  elsewhere = blue antenna flash · typing = amber (backspace red, enter
  green) · 7 quick taps on the hero robot = party mode · 30s idle = falls
  asleep · opening devtools = caught-you alert with a hint at the code below
- Cursor: native everywhere by default. The Konami code (↑↑↓↓←→←→BA) swaps in
  the mini-mascot cursor set from `assets/cursors/` — robot arrow; a curious
  robot with a floating "?" over links and buttons; a lavender jump while
  pressing; over prose the robot carries an I-beam caret, and the hotspot sits
  on the caret so selection stays precise — theme-aware like the mascot
  (glowing eyes in dark, dark eyes in light). The unlock persists across pages, the robots party when it
  activates, and the footer grows an "Eject robot" switch while it's on
- Click sparks: every click knocks a few pixels loose (off under
  `prefers-reduced-motion`)
- Chatter: the hero robot (nav robot on inner pages) mutters a random
  terminal one-liner every so often in a pixel speech bubble
- All colors and spacing live as tokens at the top of `assets/css/styles.css`
