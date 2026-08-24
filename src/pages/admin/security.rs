use leptos::prelude::*;
use leptos::task::spawn_local;
use leptos_meta::Title;
use leptos_router::hooks::use_navigate;

use crate::components::nav::AdminNav;
use crate::server::auth::passkeys::{
    passkey_delete, passkey_register_begin, passkey_register_finish,
};
use crate::server::auth::security::{
    account_info, ChangePassword, TotpBegin, TotpConfirm, TotpDisable, UpdateEmail,
};
use crate::server::auth::sessions::{session_list, session_revoke};
use crate::server::auth::{AdminAccount, PasskeyInfo, SessionInfo};

fn action_note(
    value: impl Fn() -> Option<Result<(), ServerFnError>> + Send + Sync + 'static,
    success: &'static str,
) -> impl IntoView {
    move || {
        value().map(|result| {
            let text = match result {
                Ok(()) => success.to_string(),
                Err(error) => format!("failed: {error}"),
            };
            view! { <p class="admin-note">{text}</p> }
        })
    }
}

fn account_section(
    account: &AdminAccount,
    update_email: ServerAction<UpdateEmail>,
) -> impl IntoView {
    let email = RwSignal::new(account.email.clone());

    view! {
        <section class="admin-edit">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Security / Account"</p>
                    <h2>"Account"</h2>
                </div>
            </div>
            <div class="field">
                <label for="sec-email">"Email " <span>"· this is your sign-in"</span></label>
                <input
                    id="sec-email"
                    type="email"
                    autocomplete="email"
                    prop:value=move || email.get()
                    on:input=move |event| email.set(event_target_value(&event))
                />
            </div>
            {action_note(move || update_email.value().get(), "email saved")}
            <div class="admin-edit-footer">
                <p class="admin-note">"Changing this changes the address you sign in with."</p>
                <button
                    type="button"
                    class="button-primary"
                    on:click=move |_| {
                        update_email
                            .dispatch(UpdateEmail {
                                email: email.get_untracked(),
                            });
                    }
                >
                    "Save email ↘"
                </button>
            </div>
        </section>
    }
}

fn password_section(change_password: ServerAction<ChangePassword>) -> impl IntoView {
    let current = RwSignal::new(String::new());
    let fresh = RwSignal::new(String::new());
    let confirm = RwSignal::new(String::new());
    let mismatch = RwSignal::new(false);

    let submit = move || {
        if fresh.get_untracked() != confirm.get_untracked() {
            mismatch.set(true);
            return;
        }
        mismatch.set(false);
        change_password.dispatch(ChangePassword {
            current: current.get_untracked(),
            new_password: fresh.get_untracked(),
        });
    };

    Effect::new(move |_| {
        if change_password.value().get() == Some(Ok(())) {
            current.set(String::new());
            fresh.set(String::new());
            confirm.set(String::new());
        }
    });

    view! {
        <section class="admin-edit">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Security / Password"</p>
                    <h2>"Password"</h2>
                </div>
            </div>
            <form
                class="stacked-form"
                on:submit=move |event| {
                    event.prevent_default();
                    submit();
                }
            >
                <div class="field">
                    <label for="sec-current">"Current password"</label>
                    <input
                        id="sec-current"
                        type="password"
                        autocomplete="current-password"
                        prop:value=move || current.get()
                        on:input=move |event| current.set(event_target_value(&event))
                    />
                </div>
                <div class="admin-field-row">
                    <div class="field">
                        <label for="sec-new">
                            "New password " <span>"· 12+ characters"</span>
                        </label>
                        <input
                            id="sec-new"
                            type="password"
                            autocomplete="new-password"
                            prop:value=move || fresh.get()
                            on:input=move |event| fresh.set(event_target_value(&event))
                        />
                    </div>
                    <div class="field">
                        <label for="sec-confirm">"Repeat new password"</label>
                        <input
                            id="sec-confirm"
                            type="password"
                            autocomplete="new-password"
                            prop:value=move || confirm.get()
                            on:input=move |event| confirm.set(event_target_value(&event))
                        />
                    </div>
                </div>
                {move || {
                    mismatch
                        .get()
                        .then(|| view! { <p class="admin-note">"passwords do not match"</p> })
                }}
                {action_note(move || change_password.value().get(), "password updated")}
                <div class="admin-edit-footer">
                    <p class="admin-note">"Existing sessions stay signed in."</p>
                    <button type="submit" class="button-primary">
                        "Change password ↘"
                    </button>
                </div>
            </form>
        </section>
    }
}

