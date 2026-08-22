import { Capabilities } from "./_components/capabilities";
import { Contact } from "./_components/contact";
import { Experience } from "./_components/experience";
import { OpenSource } from "./_components/open-source";
import { Projects } from "./_components/projects";

const profile = [
  ["Experience", "5+ years"],
  ["Focus", "Systems & autonomy"],
  ["Core languages", "Rust · PHP · Python · TypeScript"],
  ["Delivery", "Code → infrastructure"],
] as const;

const evidence = [
  ["9", "Laravel platform modules"],
  ["10", "External OAuth providers"],
  ["10×", "Real-time robot simulation"],
  ["5.68M", "Research rows evaluated"],
] as const;

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a
          className="wordmark"
          href="#top"
          aria-label="Arbi Kullakshi, back to top"
        >
          <span className="wordmark-mark" aria-hidden="true">
            AK
          </span>
          <span>Arbi Kullakshi</span>
        </a>
        <nav className="site-nav" aria-label="Primary navigation">
          <a href="#experience">Experience</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
          <a
            href="https://legacy.arbikullakshi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Legacy
          </a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="intro-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" aria-hidden="true" /> Tirana, Albania
            </p>
            <h1 id="intro-title">
              Software Engineer
              <span className="hero-title-detail">
                Systems, Full Stack &amp; Robotics
              </span>
            </h1>
            <p className="hero-summary">
              I build backend systems, security platforms, delivery
              infrastructure, and autonomous robots. My work moves from
              architecture and implementation through testing, deployment, and
              operation.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">
                Start a conversation <span aria-hidden="true">↘</span>
              </a>
              <a className="button" href="/assets/arbi-kullakshi-cv.pdf">
                Download CV <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-link"
                href="https://github.com/somethim"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/arbi-kullakshi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="profile-card" aria-label="Engineering profile">
            <p className="profile-label">Engineering profile</p>
            <dl className="profile-grid">
              {profile.map(([term, detail]) => (
                <div key={term}>
                  <dt>{term}</dt>
                  <dd>{detail}</dd>
                </div>
              ))}
            </dl>
            <div className="profile-signal" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </aside>
        </section>

        <section
          className="evidence"
          aria-label="Selected engineering evidence"
        >
          {evidence.map(([metric, label]) => (
            <div key={label}>
              <strong>{metric}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <Experience />
        <Projects />
        <OpenSource />
        <Capabilities />
        <Contact />
      </main>

      <footer className="site-footer">
        <p>Arbi Kullakshi · Software Engineer</p>
        <div className="footer-links">
          <a
            href="https://github.com/somethim"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://www.linkedin.com/in/arbi-kullakshi/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://legacy.arbikullakshi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Previous portfolio <span aria-hidden="true">↗</span>
          </a>
          <span>Server-rendered · No tracking</span>
        </div>
      </footer>
    </>
  );
}
