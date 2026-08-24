-- Seed: the current mock content becomes the initial database rows.
--
-- Ids are never written here: every primary key defaults to the native
-- uuidv7() (PostgreSQL 18) in the schema. Rows reference each other by
-- natural keys (entry slug, tag name, commenter email, comment body), and
-- every insert is idempotent on its natural key, so re-running is always
-- safe.

BEGIN;

-- ---------------------------------------------------------------- entries --

INSERT INTO entries (section, slug, title, source_link, category, body, extra, draft, created_at)
SELECT v.section::section, v.slug, v.title, v.source_link, v.category,
       v.body, v.extra::jsonb, v.draft, v.created_at::timestamptz
FROM (VALUES
-- Blog
('blog', 'timestamp-ordered-sensor-fusion', 'Timestamp-ordered sensor fusion for a simulated Roomba',
 NULL, 'Robotics · Rust', $body$The Roomba simulator runs five sensors — wheel odometry, an IMU, a LiDAR, a cliff sensor, and a bump ring — each in its own Tokio task, each on its own clock. That last part was deliberate: real robots never give you a single tidy sample rate, and I wanted the estimator to survive the mess rather than assume it away.

The mess arrived immediately. Measurements reach the fusion task through a channel, which means they arrive in channel order, not timestamp order. An EKF is a sequential algorithm; feed it a measurement from the past after one from the future and the covariance update is simply wrong. Nothing crashes. The estimate just drifts, quietly, which is the worst kind of bug.

## Bounded replay

The fix is a small reordering buffer. Measurements are staged for a bounded window before being applied, sorted by timestamp. Anything older than the window when it arrives is dropped — late data is worse than no data once the filter has moved on.

```
fn drain_ready(&mut self, now: SimTime) -> Vec<Measurement> {
    // Apply only measurements older than the replay horizon;
    // anything newer may still be overtaken by a late arrival.
    let horizon = now - REPLAY_WINDOW;
    self.staged.split_off_ready(horizon)  // sorted by timestamp
}
```

The window length is a trade-off you can reason about: it must exceed the worst-case delivery skew between sensor tasks, and every millisecond you add is a millisecond of estimator latency. I measured the skew under load and set the window to twice the observed p99 — REPLAY_WINDOW ended up at 40 simulated milliseconds.

## Innovation gating

Ordering was half the problem. The other half was trust. LiDAR-to-wall corrections are only useful when the beam actually hit the wall the map says it hit; in cluttered corners a mismatched return would yank the pose sideways.

> A measurement that disagrees too much with the prediction is more likely to be wrong than the prediction is.

So every correction passes through an innovation gate: the Mahalanobis distance between predicted and observed range has to fall under a chi-squared threshold, or the measurement is discarded and counted. The counter matters — a healthy filter rejects the occasional outlier, and a filter rejecting 30% of its corrections is telling you the map, not the sensor, is wrong.

## What I'd do differently

- Start with the replay buffer on day one. Retrofitting ordering into a live filter meant re-deriving every covariance test.
- Log rejected innovations from the beginning — the rejection rate turned out to be the best health metric in the whole system.
- Property-test the buffer with randomized arrival orders instead of hand-picked cases. The bug that survived longest was a tie between equal timestamps.

The full implementation is in the roomba repository — the fusion task, the replay buffer, and the property tests live in crates/fusion.$body$,
 '{"reading_time": "9 min read"}', false, '2026-08-18T09:00:00Z'),
('blog', 'shipping-an-identity-platform', 'Shipping an identity platform: 10 OAuth providers later',
 NULL, 'Laravel · Process',
 $body$OAuth is a standard, which means every provider implements it differently. Over a year I wired ten external providers into a nine-module Laravel platform, alongside passwordless login, TOTP MFA, and account linking. These are the notes I wish I had on day one.

## The spec is where agreement ends

Every provider speaks authorization-code-with-PKCE. Almost nothing else is shared:

- Some providers return email_verified, some omit it, and at least one returns it as the string "true". Treating an unverified email as an identity is how account takeover happens, so anything ambiguous is treated as unverified.
- Refresh token behavior splits three ways: rotate on every use, rotate never, or expire silently after inactivity. The token store had to model all three without caring which provider it was talking to.
- Avatar URLs from one provider expire after hours. Anything you want to keep, you copy at login time.

The lesson was structural: one thin adapter per provider, each normalizing into a strict internal identity type, and nothing outside the adapter ever inspects provider-specific fields.

## Linking accounts without guessing

Account linking is where identity platforms quietly go wrong. The rule that survived review: a verified email match may *suggest* a link, but only an authenticated user can confirm one. Signing in with a new provider that claims an email already on file does not merge anything — it starts a linking flow inside the signed-in session. Slightly more friction, categorically fewer ways to steal an account.

## Passwordless, with a spine

Passwordless login (magic links) removed the password reset queue almost entirely, but it promotes your email delivery into an authentication dependency — rate limits, single-use tokens bound to the requesting session, and short expiries are not optional hardening, they are the feature. TOTP MFA sits on top for the accounts that want it, with the usual enrollment dance: show the secret once, verify one code, store only the secret encrypted.

## Sessions you can audit

The requirement that shaped the session layer was auditable termination: when an account is compromised or an employee leaves, someone has to be able to answer "which sessions existed and when did they end". Sessions are first-class rows with device metadata and an explicit terminated_at set by logout, revocation, or global sign-out — deleting a row is not termination, because deleted rows cannot be audited.

Ten providers later, the platform treats identity as a boring, well-lit module. That was the whole goal.$body$,
 '{"reading_time": "7 min read"}', false, '2026-07-26T09:00:00Z'),
('blog', 'a-negative-result-is-still-a-result', 'A negative result is still a result',
 NULL, 'Research · Process',
 $body$My thesis asked a simple question: does telling a traffic model about planned concerts make its predictions better? Everyone I pitched it to assumed the answer was yes. 5.68 million sensor-time rows, 164 verified concerts, and 540 controlled model fits later, the honest answer was no — and I published it anyway.

## The setup

The data was Caltrans PeMS loop-detector flow for Los Angeles and San Francisco, paired with historical concerts from setlist.fm. The design was deliberately boring: two configurations of the *same* model, where run A sees only temporal and historical lag features, and run A+raw sees exactly those features plus raw planned-event fields — distance to venue, expected popularity, time to event. Same rows, same forward test blocks, same seeds, same hyperparameters. The feature set is the only variable, so whatever difference appears is attributable to the events.

Evaluation used five non-overlapping seven-day rolling-origin test blocks, three seeds averaged within each fold, Random Forest as the claim-bearing model and XGBoost as the robustness check.

## Where the data fights back

Most of the project was not machine learning. It was refusing to be lied to by the inputs.

- PeMS quietly pre-fills dead detectors with plausible-looking historical averages, flagged only through a %Observed column. Averages contain no event spikes by construction — train on them and the event features look useless for reasons that have nothing to do with events. The pipeline un-fills those bins back to missing instead.
- setlist.fm's venue search matches nationwide, and The Fillmore exists in half a dozen US cities. Every result gets validated against the setlist's own city before it can attach to a venue's coordinates.
- setlist.fm returns one setlist per performing artist, so a festival bill looks like five concerts. Multi-artist bills collapse to one event per venue and day.
- The API has no capacity data, so a hand-built venue reference table supplies precise coordinates and capacity for each major venue — capacity is the popularity signal.

## The result

On real data, the event-aware model was consistently no better than the baseline, and on several folds it was worse. In hindsight the mechanism is plain: by fifteen minutes before the prediction interval, the loop detectors already see the congestion building. The lag features carry the event's effect; the event metadata mostly adds noise on top of information the model already has.

> A null or negative A-versus-A+raw result remains the thesis result.

That sentence was written into the methodology before the first real run, and it is what let me submit the outcome without flinching.

## Trusting a negative

A negative result is only worth publishing if you can show the experiment could have detected the effect. That is what the synthetic testbed was for: a generator fabricates PeMS-style flow with a known, injected event effect, and the identical pipeline recovers it — a model blind to events cannot explain the injected spikes. A placebo run that shifts every event by seven days while preserving locations and metadata confirms the real comparison was not reacting to structure leakage.

The mechanism works. The signal in the real data, at this horizon and with these features, is simply not there — and now that is written down, reproducibly, so the next person can start from it instead of rediscovering it.$body$,
 '{"reading_time": "6 min read"}', false, '2026-06-30T09:00:00Z'),
('blog', 'navigating-home-on-a-map-you-earned', 'Navigating home on a map you earned',
 NULL, 'Robotics · Rust',
 $body$The assignment sounded simple: drop a drone into a procedurally generated cave, fly it from start to end, then bring it home. The rule that made it interesting was one we imposed ourselves — the way out is planned on the ground-truth map, but the way home may only use the map the robot built itself.

## Out: the map you are given

The forward leg gets the whole cave up front, so the problem is not discovery but taste: of all the paths through, which one should a drone actually fly? Plain shortest-path A* hugs walls, because cutting corners is free. The fix is clearance weighting — a BFS flood-fill from every wall cell computes each free cell's distance to the nearest obstacle, and A* costs penalize low-clearance cells. The resulting path is a few cells longer and much harder to crash.

Localisation on the way out is an Extended Kalman Filter fusing motor dead-reckoning with pose measurements from Gazebo. Dead-reckoning alone drifts — commanded motion and actual motion diverge a little more every step — and the periodic pose updates pull the estimate back before the error compounds.

## Learning while flying

While the drone flies out, a particle-filter SLAM crate builds an occupancy grid from LiDAR: each scan ray-traces free cells along the beam and marks a hit at the end. During the forward trip the particle filter is deliberately not used for localisation — the EKF already owns that job — only the map write matters. The grid fills in exactly the parts of the cave the LiDAR actually saw, which is not the same as the cave.

## Home: the map you earned

At the destination the ground-truth map is taken away. The return path is planned by the same A* — on the SLAM-derived occupancy grid. Corridors the LiDAR never looked down do not exist in that map, so the drone can only go home through space it can prove it observed. Watching the return leg is watching the quality of your mapping decisions: a sloppy sensor model earlier means a longer, stranger route home now.

## The pipe

The navigation logic is plain Rust, and Gazebo integration stays at arm's length: a ROS 2 node (via rclrs) spawns the robot binary as a subprocess and speaks newline-delimited JSON over stdin and stdout — LiDAR scans in, velocity commands out. The same binary runs headless against the generator's cave.json with no simulator at all, which is where almost all of the debugging happened. The simulator makes it real; the pipe keeps it testable.$body$,
 '{"reading_time": "8 min read"}', false, '2026-08-08T09:00:00Z'),
('blog', 'only-one-repo-touches-the-server', 'Only one repo touches the server',
 NULL, 'Infrastructure · Process',
 $body$I run three applications on one Hetzner box: a CRM, a venue platform, and this site. The rule that keeps that sane fits in a sentence — application repos are build-only, and exactly one repo is allowed to touch the server.

## Build-only apps

Each app repo's CI does one thing: build a container image and push it to GHCR. No SSH keys, no deploy steps, no production secrets. An app repo cannot break the server, because an app repo cannot reach the server.

Deployment happens by observation instead: Watchtower runs on the host, notices when an image's digest changes, pulls it, and recreates the container. Shipping to production is literally merging to main and waiting for the build.

## The one deployer

The infra repo is the only thing that SSHes to the box, and it is an Ansible playbook with four jobs:

- harden the base system — packages plus a default-deny ufw with only 22, 80, and 443 open
- install Docker and the compose plugin
- run the edge: shared edge and data networks, and Traefik terminating TLS on 80/443
- lay down each app's stack definition — compose file and environment — and start it

Every stack, every secret path, every network is declared in one place. Rebuilding the box from nothing is running the playbook once.

## Constraints worth writing down

Traefik gets certificates through Let's Encrypt HTTP-01, which means the app domains must resolve directly to the host — put a proxy CDN in front and issuance breaks. The apps share one Postgres service on the internal data network; only backends join it, so the public-facing containers cannot see the database at all.

The trade I accepted: Watchtower follows latest-tag digests, so a bad merge deploys itself. The answer is the same mechanism in reverse — push the previous image and it redeploys itself too. Rollback is a retag, not an incident call.

The result is a box I do not think about. The apps ship themselves; the infra repo is the only thing with hands.$body$,
 '{"reading_time": "6 min read"}', false, '2026-08-02T09:00:00Z'),

('blog', 'authorization-in-fifteen-milliseconds', 'Authorization in fifteen milliseconds',
 'https://github.com/zennit-dev/abac', 'Laravel · Open source',
 $body$Role-based access control fails slowly. It starts with three tidy roles, and two years later there are forty — editor-but-only-drafts, admin-except-billing — each one a hack around the fact that what you actually wanted to express was a rule about attributes.

That is what pushed me to write an attribute-based authorization package for Laravel, extracted from the identity platform I work on and now running in production.

## Rules about attributes

ABAC evaluates a policy against the attributes of the subject, the resource, and the context — department, ownership, time of day, resource state — instead of asking whether a user holds a named role. The roles-explosion disappears because the forty pseudo-roles were always attribute rules in disguise.

The package expresses those rules as policies with constraints, enforced at the middleware layer, so a request is authorized before it ever reaches a controller. Artisan scaffolding generates the policy skeletons; audit hooks record every decision, which is the part security review actually asks about — not "could they", but "did they, and when".

## The performance question

Nobody wants an authorization layer they can feel. The benchmark suite runs mixed policies over 10,000 resources in roughly 15 milliseconds — with caching doing the honest work: decisions are cached and invalidated on policy change, so the steady-state cost of a check is a lookup.

The number I care about more is 61: the tests that pin the semantics down. Authorization bugs are quiet — a policy that is slightly too permissive fails silently for years. The test suite is the only place where "who can do what" is written down in a form that cannot drift from the code.

## Extract, then harden

The package existed inside the platform first and was extracted once the boundary was obvious. Extraction forced the API to get honest — no reaching into the host app's session shape, no assumptions about the user model — and the public interface that survived is smaller and stricter than the internal one ever was. If you have authorization logic worth reusing, extraction is the review.$body$,
 '{"reading_time": "7 min read"}', false, '2026-07-05T09:00:00Z'),

('blog', 'control-loop-notes', 'Control loop notes', NULL, 'Robotics · Rust',
 $body$Draft.$body$, '{}', true, '2026-08-20T09:00:00Z'),

-- Projects
('project', 'cave-robot', 'Cave Robot', 'https://github.com/somethim', 'Robotics · University MVP',
 $body$Six-crate Rust workspace integrating procedural 3D voxel caves, EKF localization, SLAM, ROS 2, and Gazebo. Clearance-weighted A* plans outbound on the known map while LiDAR builds an occupancy map for the return path.$body$,
 '{"subtitle": "Autonomous cave-navigation drone"}', false, '2026-08-21T09:00:00Z'),
('project', 'roomba', 'Roomba', 'https://github.com/somethim', 'Robotics · Simulation',
 $body$A documented 10× real-time simulator that visits reachable rooms, cleans multiple dirt types, replans around obstacles, and returns to dock. Five independently clocked Tokio sensor tasks feed timestamp-ordered fusion with innovation-gated EKF corrections.$body$,
 '{"subtitle": "Autonomous cleaning robot"}', false, '2026-08-14T09:00:00Z'),
('project', 'event-aware-traffic-prediction', 'Event-Aware Traffic Prediction', NULL, 'Research · B.Sc. Thesis',
 $body$Evaluated 5.68 million sensor-time rows and 164 verified concerts through 540 controlled Random Forest and XGBoost fits. Event metadata degraded real-data predictions; controlled synthetic experiments recovered the injected effect, validating the mechanism without overstating the outcome.$body$,
 '{"subtitle": "A negative result, tested reproducibly"}', false, '2026-07-30T09:00:00Z'),
('project', 'pyramid-backstage', 'Pyramid Backstage', NULL, 'Platform · JunctionX Tirana',
 $body$Hackathon platform for event intake, space matching, quotations, reservations, approvals, and task planning. A typed Bun/Hono and Next.js monorepo: the Hono provider exports its AppType so the web app's RPC client is fully typed end to end, Zod contracts are the single source of truth for everything crossing the boundary, Drizzle owns the Postgres schema, AI intake extraction runs as a server-side Ollama proxy, and the React Three Fiber venue view stays client-only and read-only.$body$,
 '{"subtitle": "Venue operations, unified"}', true, '2026-07-12T09:00:00Z'),

-- Library
('library', 'designing-data-intensive-applications', 'Designing Data-Intensive Applications',
 'https://dataintensive.net/', 'Systems',
 $body$The mental model I reach for when weighing storage engines, replication, and consistency trade-offs.$body$,
 '{"author": "Martin Kleppmann", "status": "finished"}', false, '2026-08-10T09:00:00Z'),
('library', 'zero-to-production-in-rust', 'Zero To Production In Rust',
 'https://www.zero2prod.com/', 'Rust',
 $body$Backend Rust the way I actually ship it — testing, telemetry, and deployment included.$body$,
 '{"author": "Luca Palmieri", "status": "reading"}', false, '2026-08-19T09:00:00Z'),
('library', 'probabilistic-robotics', 'Probabilistic Robotics',
 'https://mitpress.mit.edu/9780262201629/probabilistic-robotics/', 'Robotics',
 $body$The theory behind the EKF and SLAM work in Cave Robot and Roomba.$body$,
 '{"author": "Thrun, Burgard & Fox", "status": "reading"}', false, '2026-08-17T09:00:00Z'),
('library', 'rust-for-rustaceans', 'Rust for Rustaceans', 'https://rust-for-rustaceans.com/', 'Rust',
 $body$Intermediate-to-advanced Rust: API design, unsafe, async internals.$body$,
 '{"author": "Jon Gjengset", "status": "finished"}', false, '2026-06-02T09:00:00Z'),
('library', 'a-philosophy-of-software-design', 'A Philosophy of Software Design',
 'https://web.stanford.edu/~ouster/cgi-bin/book.php', 'Craft',
 $body$Deep modules, shallow interfaces — quietly changed how I split up systems.$body$,
 '{"author": "John Ousterhout", "status": "finished"}', false, '2026-04-28T09:00:00Z'),
('library', 'database-internals', 'Database Internals', 'https://www.databass.dev/', 'Infrastructure',
 $body$What PostgreSQL is actually doing under the workloads I tune.$body$,
 '{"author": "Alex Petrov", "status": "reading"}', false, '2026-08-05T09:00:00Z'),

-- Experience
('experience', 'zennit', 'Zennit', NULL, 'Full Stack Engineer · Full-time',
 $body$Architected a nine-module Laravel SaaS backend and identity platform — 10 OAuth providers, passwordless login, account linking, TOTP MFA, and auditable session termination.

Built production authorization, product interfaces, and repeatable delivery systems across six products.$body$,
 '{"period": "Jan 2024 — Present"}', false, '2024-01-15T09:00:00Z'),
('experience', 'hire-a-loo', 'Hire A Loo', NULL, 'Backend Developer · Contract',
 $body$Authored 18 CRM pull requests spanning Typesense search, web-lead ingestion, price quoting, email templating, CardDAV contacts, and legacy migrations.

Delivered an end-to-end quotation workflow and extracted the Notifyre SMS integration into an open-source Laravel package with 183 tests.$body$,
 '{"period": "Aug 2025 — Jun 2026"}', false, '2025-08-01T09:00:00Z'),
('experience', 'clickservice-gmbh', 'Clickservice GmbH', NULL, 'Full Stack Developer',
 $body$Optimized Django and PostgreSQL services with targeted raw SQL, built third-party integrations and automated reporting, and delivered React/TypeScript interfaces for production workflows.$body$,
 '{"period": "Jan 2023 — Jan 2024"}', false, '2023-01-15T09:00:00Z'),
('experience', 'vodafone-albania', 'Vodafone Albania', NULL, 'Mobile Developer',
 $body$Delivered React Native features for production iOS and Android applications, integrating REST APIs, WebSockets, authentication, and release workflows.$body$,
 '{"period": "Jan 2022 — Dec 2022"}', false, '2022-01-15T09:00:00Z'),
('experience', 'enredyate', 'EnRedYAte', NULL, 'Junior Frontend Developer',
 $body$Built responsive React and WordPress interfaces from product and design requirements, contributing to maintenance and peer review.$body$,
 '{"period": "Jan 2021 — Dec 2021"}', false, '2021-01-15T09:00:00Z')
) AS v(section, slug, title, source_link, category, body, extra, draft, created_at)
ON CONFLICT (section, slug) DO NOTHING;

