use leptos::prelude::*;

use crate::components::TypedText;
use leptos_icons::Icon;
use leptos_meta::Title;

use crate::constants::{page_title, CAL_URL, EMAIL, EMAIL_LINK, GITHUB_URL, LINKEDIN_URL};

#[component]
fn EmailDialog(dialog_ref: NodeRef<leptos::html::Dialog>) -> impl IntoView {
    let close_dialog = move |_| {
        if let Some(dialog) = dialog_ref.get() {
            dialog.close();
        }
    };

    view! {
        <dialog
            node_ref=dialog_ref
            class="email-dialog"
            aria-labelledby="email-dialog-title"
            on:cancel=close_dialog
            on:click=move |event| {
                if event.target() == event.current_target() {
                    close_dialog(event);
                }
            }
        >
            <div class="email-dialog-inner">
                <div class="email-dialog-head">
                    <div>
                        <p class="section-index">"Direct message / Resend"</p>
                        <h2 id="email-dialog-title">"New message"</h2>
                    </div>
                    <button
                        type="button"
                        class="email-dialog-close"
                        aria-label="Close"
                        on:click=close_dialog
                    >
                        "✕"
                    </button>
                </div>
                <div class="field">
                    <label for="email-name">"Name"</label>
                    <input id="email-name" name="name" autocomplete="name" />
                </div>
                <div class="field">
                    <label for="email-from">"Your email"</label>
                    <input
                        id="email-from"
                        name="email"
                        type="email"
                        autocomplete="email"
                        required
                    />
                </div>
                <div class="field">
                    <label for="email-message">"Message"</label>
                    <textarea
                        id="email-message"
                        name="message"
                        required
                        placeholder="Technical context welcome — stack, problem, timeline."
                    />
                </div>
                <div class="email-dialog-footer">
                    <p class="form-status">"Delivered through Resend — no mail client needed."</p>
                    <button type="button" class="button-primary">
                        "Send message ↘"
                    </button>
                </div>
            </div>
        </dialog>
    }
}

#[component]
pub fn ContactPage() -> impl IntoView {
    let dialog_ref = NodeRef::<leptos::html::Dialog>::new();
    let open_dialog = move |_| {
        if let Some(dialog) = dialog_ref.get() {
            let _ = dialog.show_modal();
        }
    };

    view! {
        <Title text=page_title("contact") />
        <div class="contacts-container">
            <div class="page-heading">
                <p class="section-index">"06 / Contact"</p>
                <h1 class="page-title page-title-path">
                    <TypedText text="~/contact" />
                    <span class="title-cursor" />
                </h1>
            </div>
            <div class="contacts-list">
                <a class="contact-button" href=GITHUB_URL target="_blank" rel="noopener noreferrer">
                    <Icon icon=icondata::LuGithub width="22" height="22" />
                    <span class="contact-label">
                        "GitHub"<span class="contact-sub">"github.com/somethim"</span>
                    </span>
                </a>
                <a
                    class="contact-button"
                    href=LINKEDIN_URL
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon icon=icondata::LuLinkedin width="22" height="22" />
                    <span class="contact-label">
                        "LinkedIn"<span class="contact-sub">"in/arbi-kullakshi"</span>
                    </span>
                </a>
                <button class="contact-button" type="button" on:click=open_dialog>
                    <Icon icon=icondata::LuMail width="22" height="22" />
                    <span class="contact-label">
                        "Email"<span class="contact-sub">"send a message directly"</span>
                    </span>
                </button>
                <a class="contact-button" href=CAL_URL target="_blank" rel="noopener noreferrer">
                    <Icon icon=icondata::LuCalendarDays width="22" height="22" />
                    <span class="contact-label">
                        "Book a call"
                        <span class="contact-sub">"cal.com/arbikullakshi/intro · 30 min"</span>
                    </span>
                </a>
                <span
                    class="contact-button"
                    aria-disabled="true"
                    title="Add the CV PDF asset to enable this control"
                >
                    <Icon icon=icondata::LuFileDown width="22" height="22" />
                    <span class="contact-label">
                        "CV"<span class="contact-sub">"PDF asset not added"</span>
                    </span>
                </span>
            </div>
            <p class="direct-note">
                "Prefer your own mail client? "<a href=EMAIL_LINK>{EMAIL} " ↗"</a>
            </p>
        </div>

        <EmailDialog dialog_ref />
    }
}
