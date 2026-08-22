import { ContactForm } from "./contact-form";

export const Contact = () => (
  <section className="contact" id="contact" aria-labelledby="contact-title">
    <div className="contact-intro">
      <p className="section-index">06 / Contact</p>
      <h2 id="contact-title">Let’s make the difficult part work.</h2>
      <p>
        Send the technical context directly, or reserve a focused introduction
        call if a conversation will get there faster.
      </p>
    </div>

    <div className="contact-layout">
      <ContactForm />

      <aside className="booking-card" aria-labelledby="booking-title">
        <div>
          <p className="project-topline">Calendar / Cal.com</p>
          <h3 id="booking-title">Book an introduction</h3>
          <p>
            A focused 30-minute call for roles, projects, architecture
            questions, or collaboration ideas.
          </p>
        </div>
        <dl className="booking-details">
          <div>
            <dt>Length</dt>
            <dd>30 minutes</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>Video call</dd>
          </div>
          <div>
            <dt>Timezone</dt>
            <dd>Shown locally</dd>
          </div>
        </dl>
        <a
          className="button booking-button"
          href="https://cal.com/arbikullakshi/intro"
          target="_blank"
          rel="noopener noreferrer"
        >
          View available times <span aria-hidden="true">↗</span>
        </a>
        <p className="booking-note">
          Scheduling opens on Cal.com only after you choose a time—no
          third-party calendar scripts are loaded here.
        </p>
      </aside>
    </div>

    <div className="direct-contact">
      <span>Prefer your own mail client?</span>
      <a href="mailto:contact@arbikullakshi.com">
        contact@arbikullakshi.com <span aria-hidden="true">↗</span>
      </a>
    </div>
  </section>
);
