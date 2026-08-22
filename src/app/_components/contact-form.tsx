"use client";

import { useActionState } from "react";
import { type ContactState, sendContactMessage } from "../actions";

const initialState: ContactState = {
  status: "idle",
  message: "",
};

const getError = (
  state: ContactState,
  field: "name" | "email" | "company" | "message",
): string | undefined => state.errors?.[field]?.[0];

export const ContactForm = () => {
  const [state, action, pending] = useActionState(
    sendContactMessage,
    initialState,
  );

  return (
    <form className="contact-form" action={action}>
      <div className="form-heading">
        <p className="project-topline">Direct message</p>
        <h3>Tell me what you are building.</h3>
        <p>
          Architecture problem, product build, robotics system, or an unusual
          technical challenge—send enough context to make the first reply
          useful.
        </p>
      </div>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            disabled={pending}
            required
            minLength={2}
            maxLength={80}
            aria-invalid={Boolean(getError(state, "name"))}
            aria-describedby={
              getError(state, "name") ? "name-error" : undefined
            }
          />
          {getError(state, "name") ? (
            <p className="field-error" id="name-error">
              Enter your name.
            </p>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            disabled={pending}
            required
            maxLength={254}
            aria-invalid={Boolean(getError(state, "email"))}
            aria-describedby={
              getError(state, "email") ? "email-error" : undefined
            }
          />
          {getError(state, "email") ? (
            <p className="field-error" id="email-error">
              Enter a valid email address.
            </p>
          ) : null}
        </div>

        <div className="field form-span">
          <label htmlFor="company">
            Company or project <span>Optional</span>
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            disabled={pending}
            maxLength={100}
            aria-invalid={Boolean(getError(state, "company"))}
          />
        </div>

        <div className="field form-span">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows={7}
            disabled={pending}
            required
            minLength={20}
            maxLength={5_000}
            placeholder="What are you working on, and where could I help?"
            aria-invalid={Boolean(getError(state, "message"))}
            aria-describedby={
              getError(state, "message") ? "message-error" : "message-help"
            }
          />
          <p className="field-help" id="message-help">
            20–5,000 characters. Sent securely through Resend.
          </p>
          {getError(state, "message") ? (
            <p className="field-error" id="message-error">
              Add at least 20 characters of context.
            </p>
          ) : null}
        </div>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <div className="form-footer">
        <p
          className={`form-status form-status-${state.status}`}
          aria-live="polite"
        >
          {state.message || "I usually respond within two working days."}
        </p>
        <button
          className="button button-primary"
          type="submit"
          disabled={pending}
        >
          {pending ? "Sending…" : "Send message"}{" "}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
};
