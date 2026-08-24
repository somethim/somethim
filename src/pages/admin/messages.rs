use leptos::prelude::*;
use leptos_meta::Title;
use leptos_router::hooks::use_params_map;

use super::common::TABLE_PAGE_SIZE;
use crate::{
    components::{
        nav::AdminNav,
        table::{chip_toggle, data_table, Column},
    },
    constants::{
        content::admin::{Message, MESSAGES, SELECTED_MESSAGE_BODY, SELECTED_MESSAGE_META},
        page_title, EMAIL,
    },
};

#[component]
fn ReplyDialog(dialog_ref: NodeRef<leptos::html::Dialog>) -> impl IntoView {
    let close_dialog = move |_| {
        if let Some(dialog) = dialog_ref.get() {
            dialog.close();
        }
    };

    view! {
        <dialog
            node_ref=dialog_ref
            class="email-dialog"
            aria-labelledby="reply-dialog-title"
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
                        <p class="section-index">"Reply / Resend"</p>
                        <h2 id="reply-dialog-title">"Reply to Elira Hoxha"</h2>
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
                    <label for="reply-to">"To"</label>
                    <input id="reply-to" name="to" value="elira@venue.al" readonly />
                </div>
                <div class="field">
                    <label for="reply-subject">"Subject"</label>
                    <input
                        id="reply-subject"
                        name="subject"
                        value="Re: Booking platform for our venue"
                    />
                </div>
                <div class="field">
                    <label for="reply-message">"Message"</label>
                    <textarea id="reply-message" name="message" required />
                </div>
                <div class="email-dialog-footer">
                    <p class="form-status">{format!("Sent from {EMAIL} via Resend.")}</p>
                    <button type="button" class="button-primary">
                        "Send reply ↘"
                    </button>
                </div>
            </div>
        </dialog>
    }
}

fn inbox_table() -> impl IntoView {
    let columns = vec![
        Column {
            label: "From",
            cell: |message: &Message| {
                view! { <span class="entry-title">{message.sender}</span> }.into_any()
            },
            sort: Some(|message| message.sender.to_lowercase()),
        },
        Column {
            label: "Message",
            cell: |message| view! { <span class="entry-cat">{message.preview}</span> }.into_any(),
            sort: None,
        },
        Column {
            label: "Received",
            cell: |message| view! { <span class="entry-date">{message.date}</span> }.into_any(),
            sort: None,
        },
        Column {
            label: "Status",
            cell: |message| {
                let label = if message.unread { "Unread" } else { "Read" };
                chip_toggle(label, !message.unread, "Read", "Unread").into_any()
            },
            sort: Some(|message| message.unread.to_string()),
        },
    ];

    data_table(
        "Contact form inbox",
        "minmax(0, 1.1fr) minmax(0, 2fr) 6.5rem 6rem 9rem",
        columns,
        MESSAGES.to_vec(),
        |message| {
            view! {
                <a class="row-edit" href=format!("/admin/messages/{}", message.slug)>
                    "Open"
                </a>
                <button type="button" class="button-danger small">
                    "Delete"
                </button>
            }
            .into_any()
        },
        TABLE_PAGE_SIZE,
    )
}

#[component]
pub fn AdminMessagesPage() -> impl IntoView {
    view! {
        <Title text=page_title("admin / messages") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Messages"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <p class="admin-note">
                    "Only emails sent from the contact form are recorded here."
                </p>
                {inbox_table()}
            </div>
        </div>
    }
}

#[component]
pub fn AdminMessageDetailPage() -> impl IntoView {
    let params = use_params_map();
    let message_id = move || params.read().get("message_id").unwrap_or_default();

    let dialog_ref = NodeRef::<leptos::html::Dialog>::new();
    let open_dialog = move |_| {
        if let Some(dialog) = dialog_ref.get() {
            let _ = dialog.show_modal();
        }
    };

    view! {
        <Title text=page_title("admin / messages / message") />
        <div class="page-heading">
            <p class="section-index">"Content dashboard"</p>
            <h1 class="page-title">"Message"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <section class="admin-edit" aria-label="Message">
                    <div class="admin-edit-head">
                        <div>
                            <p class="back-crumb">
                                <a href="/admin/messages">"← ~/admin/messages"</a>
                            </p>
                            <p class="section-index">"Messages / " {message_id}</p>
                            <h2>"Elira Hoxha"</h2>
                            <p class="msg-meta">{SELECTED_MESSAGE_META}</p>
                        </div>
                        {chip_toggle("Unread", false, "Read", "Unread")}
                    </div>
                    <div class="msg-body">
                        {SELECTED_MESSAGE_BODY
                            .iter()
                            .map(|paragraph| view! { <p>{*paragraph}</p> })
                            .collect_view()}
                    </div>
                    <div class="admin-edit-footer">
                        <p class="admin-note">
                            {format!("Reply sends an email from {EMAIL} to the sender.")}
                        </p>
                        <div class="admin-action-group">
                            <button type="button" class="button-danger">
                                "Delete"
                            </button>
                            <button type="button" class="button-primary" on:click=open_dialog>
                                "Reply by email ↗"
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>

        <ReplyDialog dialog_ref />
    }
}
