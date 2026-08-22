import { PROJECTS } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

const ProjectCard = ({ project }: { project: (typeof PROJECTS)[number] }) => (
  <article className={`project-card project-${project.kind}`}>
    <div className="project-topline">
      <p>{project.category}</p>
      <span>2026</span>
    </div>
    <h3>{project.title}</h3>
    <p className="project-subtitle">{project.subtitle}</p>
    {project.description.map((description) => (
      <p key={description}>{description}</p>
    ))}
    {"facts" in project ? (
      <dl className="project-facts">
        {project.facts.map(([term, detail]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    ) : null}
    <div className="project-actions">
      {project.links.map((link, index) => (
        <a
          className={
            index > 0 ? "project-link project-link-secondary" : "project-link"
          }
          href={link.href}
          key={link.href}
        >
          {link.label} <span aria-hidden="true">↗</span>
        </a>
      ))}
    </div>
  </article>
);

export const Projects = () => (
  <section className="section" id="work" aria-labelledby="work-title">
    <SectionHeading
      index="02"
      label="Selected work"
      title="Systems that sense, decide, and deliver."
      description="Robotics, applied research, and product infrastructure—each presented with the engineering evidence behind it."
      titleId="work-title"
    />

    <div className="project-grid">
      {PROJECTS.map((project) => (
        <ProjectCard project={project} key={project.title} />
      ))}
    </div>

    <article className="demo" aria-labelledby="demo-title">
      <div className="demo-heading">
        <div>
          <p className="project-topline">Engineering demonstration</p>
          <h3 id="demo-title">Roomba simulation telemetry</h3>
        </div>
        <p id="demo-description">
          The robot builds an occupancy grid, fuses delayed sensor measurements,
          plans clearance-aware routes, cleans detected dirt, and returns to its
          dock. Playback is user-controlled and the video is not loaded with the
          page.
        </p>
      </div>
      <video
        controls
        preload="none"
        poster="/assets/roomba-simulation-poster.webp"
        width="1280"
        height="800"
        aria-describedby="demo-description"
      >
        <source src="/assets/roomba-simulation-demo.web.mp4" type="video/mp4" />
        <track
          default
          kind="captions"
          src="/assets/roomba-simulation-captions.vtt"
          srcLang="en"
          label="English descriptions"
        />
        Your browser cannot play this video. View the demonstration in the
        Roomba repository.
      </video>
      <div className="demo-legend">
        <span>
          <i className="legend-teal" aria-hidden="true" /> Planned and traversed
          paths
        </span>
        <span>
          <i className="legend-lavender" aria-hidden="true" /> Detected
          obstacles
        </span>
        <span>
          <i className="legend-warm" aria-hidden="true" /> Localization error
          telemetry
        </span>
      </div>
    </article>
  </section>
);