fn totp_enroll(
    totp_begin: ServerAction<TotpBegin>,
    totp_confirm: ServerAction<TotpConfirm>,
) -> impl IntoView {
    let code = RwSignal::new(String::new());

    move || match totp_begin.value().get() {
        Some(Ok(setup)) => {
            let secret = setup.secret.clone();
            view! {
                <div class="admin-field-row totp-setup">
                    <div class="field">
                        <img
                            class="totp-qr"
                            src=format!("data:image/png;base64,{}", setup.qr_base64)
                            alt="TOTP enrollment QR code"
                        />
                    </div>
                    <div class="field">
                        <label for="sec-totp-secret">"Manual entry secret"</label>
                        <input id="sec-totp-secret" value=setup.secret readonly />
                        <label for="sec-totp-code">"Code from your authenticator"</label>
                        <input
                            id="sec-totp-code"
                            inputmode="numeric"
                            placeholder="000 000"
                            prop:value=move || code.get()
                            on:input=move |event| code.set(event_target_value(&event))
                        />
                        <button
                            type="button"
                            class="button-primary"
                            on:click=move |_| {
                                totp_confirm
                                    .dispatch(TotpConfirm {
                                        secret: secret.clone(),
                                        code: code.get_untracked(),
                                    });
                            }
                        >
                            "Verify & enable ↘"
                        </button>
                    </div>
                </div>
            }
            .into_any()
        }
        Some(Err(error)) => view! { <p class="admin-note">{error.to_string()}</p> }.into_any(),
        None => view! {
            <div class="admin-edit-footer">
                <p class="admin-note">"Scan a QR with any authenticator app to enroll."</p>
                <button
                    type="button"
                    class="button-primary"
                    on:click=move |_| {
                        totp_begin.dispatch(TotpBegin {});
                    }
                >
                    "Set up TOTP ↘"
                </button>
            </div>
        }
        .into_any(),
    }
}

fn totp_section(
    enabled: bool,
    totp_begin: ServerAction<TotpBegin>,
    totp_confirm: ServerAction<TotpConfirm>,
    totp_disable: ServerAction<TotpDisable>,
) -> impl IntoView {
    let disable_password = RwSignal::new(String::new());

    let body = if enabled {
        view! {
            <p class="admin-note">"TOTP is enabled — sign-ins require a one-time code."</p>
            <form
                class="stacked-form"
                on:submit=move |event| {
                    event.prevent_default();
                    totp_disable
                        .dispatch(TotpDisable {
                            password: disable_password.get_untracked(),
                        });
                }
            >
                <div class="field">
                    <label for="sec-totp-off">
                        "Password " <span>"· required to disable"</span>
                    </label>
                    <input
                        id="sec-totp-off"
                        type="password"
                        autocomplete="current-password"
                        prop:value=move || disable_password.get()
                        on:input=move |event| disable_password.set(event_target_value(&event))
                    />
                </div>
                {action_note(move || totp_disable.value().get(), "TOTP disabled")}
                <div class="admin-edit-footer">
                    <p class="admin-note">
                        "Disabling removes the secret — re-enroll to turn it back on."
                    </p>
                    <button type="submit" class="button-danger">
                        "Disable TOTP"
                    </button>
                </div>
            </form>
        }
        .into_any()
    } else {
        view! {
            {totp_enroll(totp_begin, totp_confirm)}
            {action_note(move || totp_confirm.value().get(), "TOTP enabled")}
        }
        .into_any()
    };

    view! {
        <section class="admin-edit">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Security / Two-factor"</p>
                    <h2>"Authenticator (TOTP)"</h2>
                </div>
                {crate::components::table::chip_toggle(
                    if enabled { "Enabled" } else { "Off" },
                    enabled,
                    "Enabled",
                    "Off",
                )}
            </div>
            {body}
        </section>
    }
}

