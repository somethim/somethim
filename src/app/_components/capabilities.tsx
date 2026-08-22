import { CAPABILITIES, CREDENTIALS } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";

export const Capabilities = () => (
  <>
    <section
      className="section capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <SectionHeading
        index="04"
        label="Capabilities"
        title="Across the system boundary."
        description="From sensor inputs and state estimation to authenticated APIs, data stores, interfaces, containers, and delivery automation."
        titleId="capabilities-title"
      />

      <div className="capability-grid">
        {CAPABILITIES.map((capability, index) => (
          <article key={capability.title}>
            <p>{String(index + 1).padStart(2, "0")}</p>
            <h3>{capability.title}</h3>
            <ul>
              {capability.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section
      className="section credentials"
      id="credentials"
      aria-labelledby="credentials-title"
    >
      <SectionHeading
        index="05"
        label="Education"
        title="Formal foundations, active practice."
        titleId="credentials-title"
      />

      <div className="credentials-grid">
        {CREDENTIALS.map((credential) => (
          <article key={credential.title}>
            <p className="credential-year">{credential.year}</p>
            <h3>{credential.title}</h3>
            <p>{credential.institution}</p>
            <span>{credential.detail}</span>
          </article>
        ))}
      </div>
    </section>
  </>
);
