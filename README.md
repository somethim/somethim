<div align="center">

<code>arbi@kullakshi:~$ whoami</code>

# Arbi Kullakshi

### Software Engineer · Rust & Robotics

I build backend systems, security platforms, delivery infrastructure, and autonomous robots—from architecture through testing, deployment, and operation.

[![Website](https://img.shields.io/badge/arbikullakshi.com-2dd4bf?style=flat-square&logo=firefoxbrowser&logoColor=0b0d14)](https://arbikullakshi.com)
[![Email](https://img.shields.io/badge/contact-2dd4bf?style=flat-square&logo=maildotru&logoColor=0b0d14)](mailto:contact@arbikullakshi.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-74a8e8?style=flat-square&logo=linkedin&logoColor=0b0d14)](https://www.linkedin.com/in/arbi-kullakshi/)
[![ORCID](https://img.shields.io/badge/ORCID-b4a7f5?style=flat-square&logo=orcid&logoColor=0b0d14)](https://orcid.org/0009-0007-1089-1248)

</div>

## About

I am a software engineer in Tirana with **5+ years of experience** shipping production systems across SaaS, identity and authorization, search, communications, mobile applications, and delivery infrastructure.

My current focus is autonomous robotics in Rust: simulation-first systems built around asynchronous tasks, noisy sensors, state estimation, mapping, and path planning. I bring the same production discipline to robots that I bring to web platforms—clear boundaries, observable behavior, repeatable delivery, and tests where they matter.

|        Production        |       Open source       |           Robotics           |         Research         |
| :----------------------: | :---------------------: | :--------------------------: | :----------------------: |
| **6** products delivered |  **244** package tests  | **10×** real-time simulation | **5.68M** rows evaluated |
| Laravel · Django · React | ABAC · SMS integrations |    Rust · ROS 2 · Gazebo     | **540** controlled fits  |

## Production engineering

- At **Zennit**, architected a nine-module Laravel SaaS backend and identity platform with 10 external OAuth providers, passwordless login, account linking, TOTP MFA, and auditable session termination.
- At **Hire A Loo**, delivered search, lead ingestion, quoting, email, CardDAV, and migration work across 18 CRM pull requests, including an end-to-end public quotation workflow.
- Previously built and optimized production systems with **Django/PostgreSQL**, **React/TypeScript**, and **React Native** across Clickservice GmbH, Vodafone Albania, and EnRedYAte.
- Automated delivery with Docker, Traefik/Nginx, GitHub/GitLab CI, and Ansible.

## Open source

### [`zennit/abac`](https://github.com/zennit-dev/abac) · Laravel attribute-based authorization

Production-used authorization with policy constraints, middleware, caching, audit hooks, Artisan scaffolding, and **61 tests**. Controlled benchmarks evaluate mixed policies over 10,000 resources in approximately **15 ms**.

### [`laravel-notifyre-sms`](https://github.com/magic-systems-io/laravel-notifyre-sms) · Laravel SMS integration

Notification channels, direct and CLI/REST delivery, webhook status tracking, optional persistence, and **183 tests**.

## Robotics

### [`roomba`](https://github.com/somethim/roomba) · Autonomous cleaning robot

A Rust workspace with a documented **10× real-time simulation**. Five independently clocked Tokio sensor tasks feed timestamp-ordered fusion with bounded replay for delayed measurements. The robot visits reachable rooms, detects and cleans multiple dirt types, replans around obstacles, and returns to dock.

`Rust` · `Tokio` · `nalgebra` · `EKF` · `A*` · `Rerun`

### [`cave-robot`](https://github.com/somethim/cave-robot) · Autonomous cave-navigation drone

A six-crate Rust workspace spanning procedural 3D caves, navigation, shared types, pathfinding, EKF localization, and SLAM. It plans outbound on a known map while LiDAR builds the occupancy map used for its return journey through ROS 2 and Gazebo.

`Rust` · `ROS 2 / rclrs` · `Gazebo` · `LiDAR` · `SLAM` · `A* / D*`

## Research and experiments

### [`event-aware-traffic-prediction`](https://github.com/somethim/event-aware-traffic-prediction) · B.Sc. thesis

A reproducible study over **5.68 million sensor-time rows**, 164 verified concerts, and 540 controlled Random Forest and XGBoost fits. Event metadata degraded real-data predictions; controlled synthetic experiments recovered the injected effect—validating the mechanism without overstating the result.

### [`Pyramid Backstage`](https://github.com/hypernova3643725/hypernova) · JunctionX Tirana

A full-stack venue-operations platform for event intake, space matching, quotations, reservations, approvals, and task planning. Built as a typed Bun/Hono and Next.js monorepo with transactional availability, AI-assisted request processing, and interactive 3D venue exploration.

## Toolbox

**Languages**<br>
![Rust](https://img.shields.io/badge/Rust-171925?style=flat-square&logo=rust&logoColor=edf2ff)
![PHP](https://img.shields.io/badge/PHP-171925?style=flat-square&logo=php&logoColor=edf2ff)
![Python](https://img.shields.io/badge/Python-171925?style=flat-square&logo=python&logoColor=edf2ff)
![TypeScript](https://img.shields.io/badge/TypeScript-171925?style=flat-square&logo=typescript&logoColor=edf2ff)

**Systems and frameworks**<br>
![Tokio](https://img.shields.io/badge/Tokio-171925?style=flat-square&logo=rust&logoColor=2dd4bf)
![ROS 2](https://img.shields.io/badge/ROS_2-171925?style=flat-square&logo=ros&logoColor=edf2ff)
![Laravel](https://img.shields.io/badge/Laravel-171925?style=flat-square&logo=laravel&logoColor=edf2ff)
![Django](https://img.shields.io/badge/Django-171925?style=flat-square&logo=django&logoColor=edf2ff)
![React](https://img.shields.io/badge/React-171925?style=flat-square&logo=react&logoColor=edf2ff)
![Leptos](https://img.shields.io/badge/Leptos-171925?style=flat-square&logo=rust&logoColor=2dd4bf)

**Data and delivery**<br>
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-171925?style=flat-square&logo=postgresql&logoColor=edf2ff)
![Redis](https://img.shields.io/badge/Redis-171925?style=flat-square&logo=redis&logoColor=edf2ff)
![Docker](https://img.shields.io/badge/Docker-171925?style=flat-square&logo=docker&logoColor=edf2ff)
![Linux](https://img.shields.io/badge/Linux-171925?style=flat-square&logo=linux&logoColor=edf2ff)

## Current signal

- Building autonomous systems in Rust through the **Rust Live Accelerator**.
- Rebuilding this profile and personal site with **Leptos**, **Axum**, SSR, and SQLite.
- Interested in work where backend reliability meets robotics, sensing, or intelligent systems.

<details>
<summary><strong>Build this site locally</strong></summary>

```bash
rustup target add wasm32-unknown-unknown
cargo install cargo-leptos --locked
cargo leptos watch
```

```bash
cargo fmt --check
cargo clippy --all-targets --all-features -- -D warnings
cargo test
cargo leptos build --release
```

</details>

---

<div align="center">

**Albanian** · native &nbsp;·&nbsp; **English** · C2 &nbsp;·&nbsp; **German** · B1

[MIT](LICENSE) © 2026 Arbi Kullakshi

</div>
