import { EXPERIENCE } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

export const Experience = () => (
  <section
    className="section"
    id="experience"
    aria-labelledby="experience-title"
  >
    <SectionHeading
      index="01"
      label="Experience"
      title="Production systems, shipped end to end."
      description="Five years across platform engineering, backend architecture, product delivery, mobile, and infrastructure."
      titleId="experience-title"
    />

    <div className="timeline">
      {EXPERIENCE.map((experience) => (
        <article className="timeline-item" key={experience.company}>
          <div className="timeline-meta">
            <p className="timeline-period">{experience.period}</p>
            {"type" in experience ? (
              <p className="timeline-type">{experience.type}</p>
            ) : null}
          </div>
          <div className="timeline-content">
            <p className="company">{experience.company}</p>
            <h3>{experience.role}</h3>
            {experience.summary.map((summary) => (
              <p key={summary}>{summary}</p>
            ))}
            {"technologies" in experience ? (
              <ul
                className="tag-list"
                aria-label={`${experience.company} technologies`}
              >
                {experience.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  </section>
);
