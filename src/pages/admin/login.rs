use leptos::prelude::*;
use leptos::task::spawn_local;
use leptos_meta::Title;
use leptos_router::hooks::use_navigate;

use crate::server::auth::login::Login;
use crate::server::auth::passkeys::{passkey_login_begin, passkey_login_finish};
use crate::server::auth::PasskeyChallenge;

#[derive(Clone, Copy, PartialEq, Eq)]
enum Stage {
    Email,
    Passkey,
    Password,
}

async fn offer_passkey(email: String) -> Result<Option<PasskeyChallenge>, String> {
    passkey_login_begin(email)
        .await
        .map_err(|error| error.to_string())
}

#[allow(clippy::future_not_send)]
async fn complete_passkey(challenge: PasskeyChallenge) -> Result<(), String> {
    let credential = crate::passkey::authenticate(&challenge.options).await?;
    passkey_login_finish(challenge.challenge_id, credential)
        .await
        .map_err(|error| error.to_string())
}

#[derive(Clone, Copy)]
struct LoginState {
    email: RwSignal<String>,
    password: RwSignal<String>,
    totp: RwSignal<String>,
    stage: RwSignal<Stage>,
    has_passkey: RwSignal<bool>,
    notice: RwSignal<Option<String>>,
    pending: RwSignal<bool>,
}

impl LoginState {
    fn new() -> Self {
        Self {
            email: RwSignal::new(String::new()),
            password: RwSignal::new(String::new()),
            totp: RwSignal::new(String::new()),
            stage: RwSignal::new(Stage::Email),
            has_passkey: RwSignal::new(false),
            notice: RwSignal::new(None),
            pending: RwSignal::new(false),
        }
    }

    fn fail(self, error: String) {
        self.pending.set(false);
        self.notice.set(Some(error));
    }

    fn move_to(self, stage: Stage) {
        self.pending.set(false);
        self.notice.set(None);
        self.stage.set(stage);
    }

    fn prompt_passkey(
        self,
        challenge: PasskeyChallenge,
        signed_in: impl Fn() + Copy + Send + Sync + 'static,
    ) {
        self.pending.set(true);
        self.stage.set(Stage::Passkey);
        spawn_local(async move {
            match complete_passkey(challenge).await {
                Ok(()) => signed_in(),
                Err(error) => self.fail(error),
            }
        });
    }

    fn identify(self, signed_in: impl Fn() + Copy + Send + Sync + 'static) {
        let address = self.email.get_untracked();
        if address.trim().is_empty() {
            self.notice.set(Some("enter your email".to_string()));
            return;
        }
        self.notice.set(None);
        self.pending.set(true);
        spawn_local(async move {
            match offer_passkey(address).await {
                Ok(Some(challenge)) => {
                    self.has_passkey.set(true);
                    self.prompt_passkey(challenge, signed_in);
                }
                Ok(None) => {
                    self.has_passkey.set(false);
                    self.move_to(Stage::Password);
                }
                Err(error) => self.fail(error),
            }
        });
    }

    fn restart(self) {
        self.password.set(String::new());
        self.totp.set(String::new());
        self.move_to(Stage::Email);
    }
}

fn login_header() -> impl IntoView {
    view! {
        <div class="login-robot" aria-hidden="true">
            <div class="sprite-slot">
                <div class="sprite" />
                <div class="sprite-eye eye-l" />
                <div class="sprite-eye eye-r" />
                <div class="sprite-antenna" />
            </div>
        </div>
        <div class="login-head">
            <p class="section-index">"Admin / Authentication"</p>
            <h1>
                <span class="prompt-user">{crate::constants::TERMINAL_USER}</span>
                ":~$ sudo -i"
            </h1>
        </div>
    }
}

fn email_field(state: LoginState, locked: bool) -> impl IntoView {
    let email = state.email;
    view! {
        <div class="field">
            <label for="login-email">
                "Email"
                {locked
                    .then(|| {
                        view! {
                            <button
                                type="button"
                                class="field-action"
                                on:click=move |_| state.restart()
                            >
                                "change"
                            </button>
                        }
                    })}
            </label>
            <input
                id="login-email"
                type="email"
                autocomplete="username webauthn"
                required
                readonly=locked
                prop:value=move || email.get()
                on:input=move |event| email.set(event_target_value(&event))
            />
        </div>
    }
}