fn session_row(
    session: &SessionInfo,
    on_revoke: impl Fn(String, bool) + Copy + Send + Sync + 'static,
) -> impl IntoView {
    let id = session.id.clone();
    let current = session.current;

    view! {
        <li class="session-row">
            <div>
                <p class="entry-title">
                    {session.device.clone()}
                    {current.then(|| view! { <span class="chip-current">"this device"</span> })}
                </p>
                <p class="entry-date">
                    {format!(
                        "{} · signed in {} · last seen {}",
                        session.ip,
                        session.created,
                        session.last_seen,
                    )}
                </p>
            </div>
            <button
                type="button"
                class="button-danger small"
                on:click=move |_| on_revoke(id.clone(), current)
            >
                {if current { "Sign out" } else { "Revoke" }}
            </button>
        </li>
    }
}

fn sessions_section(sessions: Vec<SessionInfo>) -> impl IntoView {
    let revoked = RwSignal::new(0_u32);
    let live = Resource::new(move || revoked.get(), |_| session_list());
    let initial = StoredValue::new(sessions);

    let on_revoke = move |id: String, current: bool| {
        spawn_local(async move {
            let _ = session_revoke(id).await;
            if current {
                use_navigate()("/admin/login", leptos_router::NavigateOptions::default());
            } else {
                revoked.update(|version| *version += 1);
            }
        });
    };

    view! {
        <details class="admin-edit session-log">
            <summary>
                <span class="section-index">"Security / Sessions"</span>
                <span class="summary-title">"Signed-in devices"</span>
            </summary>
            <Suspense fallback=|| ()>
                {move || {
                    let sessions = live
                        .get()
                        .and_then(Result::ok)
                        .unwrap_or_else(|| initial.get_value());
                    view! {
                        <ul class="session-list">
                            {sessions
                                .iter()
                                .map(|session| session_row(session, on_revoke))
                                .collect_view()}
                        </ul>
                    }
                }}
            </Suspense>
            <p class="admin-note">
                "Every sign-in records its address and device. Revoking ends that session immediately."
            </p>
        </details>
    }
}

#[allow(clippy::future_not_send)]
async fn enroll_passkey(label: String) -> Result<(), String> {
    let challenge = passkey_register_begin()
        .await
        .map_err(|error| error.to_string())?;
    let credential = crate::passkey::enroll(&challenge.options).await?;
    passkey_register_finish(challenge.challenge_id, label, credential)
        .await
        .map_err(|error| error.to_string())
}

fn passkey_row(
    passkey: &PasskeyInfo,
    on_change: impl Fn() + Copy + Send + Sync + 'static,
) -> impl IntoView {
    let id = passkey.id.clone();
    let last_used = passkey.last_used.clone().map_or_else(
        || "never used".to_string(),
        |date| format!("last used {date}"),
    );

    view! {
        <li class="passkey-row">
            <div>
                <p class="entry-title">{passkey.label.clone()}</p>
                <p class="entry-date">{format!("added {} · {last_used}", passkey.created)}</p>
            </div>
            <button
                type="button"
                class="button-danger small"
                on:click=move |_| {
                    let id = id.clone();
                    spawn_local(async move {
                        let _ = passkey_delete(id).await;
                        on_change();
                    });
                }
            >
                "Remove"
            </button>
        </li>
    }
}

