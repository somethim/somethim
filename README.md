<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:2dd4bf,50:74a8e8,100:b4a7f5&amp;height=200&amp;section=header&amp;text=Arbi%20Kullakshi&amp;fontSize=48&amp;fontColor=0b0d14&amp;fontAlignY=34&amp;desc=Software%20Engineer%20%C2%B7%20Rust%20%26amp%3B%20Robotics%20%C2%B7%20Backend%20%26amp%3B%20Delivery%20Infrastructure&amp;descSize=15&amp;descAlignY=56" width="100%" alt="Arbi Kullakshi" />

# Arbi Kullakshi

### Software Engineer · Rust & Robotics

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&amp;size=19&amp;duration=3600&amp;pause=900&amp;color=2DD4BF&amp;center=true&amp;vCenter=true&amp;random=false&amp;width=760&amp;lines=Software+engineer+with+5%2B+years+in+production.;Backend+platforms+and+identity+systems+that+hold+up.;Autonomous+robots+in+Rust:+sensing%2C+estimation%2C+planning.;Simulation+first.+Tests+where+they+matter." alt="What I do" />

[![Website](https://img.shields.io/badge/arbikullakshi.com-2dd4bf?style=for-the-badge&logo=firefoxbrowser&logoColor=0b0d14)](https://arbikullakshi.com)
[![Email](https://img.shields.io/badge/contact-171925?style=for-the-badge&logo=maildotru&logoColor=2dd4bf)](mailto:contact@arbikullakshi.com)
[![LinkedIn](https://img.shields.io/badge/in-LinkedIn-171925?style=for-the-badge&labelColor=74a8e8)](https://www.linkedin.com/in/arbi-kullakshi/)
[![ORCID](https://img.shields.io/badge/ORCID-171925?style=for-the-badge&logo=orcid&logoColor=b4a7f5)](https://orcid.org/0009-0007-1089-1248)

</div>

<table align="center">
  <tr>
    <td align="center" width="25%">
      <b>Location</b><br/>
      Tirana, Albania <sub>(UTC+1/+2)</sub>
    </td>
    <td align="center" width="25%">
      <b>Focus</b><br/>
      Autonomous robotics in Rust
    </td>
    <td align="center" width="25%">
      <b>Day job</b><br/>
      Full Stack Engineer at <b>Zennit</b>
    </td>
    <td align="center" width="25%">
      <b>Learning</b><br/>
      <a href="https://letsgetrusty.com">Rust Live Accelerator</a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <b>Live</b><br/>
      <a href="https://arbikullakshi.com">arbikullakshi.com</a>
    </td>
    <td align="center">
      <b>Robots</b><br/>
      <a href="https://github.com/somethim/roomba">roomba</a> · <a href="https://github.com/somethim/cave-robot">cave-robot</a>
    </td>
    <td align="center">
      <b>Packages</b><br/>
      <a href="https://github.com/zennit-dev/abac">zennit/abac</a> · <a href="https://github.com/magic-systems-io/laravel-notifyre-sms">notifyre-sms</a>
    </td>
    <td align="center">
      <b>Infrastructure</b><br/>
      <a href="https://github.com/somethim/infra">one-host deployer</a>
    </td>
  </tr>
</table>

## About

I am a software engineer in Tirana with **5+ years of experience** shipping production systems across SaaS, identity and authorization, search, communications, mobile applications, and delivery infrastructure.

My current focus is autonomous robotics in Rust: simulation-first systems built around asynchronous tasks, noisy sensors, state estimation, mapping, and path planning. I bring the same production discipline to robots that I bring to web platforms — clear boundaries, observable behavior, repeatable delivery, and tests where they matter.

|        Production        |           Open source            |              Robotics             |            Research           |
| :----------------------: | :------------------------------: | :-------------------------------: | :---------------------------: |
| **6** products delivered |      **244** package tests       |    **10×** real-time simulation   |    **5.68M** rows evaluated   |
|  **12** OAuth providers  | **~15 ms** ABAC over 10k records | **5** independently clocked tasks | **540** controlled model fits |
| Laravel · Django · React |     ABAC · SMS integrations      |       Rust · ROS 2 · Gazebo       |    Random Forest · XGBoost    |

## Featured work

<table>
  <tr>
    <td colspan="3" valign="top">
      <h3 align="center"><img src="https://cdn.simpleicons.org/rust/2dd4bf" height="17" alt=""/>&nbsp; Roomba · <sub>autonomous cleaning robot</sub></h3>
      <p align="center">
        <a href="https://github.com/somethim/roomba"><img src="https://img.shields.io/badge/repo-somethim%2Froomba-2dd4bf?style=for-the-badge&amp;logo=github&amp;logoColor=0b0d14" alt="Repository"/></a>
        <img src="https://img.shields.io/badge/Rust-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=2dd4bf" alt="Rust"/>
        <img src="https://img.shields.io/badge/simulation--first-171925?style=for-the-badge" alt="Simulation first"/>
      </p>
      <p align="center">
        A <b>Rust</b> workspace with a documented <b>10× real-time simulation</b>. Five independently clocked <b>Tokio</b> sensor tasks feed
        timestamp-ordered fusion with bounded replay for delayed measurements, and LiDAR-to-wall EKF corrections are innovation-gated
        before they touch the state estimate. The robot visits every reachable room, detects and cleans multiple dirt types,
        replans around obstacles it discovers, and returns to dock on its own.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/timestamp--ordered_fusion-0f1117?style=flat-square" alt="Timestamp-ordered fusion"/>
        <img src="https://img.shields.io/badge/bounded_replay-0f1117?style=flat-square" alt="Bounded replay"/>
        <img src="https://img.shields.io/badge/innovation_gating-0f1117?style=flat-square" alt="Innovation gating"/>
        <img src="https://img.shields.io/badge/clearance--aware_A*-0f1117?style=flat-square" alt="Clearance-aware A*"/>
        <img src="https://img.shields.io/badge/occupancy_grid-0f1117?style=flat-square" alt="Occupancy grid"/>
        <img src="https://img.shields.io/badge/multi--dirt_cleaning-0f1117?style=flat-square" alt="Multi-dirt cleaning"/>
        <img src="https://img.shields.io/badge/return_to_dock-0f1117?style=flat-square" alt="Return to dock"/>
        <br/>
        <img src="https://img.shields.io/badge/Tokio-171925?style=flat-square&amp;logo=rust&amp;logoColor=2dd4bf" alt="Tokio"/>
        <img src="https://img.shields.io/badge/async--trait-171925?style=flat-square&amp;logo=rust&amp;logoColor=2dd4bf" alt="async-trait"/>
        <img src="https://img.shields.io/badge/nalgebra-171925?style=flat-square&amp;logo=rust&amp;logoColor=2dd4bf" alt="nalgebra"/>
        <img src="https://img.shields.io/badge/Rerun-171925?style=flat-square&amp;logo=rust&amp;logoColor=2dd4bf" alt="Rerun"/>
        <img src="https://img.shields.io/badge/EKF-171925?style=flat-square" alt="EKF"/>
        <img src="https://img.shields.io/badge/encoder_%C2%B7_IMU_%C2%B7_beacon_%C2%B7_LiDAR-171925?style=flat-square" alt="Sensors"/>
      </p>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3 align="center"><img src="https://cdn.simpleicons.org/ros/74a8e8" height="17" alt=""/>&nbsp; cave-robot</h3>
      <p align="center">
        <a href="https://github.com/somethim/cave-robot"><img src="https://img.shields.io/badge/repo-cave--robot-2dd4bf?style=flat-square&amp;logo=github&amp;logoColor=0b0d14" alt="Repository"/></a>
      </p>
      <p align="center">
        An autonomous cave-navigation drone as a six-crate <b>Rust</b> workspace: procedural 3D voxel caves, navigation, shared types,
        pathfinding, EKF localization, and SLAM. It plans a clearance-weighted outbound route on the known map while LiDAR builds
        the occupancy map used for the return journey, talking to ROS 2 and Gazebo over <b>Serde</b> scan and command messages.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/Rust-171925?style=flat-square&amp;logo=rust&amp;logoColor=2dd4bf" alt="Rust"/>
        <img src="https://img.shields.io/badge/ROS_2_/_rclrs-171925?style=flat-square&amp;logo=ros&amp;logoColor=74a8e8" alt="ROS 2"/>
        <img src="https://img.shields.io/badge/Gazebo-171925?style=flat-square" alt="Gazebo"/>
        <img src="https://img.shields.io/badge/SLAM-171925?style=flat-square" alt="SLAM"/>
        <img src="https://img.shields.io/badge/LiDAR-171925?style=flat-square" alt="LiDAR"/>
      </p>
    </td>
    <td width="33%" valign="top">
      <h3 align="center"><img src="https://cdn.simpleicons.org/leptos/2dd4bf" height="17" alt=""/>&nbsp; arbikullakshi.com</h3>
      <p align="center">
        <a href="https://arbikullakshi.com"><img src="https://img.shields.io/badge/live-arbikullakshi.com-2dd4bf?style=flat-square&amp;logo=firefoxbrowser&amp;logoColor=0b0d14" alt="Live"/></a>
      </p>
      <p align="center">
        A server-rendered portfolio platform running as a seven-crate <b>Rust</b> workspace: a public front end plus a
        passkey-authenticated admin surface over <b>Axum</b> and PostgreSQL. Memory safety and panic discipline are enforced
        workspace-wide with <code>unsafe_code = "forbid"</code>, clippy pedantic and nursery gates, and <b>286 tests</b>,
        shipped as size-optimized WASM through Docker and GitHub CI.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/Leptos_0.8-171925?style=flat-square&amp;logo=rust&amp;logoColor=2dd4bf" alt="Leptos"/>
        <img src="https://img.shields.io/badge/Axum-171925?style=flat-square&amp;logo=rust&amp;logoColor=2dd4bf" alt="Axum"/>
        <img src="https://img.shields.io/badge/sqlx_/_PostgreSQL-171925?style=flat-square&amp;logo=postgresql&amp;logoColor=74a8e8" alt="sqlx and PostgreSQL"/>
        <img src="https://img.shields.io/badge/WebAuthn-171925?style=flat-square&amp;logo=webauthn&amp;logoColor=b4a7f5" alt="WebAuthn"/>
        <img src="https://img.shields.io/badge/WebAssembly-171925?style=flat-square&amp;logo=webassembly&amp;logoColor=b4a7f5" alt="WebAssembly"/>
      </p>
    </td>
    <td width="33%" valign="top">
      <h3 align="center"><img src="https://cdn.simpleicons.org/scikitlearn/74a8e8" height="17" alt=""/>&nbsp; event-aware-traffic-prediction</h3>
      <p align="center">
        <a href="https://github.com/somethim/event-aware-traffic-prediction"><img src="https://img.shields.io/badge/repo-B.Sc._thesis-2dd4bf?style=flat-square&amp;logo=github&amp;logoColor=0b0d14" alt="Repository"/></a>
      </p>
      <p align="center">
        A reproducible study over <b>5.68 million</b> sensor-time rows, 164 verified concerts, and <b>540</b> controlled Random Forest
        and XGBoost fits with validation gates, placebo tests, bootstrap confidence intervals, and provenance tracking.
        Event metadata degraded real-data predictions; synthetic experiments recovered the injected effect — the mechanism holds,
        the result is reported negative rather than dressed up.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/Python-171925?style=flat-square&amp;logo=python&amp;logoColor=edf2ff" alt="Python"/>
        <img src="https://img.shields.io/badge/scikit--learn-171925?style=flat-square&amp;logo=scikitlearn&amp;logoColor=74a8e8" alt="scikit-learn"/>
        <img src="https://img.shields.io/badge/XGBoost-171925?style=flat-square" alt="XGBoost"/>
        <img src="https://img.shields.io/badge/Caltrans_PeMS-171925?style=flat-square" alt="Caltrans PeMS"/>
      </p>
    </td>
  </tr>
  <tr>
    <td width="33%" valign="top">
      <h3 align="center"><img src="https://cdn.simpleicons.org/laravel/b4a7f5" height="17" alt=""/>&nbsp; zennit/abac</h3>
      <p align="center">
        <a href="https://github.com/zennit-dev/abac"><img src="https://img.shields.io/badge/repo-zennit%2Fabac-2dd4bf?style=flat-square&amp;logo=github&amp;logoColor=0b0d14" alt="Repository"/></a>
      </p>
      <p align="center">
        Attribute-based authorization for Laravel, used in production: policy constraints, middleware, caching, audit hooks,
        and Artisan scaffolding behind <b>61 tests</b>. Controlled benchmarks evaluate mixed policies over 10,000 resources
        in approximately <b>15 ms</b>.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/PHP-171925?style=flat-square&amp;logo=php&amp;logoColor=b4a7f5" alt="PHP"/>
        <img src="https://img.shields.io/badge/Laravel_13-171925?style=flat-square&amp;logo=laravel&amp;logoColor=edf2ff" alt="Laravel"/>
        <img src="https://img.shields.io/badge/61_tests-0f1117?style=flat-square" alt="61 tests"/>
      </p>
    </td>
    <td width="33%" valign="top">
      <h3 align="center"><img src="https://cdn.simpleicons.org/php/b4a7f5" height="17" alt=""/>&nbsp; laravel-notifyre-sms</h3>
      <p align="center">
        <a href="https://github.com/magic-systems-io/laravel-notifyre-sms"><img src="https://img.shields.io/badge/repo-notifyre--sms-2dd4bf?style=flat-square&amp;logo=github&amp;logoColor=0b0d14" alt="Repository"/></a>
      </p>
      <p align="center">
        A Notifyre SMS integration for Laravel with notification-channel and direct delivery, CLI and REST interfaces,
        webhook status tracking, optional persistence, and a <b>183-test</b> suite.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/PHP-171925?style=flat-square&amp;logo=php&amp;logoColor=b4a7f5" alt="PHP"/>
        <img src="https://img.shields.io/badge/Laravel-171925?style=flat-square&amp;logo=laravel&amp;logoColor=edf2ff" alt="Laravel"/>
        <img src="https://img.shields.io/badge/183_tests-0f1117?style=flat-square" alt="183 tests"/>
      </p>
    </td>
    <td width="33%" valign="top">
      <h3 align="center"><img src="https://cdn.simpleicons.org/bun/2dd4bf" height="17" alt=""/>&nbsp; Pyramid Backstage</h3>
      <p align="center">
        <a href="https://github.com/hypernova3643725/hypernova"><img src="https://img.shields.io/badge/repo-JunctionX_Tirana-2dd4bf?style=flat-square&amp;logo=github&amp;logoColor=0b0d14" alt="Repository"/></a>
      </p>
      <p align="center">
        A venue-operations platform built at JunctionX Tirana, unifying event intake, space matching, quotations, reservations,
        approvals, and task planning as a typed monorepo with transactional availability checks, AI-assisted request processing,
        and interactive 3D venue exploration.
      </p>
      <p align="center">
        <img src="https://img.shields.io/badge/TypeScript-171925?style=flat-square&amp;logo=typescript&amp;logoColor=74a8e8" alt="TypeScript"/>
        <img src="https://img.shields.io/badge/Bun_/_Hono-171925?style=flat-square&amp;logo=bun&amp;logoColor=edf2ff" alt="Bun and Hono"/>
        <img src="https://img.shields.io/badge/Next.js-171925?style=flat-square&amp;logo=nextdotjs&amp;logoColor=edf2ff" alt="Next.js"/>
        <img src="https://img.shields.io/badge/Drizzle-171925?style=flat-square&amp;logo=drizzle&amp;logoColor=2dd4bf" alt="Drizzle"/>
        <img src="https://img.shields.io/badge/React_Three_Fiber-171925?style=flat-square&amp;logo=threedotjs&amp;logoColor=edf2ff" alt="React Three Fiber"/>
      </p>
    </td>
  </tr>
</table>

## Experience

<table>
  <tr>
    <td valign="top" width="30%">
      <b>Zennit</b><br/>
      <sub>Full Stack Engineer</sub><br/>
      <sub><b>Jan 2024 – Present</b></sub>
    </td>
    <td valign="top">
      Architected a ten-module Laravel SaaS backend and identity platform with 12 external OAuth providers, passwordless login,
      account linking, TOTP MFA, and auditable session termination, modelling credentials separately from identity.
      Shipped <a href="https://github.com/zennit-dev/abac">zennit/abac</a> as the production authorization layer, the server half of an
      offline sync protocol behind a single reconciliation endpoint, real-time collaboration over WebSockets, and an AI assistant
      exposing tools through an <b>MCP</b> server. Owned backend, frontend, and deployment across six products.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <b>Hire A Loo</b><br/>
      <sub>Backend Developer · Contract</sub><br/>
      <sub><b>Aug 2025 – Jun 2026</b></sub>
    </td>
    <td valign="top">
      Shipped 18 CRM pull requests across search, web-lead ingestion, price quoting, email templating, CardDAV contacts, legacy
      migrations, and shared application infrastructure. Built a Typesense-powered global search with debounced queries, category
      pagination, and persistent URL state, plus an end-to-end quote workflow with automatic status transitions, sanitized email
      templates, and public accept/reject flows. Published
      <a href="https://github.com/magic-systems-io/laravel-notifyre-sms">laravel-notifyre-sms</a> out of that work.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <b>Clickservice GmbH</b><br/>
      <sub>Full Stack Developer</sub><br/>
      <sub><b>Jan 2023 – Jan 2024</b></sub>
    </td>
    <td valign="top">
      Optimized Django and PostgreSQL services, dropping to targeted raw SQL where ORM-generated queries were inefficient,
      and delivered third-party integrations, automated reporting, and React/TypeScript interfaces for production workflows.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <b>Vodafone Albania</b><br/>
      <sub>Mobile Developer</sub><br/>
      <sub><b>Jan 2022 – Dec 2022</b></sub>
    </td>
    <td valign="top">
      Shipped cross-platform React Native features to production iOS and Android applications, integrating REST APIs,
      WebSockets, and authentication, and extending automated release workflows.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <b>EnRedYAte</b><br/>
      <sub>Junior Frontend Developer</sub><br/>
      <sub><b>Jan 2021 – Dec 2021</b></sub>
    </td>
    <td valign="top">
      Translated product and design requirements into responsive React and WordPress interfaces, maintained production
      applications, and reviewed peer code alongside designers.
    </td>
  </tr>
</table>

## Toolbox

<div align="center">

**Languages**<br/>
<img src="https://img.shields.io/badge/Rust-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="Rust"/>
<img src="https://img.shields.io/badge/PHP-171925?style=for-the-badge&amp;logo=php&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="PHP"/>
<img src="https://img.shields.io/badge/Python-171925?style=for-the-badge&amp;logo=python&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="Python"/>
<img src="https://img.shields.io/badge/TypeScript-171925?style=for-the-badge&amp;logo=typescript&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="TypeScript"/>
<img src="https://img.shields.io/badge/SQL-171925?style=for-the-badge&amp;logo=postgresql&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="SQL"/>

**Robotics and Rust**<br/>
<img src="https://img.shields.io/badge/Tokio-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=0b0d14&amp;labelColor=74a8e8" alt="Tokio"/>
<img src="https://img.shields.io/badge/Serde-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=0b0d14&amp;labelColor=74a8e8" alt="Serde"/>
<img src="https://img.shields.io/badge/nalgebra-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=0b0d14&amp;labelColor=74a8e8" alt="nalgebra"/>
<img src="https://img.shields.io/badge/Leptos-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=0b0d14&amp;labelColor=74a8e8" alt="Leptos"/>
<img src="https://img.shields.io/badge/ROS_2_/_Gazebo-171925?style=for-the-badge&amp;logo=ros&amp;logoColor=0b0d14&amp;labelColor=74a8e8" alt="ROS 2 and Gazebo"/>
<img src="https://img.shields.io/badge/SLAM_%C2%B7_EKF_%C2%B7_A*-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=0b0d14&amp;labelColor=74a8e8" alt="SLAM, EKF, A*"/>
<img src="https://img.shields.io/badge/Rerun-171925?style=for-the-badge&amp;logo=rust&amp;logoColor=0b0d14&amp;labelColor=74a8e8" alt="Rerun"/>

**Web and data**<br/>
<img src="https://img.shields.io/badge/Laravel-171925?style=for-the-badge&amp;logo=laravel&amp;logoColor=0b0d14&amp;labelColor=b4a7f5" alt="Laravel"/>
<img src="https://img.shields.io/badge/Django-171925?style=for-the-badge&amp;logo=django&amp;logoColor=0b0d14&amp;labelColor=b4a7f5" alt="Django"/>
<img src="https://img.shields.io/badge/React_/_Next.js-171925?style=for-the-badge&amp;logo=react&amp;logoColor=0b0d14&amp;labelColor=b4a7f5" alt="React and Next.js"/>
<img src="https://img.shields.io/badge/React_Native-171925?style=for-the-badge&amp;logo=expo&amp;logoColor=0b0d14&amp;labelColor=b4a7f5" alt="React Native"/>
<img src="https://img.shields.io/badge/PostgreSQL-171925?style=for-the-badge&amp;logo=postgresql&amp;logoColor=0b0d14&amp;labelColor=b4a7f5" alt="PostgreSQL"/>
<img src="https://img.shields.io/badge/Redis-171925?style=for-the-badge&amp;logo=redis&amp;logoColor=0b0d14&amp;labelColor=b4a7f5" alt="Redis"/>
<img src="https://img.shields.io/badge/Typesense-171925?style=for-the-badge&amp;labelColor=b4a7f5" alt="Typesense"/>
<img src="https://img.shields.io/badge/scikit--learn_%C2%B7_XGBoost-171925?style=for-the-badge&amp;logo=scikitlearn&amp;logoColor=0b0d14&amp;labelColor=b4a7f5" alt="scikit-learn and XGBoost"/>

**Delivery**<br/>
<img src="https://img.shields.io/badge/Docker-171925?style=for-the-badge&amp;logo=docker&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="Docker"/>
<img src="https://img.shields.io/badge/Traefik_/_Nginx-171925?style=for-the-badge&amp;logo=traefikproxy&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="Traefik and Nginx"/>
<img src="https://img.shields.io/badge/GitHub_Actions-171925?style=for-the-badge&amp;logo=githubactions&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="GitHub Actions"/>
<img src="https://img.shields.io/badge/GitLab_CI-171925?style=for-the-badge&amp;logo=gitlab&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="GitLab CI"/>
<img src="https://img.shields.io/badge/Ansible-171925?style=for-the-badge&amp;logo=ansible&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="Ansible"/>
<img src="https://img.shields.io/badge/Linux-171925?style=for-the-badge&amp;logo=linux&amp;logoColor=0b0d14&amp;labelColor=2dd4bf" alt="Linux"/>

</div>

## GitHub

<div align="center">

<img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=somethim&amp;theme=github_dark" width="700" alt="Profile summary"/>

<img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=somethim&amp;theme=github_dark" height="200" alt="Repositories per language"/>
<img src="https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=somethim&amp;theme=github_dark" height="200" alt="Most committed languages"/>

<img src="https://streak-stats.demolab.com/?user=somethim&amp;hide_border=true&amp;border_radius=12&amp;background=0b0d14&amp;ring=2dd4bf&amp;fire=74a8e8&amp;currStreakNum=edf2ff&amp;sideNums=edf2ff&amp;currStreakLabel=2dd4bf&amp;sideLabels=c8d3f5&amp;dates=8b93b0&amp;stroke=2dd4bf" width="700" alt="Contribution streak"/>

</div>

## Education and training

<table>
  <tr>
    <td valign="top" width="30%">
      <b>Let's Get Rusty LLC</b><br/>
      <sub>Rust Live Accelerator · Virtual</sub><br/>
      <sub><b>In progress · 2026</b></sub>
    </td>
    <td valign="top">
      A live advanced Rust program with a 100+ hour curriculum covering language features, design patterns, asynchronous
      services, persistence, embedded systems, and production delivery. <a href="https://github.com/somethim/roomba">roomba</a>
      is the project I am building through it.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <b>European University of Tirana</b><br/>
      <sub>B.Sc. Informatics Engineering</sub><br/>
      <sub><b>2026</b></sub>
    </td>
    <td valign="top">
      Thesis: <a href="https://github.com/somethim/event-aware-traffic-prediction">Event-Aware Traffic Prediction</a>.
    </td>
  </tr>
  <tr>
    <td valign="top">
      <b>Hermann Gmeiner High School</b><br/>
      <sub>ICT Vocational Degree</sub><br/>
      <sub><b>2023</b></sub>
    </td>
    <td valign="top">
      Vocational track in information and communication technology.
    </td>
  </tr>
</table>

## Current signal

- Building autonomous systems in Rust through the **Rust Live Accelerator**, with `roomba` as the running project.
- Operating my own single-deployer infrastructure: one Hetzner host, Traefik at the edge, GHCR images, Watchtower rollouts.
- Open to work where backend reliability meets robotics, sensing, or intelligent systems.

<details>
<summary><b>Also on my GitHub</b></summary>

<br/>

<table>
  <tr>
    <td valign="top" width="22%"><a href="https://github.com/somethim/infra"><code>infra</code></a></td>
    <td valign="top">The one repo that touches the server: provisions the shared Hetzner host, runs the edge Traefik proxy, and deploys every stack. Application repos are build-only and push images to GHCR.</td>
  </tr>
  <tr>
    <td valign="top" width="22%"><a href="https://github.com/somethim/lantern-ap"><code>lantern-ap</code></a></td>
    <td valign="top">A Rust hotspot TUI and daemon (<code>hotspot-tui</code>, <code>hotspotd</code>) with Waybar and Hyprland integration for Omarchy.</td>
  </tr>
  <tr>
    <td valign="top" width="22%"><a href="https://github.com/somethim/update-notifier"><code>update-notifier</code></a></td>
    <td valign="top">A small C applet that checks Homebrew, DNF, Flatpak, and Snap for pending updates and reports them through Zenity.</td>
  </tr>
  <tr>
    <td valign="top" width="22%"><a href="https://github.com/somethim/nvim"><code>nvim</code></a></td>
    <td valign="top">My Neovim configuration on LazyVim, themed from Omarchy with system-wide hot reload.</td>
  </tr>
</table>

</details>

---

<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/somethim/somethim/output/github-snake-dark.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/somethim/somethim/output/github-snake.svg">
  <img src="https://raw.githubusercontent.com/somethim/somethim/output/github-snake.svg" alt="Contribution grid snake animation">
</picture>

<img src="https://capsule-render.vercel.app/api?type=waving&amp;color=0:b4a7f5,50:74a8e8,100:2dd4bf&amp;height=120&amp;section=footer" width="100%" alt=""/>

**Albanian** · native &nbsp;·&nbsp; **English** · C2 &nbsp;·&nbsp; **German** · B1

[MIT](LICENSE) © 2026 Arbi Kullakshi

</div>
