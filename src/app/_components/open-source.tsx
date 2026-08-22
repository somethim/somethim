import { SectionHeading } from "./section-heading";

export const OpenSource = () => (
  <section
    className="section"
    id="open-source"
    aria-labelledby="open-source-title"
  >
    <SectionHeading
      index="03"
      label="Open source"
      title="Reusable infrastructure, tested in public."
      description="Packages extracted from production needs and maintained as focused, documented components."
      titleId="open-source-title"
    />

    <div className="open-source-grid">
      <article className="open-source-card">
        <div>
          <p className="project-topline">Authorization · Laravel 13</p>
          <h3>zennit/abac</h3>
          <p>
            Attribute-based access control with policy constraints, middleware,
            caching, audit hooks, Artisan scaffolding, and query-level resource
            scoping.
          </p>
        </div>
        <div>
          <p className="package-metric">
            <strong>61</strong> tests
          </p>
          <p className="package-metric">
            <strong>~15 ms</strong> / 10k resources
          </p>
          <a className="project-link" href="https://github.com/zennit-dev/abac">
            Repository <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>

      <article className="open-source-card">
        <div>
          <p className="project-topline">Messaging · Laravel</p>
          <h3>laravel-notifyre-sms</h3>
          <p>
            Notifyre integration with direct and notification-channel delivery,
            CLI and REST interfaces, webhooks, status tracking, and optional
            persistence.
          </p>
        </div>
        <div>
          <p className="package-metric">
            <strong>183</strong> tests
          </p>
          <p className="package-metric">
            <strong>2</strong> delivery interfaces
          </p>
          <a
            className="project-link"
            href="https://github.com/magic-systems-io/laravel-notifyre-sms"
          >
            Repository <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </div>
  </section>
);