-- ------------------------------------------------------------------- tags --

INSERT INTO tags (name)
SELECT v.name
FROM (VALUES
    ('rust'),
    ('tokio'),
    ('ekf'),
    ('sensor fusion'),
    ('laravel'),
    ('oauth'),
    ('security'),
    ('python'),
    ('xgboost'),
    ('thesis'),
    ('random forest'),
    ('ros 2'),
    ('gazebo'),
    ('slam'),
    ('a*'),
    ('bun / hono'),
    ('next.js'),
    ('postgresql'),
    ('drizzle'),
    ('react / next.js'),
    ('docker'),
    ('ansible'),
    ('typesense'),
    ('pest'),
    ('django'),
    ('react'),
    ('react native'),
    ('ios / android'),
    ('wordpress'),
    ('traefik'),
    ('abac')
) AS v(name)
ON CONFLICT (name) DO NOTHING;

INSERT INTO entry_tags (entry_id, tag_id)
SELECT e.id, t.id
FROM (VALUES
    ('only-one-repo-touches-the-server', 'docker'),
    ('only-one-repo-touches-the-server', 'ansible'),
    ('only-one-repo-touches-the-server', 'traefik'),
    ('authorization-in-fifteen-milliseconds', 'laravel'),
    ('authorization-in-fifteen-milliseconds', 'security'),
    ('authorization-in-fifteen-milliseconds', 'abac'),
    ('navigating-home-on-a-map-you-earned', 'rust'),
    ('navigating-home-on-a-map-you-earned', 'ros 2'),
    ('navigating-home-on-a-map-you-earned', 'slam'),
    ('navigating-home-on-a-map-you-earned', 'ekf'),
    ('navigating-home-on-a-map-you-earned', 'a*'),
    ('timestamp-ordered-sensor-fusion', 'rust'),
    ('timestamp-ordered-sensor-fusion', 'tokio'),
    ('timestamp-ordered-sensor-fusion', 'ekf'),
    ('timestamp-ordered-sensor-fusion', 'sensor fusion'),
    ('shipping-an-identity-platform', 'laravel'),
    ('shipping-an-identity-platform', 'oauth'),
    ('shipping-an-identity-platform', 'security'),
    ('a-negative-result-is-still-a-result', 'python'),
    ('a-negative-result-is-still-a-result', 'xgboost'),
    ('a-negative-result-is-still-a-result', 'thesis'),
    ('cave-robot', 'rust'),
    ('cave-robot', 'ros 2'),
    ('cave-robot', 'gazebo'),
    ('cave-robot', 'slam'),
    ('cave-robot', 'a*'),
    ('roomba', 'rust'),
    ('roomba', 'tokio'),
    ('roomba', 'ekf'),
    ('roomba', 'sensor fusion'),
    ('event-aware-traffic-prediction', 'python'),
    ('event-aware-traffic-prediction', 'xgboost'),
    ('event-aware-traffic-prediction', 'random forest'),
    ('pyramid-backstage', 'bun / hono'),
    ('pyramid-backstage', 'next.js'),
    ('pyramid-backstage', 'postgresql'),
    ('pyramid-backstage', 'drizzle'),
    ('zennit', 'laravel'),
    ('zennit', 'react / next.js'),
    ('zennit', 'postgresql'),
    ('zennit', 'docker'),
    ('zennit', 'ansible'),
    ('hire-a-loo', 'laravel'),
    ('hire-a-loo', 'typesense'),
    ('hire-a-loo', 'postgresql'),
    ('hire-a-loo', 'pest'),
    ('clickservice-gmbh', 'django'),
    ('clickservice-gmbh', 'postgresql'),
    ('clickservice-gmbh', 'react'),
    ('vodafone-albania', 'react native'),
    ('vodafone-albania', 'ios / android'),
    ('enredyate', 'react'),
    ('enredyate', 'wordpress')
) AS v(slug, tag)
JOIN entries e ON e.slug = v.slug
JOIN tags t ON t.name = v.tag
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------------ inbox --