fn passkeys_section(
    passkeys: Vec<PasskeyInfo>,
    on_change: impl Fn() + Copy + Send + Sync + 'static,
) -> impl IntoView {
    let label = RwSignal::new(String::new());
    let status = RwSignal::new(None::<String>);
    let pending = RwSignal::new(false);

    let add = move || {
        status.set(None);
        pending.set(true);
        let chosen = label.get_untracked();
        spawn_local(async move {
            match enroll_passkey(chosen).await {
                Ok(()) => {
                    label.set(String::new());
                    status.set(Some("passkey added".to_string()));
                    on_change();
                }
                Err(error) => status.set(Some(format!("failed: {error}"))),
            }
            pending.set(false);
        });
    };

    let count = passkeys.len();

    view! {
        <section class="admin-edit">
            <div class="admin-edit-head">
                <div>
                    <p class="section-index">"Security / Passkeys"</p>
                    <h2>"Passkeys"</h2>
                </div>
                {crate::components::table::chip_toggle(
                    if count == 0 { "None" } else { "Enabled" },
                    count != 0,
                    "Enabled",
                    "None",
                )}
            </div>
            <Show
                when=move || count != 0
                fallback=|| {
                    view! {
                        <p class="admin-note">
                            "No passkeys yet — add one to sign in with Touch ID, Windows Hello, or a security key."
                        </p>
                    }
                }
            >
                <ul class="passkey-list">
                    {passkeys.iter().map(|passkey| passkey_row(passkey, on_change)).collect_view()}
                </ul>
            </Show>
            <div class="field">
                <label for="sec-passkey-label">
                    "Name " <span>"· e.g. MacBook Touch ID"</span>
                </label>
                <input
                    id="sec-passkey-label"
                    placeholder="Passkey"
                    prop:value=move || label.get()
                    on:input=move |event| label.set(event_target_value(&event))
                />
            </div>
            {move || status.get().map(|note| view! { <p class="admin-note">{note}</p> })}
            <div class="admin-edit-footer">
                <p class="admin-note">
                    "A passkey signs you in on its own — no password or one-time code."
                </p>
                <button
                    type="button"
                    class="button-primary"
                    disabled=move || pending.get()
                    on:click=move |_| add()
                >
                    {move || if pending.get() { "Waiting…" } else { "Add passkey ↘" }}
                </button>
            </div>
        </section>
    }
}

#[component]
pub fn AdminSecurityPage() -> impl IntoView {
    let update_email = ServerAction::<UpdateEmail>::new();
    let change_password = ServerAction::<ChangePassword>::new();
    let totp_begin = ServerAction::<TotpBegin>::new();
    let totp_confirm = ServerAction::<TotpConfirm>::new();
    let totp_disable = ServerAction::<TotpDisable>::new();

    let passkeys_changed = RwSignal::new(0_u32);
    let account = Resource::new(
        move || {
            (
                update_email.version().get(),
                totp_confirm.version().get(),
                totp_disable.version().get(),
                passkeys_changed.get(),
            )
        },
        |_| account_info(),
    );
    let on_passkey_change = move || passkeys_changed.update(|version| *version += 1);

    view! {
        <Title text=crate::constants::page_title("admin / security") />
        <div class="page-heading">
            <p class="section-index">"Operator account"</p>
            <h1 class="page-title">"Security"</h1>
        </div>
        <div class="admin-layout">
            <AdminNav />
            <div class="admin-content">
                <Suspense fallback=|| ()>
                    {move || {
                        account
                            .get()
                            .map(|result| match result {
                                Ok(info) => {
                                    view! {
                                        {account_section(&info, update_email)}
                                        {password_section(change_password)}
                                        {totp_section(
                                            info.totp_enabled,
                                            totp_begin,
                                            totp_confirm,
                                            totp_disable,
                                        )}
                                        {passkeys_section(info.passkeys.clone(), on_passkey_change)}
                                        {sessions_section(info.sessions.clone())}
                                    }
                                        .into_any()
                                }
                                Err(error) => {
                                    view! { <p class="admin-note">{error.to_string()}</p> }
                                        .into_any()
                                }
                            })
                    }}
                </Suspense>
            </div>
        </div>
    }
}