fn email_stage(
    state: LoginState,
    identify: impl Fn() + Copy + Send + Sync + 'static,
) -> impl IntoView {
    let pending = state.pending;
    view! {
        <form
            class="stacked-form"
            on:submit=move |event| {
                event.prevent_default();
                identify();
            }
        >
            {email_field(state, false)}
            <div class="admin-edit-footer">
                <p class="admin-note">"Passkey first, password if you need it."</p>
                <button type="submit" class="button-primary" disabled=move || pending.get()>
                    {move || if pending.get() { "Checking…" } else { "Next ↘" }}
                </button>
            </div>
        </form>
    }
}

fn passkey_stage(
    state: LoginState,
    retry: impl Fn() + Copy + Send + Sync + 'static,
) -> impl IntoView {
    let pending = state.pending;
    view! {
        {email_field(state, true)}
        <p class="admin-note">
            {move || {
                if pending.get() {
                    "Waiting for your passkey — approve the prompt."
                } else {
                    "No passkey was approved."
                }
            }}
        </p>
        <div class="admin-edit-footer">
            <button
                type="button"
                class="button-ghost"
                on:click=move |_| state.move_to(Stage::Password)
            >
                "Use password instead"
            </button>
            <button
                type="button"
                class="button-primary"
                disabled=move || pending.get()
                on:click=move |_| retry()
            >
                "Try passkey again ⛨"
            </button>
        </div>
    }
}

fn password_stage(
    state: LoginState,
    submit: impl Fn() + Copy + Send + Sync + 'static,
    retry_passkey: impl Fn() + Copy + Send + Sync + 'static,
) -> impl IntoView {
    let LoginState {
        password,
        totp,
        has_passkey,
        ..
    } = state;

    view! {
        <form
            class="stacked-form"
            on:submit=move |event| {
                event.prevent_default();
                submit();
            }
        >
            {email_field(state, true)}
            <div class="field">
                <label for="login-password">"Password"</label>
                <input
                    id="login-password"
                    type="password"
                    autocomplete="current-password"
                    required
                    prop:value=move || password.get()
                    on:input=move |event| password.set(event_target_value(&event))
                />
            </div>
            <div class="field">
                <label for="login-totp">"One-time code " <span>"· if enrolled"</span></label>
                <input
                    id="login-totp"
                    inputmode="numeric"
                    autocomplete="one-time-code"
                    placeholder="000 000"
                    prop:value=move || totp.get()
                    on:input=move |event| totp.set(event_target_value(&event))
                />
            </div>
            <div class="admin-edit-footer">
                {move || {
                    has_passkey
                        .get()
                        .then(|| {
                            view! {
                                <button
                                    type="button"
                                    class="button-ghost"
                                    on:click=move |_| retry_passkey()
                                >
                                    "Use passkey ⛨"
                                </button>
                            }
                        })
                }} <button type="submit" class="button-primary">
                    "Sign in ↘"
                </button>
            </div>
        </form>
    }
}

#[component]
pub fn AdminLoginPage() -> impl IntoView {
    let state = LoginState::new();
    let login = ServerAction::<Login>::new();
    let go_to_admin = move || use_navigate()("/admin", leptos_router::NavigateOptions::default());

    Effect::new(move |_| {
        if login.value().get() == Some(Ok(())) {
            go_to_admin();
        }
    });

    let identify = move || state.identify(go_to_admin);
    let submit = move || {
        let code = state.totp.get_untracked();
        login.dispatch(Login {
            email: state.email.get_untracked(),
            password: state.password.get_untracked(),
            totp: (!code.trim().is_empty()).then_some(code),
        });
    };

    let error = move || {
        state
            .notice
            .get()
            .or_else(|| {
                login
                    .value()
                    .get()
                    .and_then(Result::err)
                    .map(|error| error.to_string())
            })
            .map(|error| view! { <p class="admin-note">{error}</p> })
    };

    view! {
        <Title text=crate::constants::page_title("admin / sign in") />
        <div class="login-container">
            <section class="admin-edit login-card" aria-label="Admin sign in">
                {login_header()}
                {error}
                {move || match state.stage.get() {
                    Stage::Email => email_stage(state, identify).into_any(),
                    Stage::Passkey => passkey_stage(state, identify).into_any(),
                    Stage::Password => password_stage(state, submit, identify).into_any(),
                }}
                <p class="admin-note">
                    "Sign-ins are audited — device, time, and IP are logged."
                </p>
            </section>
        </div>
    }
}