INSERT INTO messages (sender_name, sender_email, body, read, created_at)
SELECT v.sender_name, v.sender_email, v.body, v.read, v.created_at::timestamptz
FROM (VALUES
    ('Elira Hoxha', 'elira@venue.al',
$q$Hi Arbi — I run events at a mid-size venue in Tirana and came across Pyramid Backstage. We handle intake and quotations over email and spreadsheets today, and it is starting to fall apart.

Would you be open to a short call about building something similar for us? Timeline is flexible; budget is real. The Cal.com link on your site works for me if that is the easiest route.$q$,
     false, '2026-08-22T14:32:00Z'),
    ('Markus Weber', 'markus@weber-consulting.de',
     'Contract question — availability for Q4 integration work?', false, '2026-08-21T10:00:00Z'),
    ('Jon P.', 'jon@rust-tirana.dev',
     'Talk invitation: Rust Tirana meetup, September.', true, '2026-08-15T11:00:00Z')
) AS v(sender_name, sender_email, body, read, created_at)
WHERE NOT EXISTS (SELECT 1 FROM messages m WHERE m.sender_email = v.sender_email);

-- ------------------------------------------------------------------ quips --

INSERT INTO quips (kind, body)
SELECT v.kind::quip_kind, v.body
FROM (VALUES
    ('chatter', $q$beep. that one was involuntary.$q$),
    ('chatter', $q$have you tried turning yourself off and on again?$q$),
    ('chatter', $q$i'm not idle, i'm garbage collecting.$q$),
    ('chatter', $q$days since last segfault: 0.$q$),
    ('chatter', $q$there's no place like 127.0.0.1.$q$),
    ('chatter', $q$sudo make me a sandwich.$q$),
    ('chatter', $q$01101000 01101001 — that's 'hi'.$q$),
    ('chatter', $q$still compiling. it's rust. don't rush me.$q$),
    ('chatter', $q$i saw you hover. everyone saw.$q$),
    ('chatter', $q$my other body is a simulation.$q$),
    ('chatter', $q$this site is server-rendered. i am not.$q$),
    ('chatter', $q$he promised me arms in v2.$q$),
    ('chatter', $q$i dream in hex.$q$),
    ('chatter', $q$do not feed after midnight.$q$),
    ('chatter', $q$my name is whoami. his idea, not mine.$q$),
    ('chatter', $q$$ whoami → me. it never gets old.$q$),
    ('not_found', $q$It's dangerous to go alone — take this:$q$),
    ('not_found', $q$Your page is in another castle.$q$),
    ('not_found', $q$These aren't the pages you're looking for.$q$),
    ('not_found', $q$The cake is a lie, and so was this URL.$q$),
    ('not_found', $q$Hey! Listen! This page doesn't exist.$q$),
    ('not_found', $q$YOU DIED. Respawn below.$q$),
    ('not_found', $q$Would you kindly head back home?$q$),
    ('not_found', $q$All your page are belong to us.$q$),
    ('not_found', $q$Game over, man! Game over!$q$),
    ('not_found', $q$I've seen things you people wouldn't believe. This page isn't one of them.$q$),
    ('not_found', $q$You are dead — not big surprise.$q$),
    ('not_found', $q$I'm sorry, Dave. I'm afraid I can't find that.$q$),
    ('not_found', $q$DANGER, WILL ROBINSON — page not found.$q$),
    ('not_found', $q$Here I am, brain the size of a planet, and they ask me to fetch a missing page.$q$),
    ('not_found', $q$Number 5 is alive. This page is not.$q$),
    ('not_found', $q$Hasta la vista, page.$q$),
    ('not_found', $q$Does not compute. Does not compute. Does not—$q$),
    ('not_found', $q$Houston, we have a problem — this page has left orbit.$q$),
    ('not_found', $q$DON'T WORRY IF IT LOOKS STUCK.$q$),
    ('not_found', $q$Yer not ready for the high seas, son.$q$),
    ('not_found', $q$To report this issue, please [click here](https://www.youtube.com/watch?v=iik25wqIuFo).$q$)
) AS v(kind, body)
WHERE NOT EXISTS (SELECT 1 FROM quips q WHERE q.body = v.body);

-- ----------------------------------------------------------- site content --

INSERT INTO site_content (key, value) VALUES
('profile', '{
    "tagline": "systems · full stack · robotics",
    "summary": "I build backend systems, security platforms, delivery infrastructure, and autonomous robots — from architecture through testing, deployment, and operation.",
    "metrics": [
        {"value": "9",     "label": "Laravel platform modules"},
        {"value": "10",    "label": "External OAuth providers"},
        {"value": "10×",   "label": "Real-time robot simulation"},
        {"value": "5.68M", "label": "Research rows evaluated"}
    ]
}'),
('now', '{
    "status": [
        {"label": "Loaded", "value": "loaded (/home/arbi; enabled; preset: curious)"},
        {"label": "Active", "value": "active (running) — Tirana, Albania"},
        {"label": "Tasks",  "value": "3 of ∞"},
        {"label": "Memory", "value": "rust is borrowing most of it"},
        {"label": "CPU",    "value": "10× real time (simulation only)"}
    ],
    "building": [
        "Rewriting this site in Leptos — server-rendered Rust; the design prototype you are looking at is the blueprint.",
        "Simulation-first robotics: teaching an autonomous robot to misbehave at 10× real time, where mistakes are free."
    ],
    "tags": ["Rust", "Leptos", "Robotics"]
}'),
('toolbox', '["Arch Linux", "Hyprland", "Neovim", "Rust", "Laravel", "PostgreSQL", "Docker", "IBM Plex Mono"]')
ON CONFLICT (key) DO NOTHING;

-- ------------------------------------------------------------------ users --

-- LOCAL DEVELOPMENT ONLY: `contact@arbikullakshi.com` / `arbi-dev-password`.
-- Delete this row (or change the password hash) before seeding production.
INSERT INTO users (email, password_hash)
SELECT 'contact@arbikullakshi.com', '$argon2id$v=19$m=19456,t=2,p=1$CjujneZSqb5RJEtAnsPmDQ$eEWUCb/x8yKdvDWWcvS/fLdACiglGE1uUB0IdeznPuE'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE email = 'contact@arbikullakshi.com');

COMMIT;
