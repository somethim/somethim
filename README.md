# Arbi Kullakshi — Portfolio

A server-rendered Next.js portfolio focused on systems engineering, full-stack
delivery, infrastructure, and robotics. It uses a restrained Mecha Mocha visual
system, no animation or tracking, and loads the Roomba demonstration only when
the visitor starts it.

## Start locally

Install [Bun](https://bun.sh), then run:

```bash
bun install
bun dev
```

Open <http://localhost:3000>. The site works without environment variables;
without a Resend key, contact submissions show a direct-email fallback.

To test production output:

```bash
bun run build
bun start
```

## Contact form

Copy `.env.example` to `.env.local` and provide a Resend API key:

```bash
RESEND_API_KEY=re_your_key
```

The sending domain must authorize `portfolio@arbikullakshi.com`. The server
action validates all fields, uses a honeypot, limits each client address to
three accepted attempts per 15 minutes, and never exposes provider errors.

## Quality checks

```bash
bun format
bun lint
bun typecheck
bun run build
```

The production image can be exercised locally with:

```bash
docker build -t portfolio:local .
docker run --rm -p 3000:3000 -e RESEND_API_KEY portfolio:local
```

## Content and media

- Portfolio data: `src/data/portfolio.ts`
- Current CV download: `public/assets/arbi-kullakshi-cv.pdf`
- Canonical CV working copy: `/home/arbi/Documents/Arbi Kullakshi CV.pdf`
- Roomba media preparation: `scripts/prepare-media.sh`

Run the media script only after replacing the source video in the Roomba
repository. It creates the optimized MP4 and WebP poster used by this site.

## Deployment

Pushes to `main` publish:

- `ghcr.io/somethim/portfolio:latest` — current portfolio
- `ghcr.io/somethim/portfolio:legacy` — preserved `legacy` branch

The infrastructure repository at `/home/arbi/Work/Personal/infra` runs both
behind Traefik:

- <https://arbikullakshi.com>
- <https://legacy.arbikullakshi.com>

Watchtower deploys new image digests. Compose or secret changes require running
the infra repository's manual Deploy workflow. Production email requires its
`PORTFOLIO_RESEND_API_KEY` repository secret.
