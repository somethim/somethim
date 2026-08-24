use leptos::prelude::*;

use super::{PasskeyChallenge, PasskeyInfo};

#[cfg(feature = "ssr")]
const ORIGIN_VAR: &str = "WEBAUTHN_ORIGIN";
#[cfg(feature = "ssr")]
const DEFAULT_ORIGIN: &str = "http://localhost:3000";
#[cfg(feature = "ssr")]
const NO_PASSKEY: &str = "no passkey is registered for that address";

#[cfg(feature = "ssr")]
type PasskeyRow = (
    uuid::Uuid,
    Option<String>,
    serde_json::Value,
    String,
    Option<String>,
);

#[cfg(feature = "ssr")]
fn configured_origin() -> String {
    std::env::var(ORIGIN_VAR).unwrap_or_else(|_| DEFAULT_ORIGIN.to_string())
}

#[cfg(feature = "ssr")]
fn relying_party(origin: &str) -> Result<(String, webauthn_rs::prelude::Url), String> {
    let url = webauthn_rs::prelude::Url::parse(origin)
        .map_err(|error| format!("{ORIGIN_VAR} is not a URL: {error}"))?;
    let host = url
        .host_str()
        .ok_or_else(|| format!("{ORIGIN_VAR} has no host"))?
        .to_string();
    Ok((host, url))
}

#[cfg(feature = "ssr")]
fn webauthn() -> Result<&'static webauthn_rs::Webauthn, ServerFnError> {
    use std::sync::OnceLock;
    static INSTANCE: OnceLock<Result<webauthn_rs::Webauthn, String>> = OnceLock::new();

    INSTANCE
        .get_or_init(|| {
            let (rp_id, url) = relying_party(&configured_origin())?;
            webauthn_rs::WebauthnBuilder::new(&rp_id, &url)
                .and_then(|builder| builder.rp_name(crate::constants::OWNER).build())
                .map_err(|error| format!("WebAuthn configuration is invalid: {error}"))
        })
        .as_ref()
        .map_err(|error| ServerFnError::new(error.clone()))
}

#[cfg(feature = "ssr")]
fn decode_passkeys(rows: Vec<PasskeyRow>) -> Vec<(uuid::Uuid, webauthn_rs::prelude::Passkey)> {
    rows.into_iter()
        .filter_map(|(id, _, credential, _, _)| {
            serde_json::from_value(credential).ok().map(|key| (id, key))
        })
        .collect()
}

#[cfg(feature = "ssr")]
fn server_error(error: impl std::fmt::Display) -> ServerFnError {
    ServerFnError::new(error.to_string())
}

#[cfg(feature = "ssr")]
fn parse_uuid(id: &str, missing: &'static str) -> Result<uuid::Uuid, ServerFnError> {
    uuid::Uuid::parse_str(id).map_err(|_| crate::server::not_found(missing))
}

#[cfg(feature = "ssr")]
async fn park_challenge(
    pool: &sqlx::PgPool,
    user_id: uuid::Uuid,
    state: &(impl serde::Serialize + Sync),
    options: &(impl serde::Serialize + Sync),
) -> Result<PasskeyChallenge, ServerFnError> {
    let state = serde_json::to_value(state).map_err(server_error)?;
    let challenge_id = super::repository::insert_challenge(pool, Some(user_id), state)
        .await
        .map_err(server_error)?;
    Ok(PasskeyChallenge {
        challenge_id: challenge_id.to_string(),
        options: serde_json::to_string(options).map_err(server_error)?,
    })
}

#[cfg(feature = "ssr")]
pub(crate) async fn enrolled_passkeys(
    pool: &sqlx::PgPool,
    user_id: uuid::Uuid,
) -> Result<Vec<PasskeyInfo>, ServerFnError> {
    let rows = super::repository::passkeys(pool, user_id)
        .await
        .map_err(server_error)?;
    Ok(rows
        .into_iter()
        .map(|(id, label, _, created, last_used)| PasskeyInfo {
            id: id.to_string(),
            label: label.unwrap_or_else(|| "Passkey".to_string()),
            created,
            last_used,
        })
        .collect())
}

#[server(endpoint = "auth/passkey_list", input = server_fn::codec::GetUrl)]
pub async fn passkey_list() -> Result<Vec<PasskeyInfo>, ServerFnError> {
    crate::server::cache_reads(true);
    let (pool, user_id) = crate::server::require_admin_user().await?;
    enrolled_passkeys(&pool, user_id).await
}

#[server(endpoint = "auth/passkey_register_begin")]
pub async fn passkey_register_begin() -> Result<PasskeyChallenge, ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let (email, _) = super::repository::account(&pool, user_id)
        .await
        .map_err(server_error)?
        .ok_or_else(|| crate::server::not_found("account not found"))?;

    let already_enrolled = decode_passkeys(
        super::repository::passkeys(&pool, user_id)
            .await
            .map_err(server_error)?,
    )
    .into_iter()
    .map(|(_, key)| key.cred_id().clone())
    .collect();

    let (options, state) = webauthn()?
        .start_passkey_registration(user_id, &email, &email, Some(already_enrolled))
        .map_err(server_error)?;

    park_challenge(&pool, user_id, &state, &options).await
}

#[server(endpoint = "auth/passkey_register_finish")]
pub async fn passkey_register_finish(
    challenge_id: String,
    label: String,
    credential: String,
) -> Result<(), ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let challenge = parse_uuid(&challenge_id, "unknown enrollment")?;
    let (owner, state) = super::repository::take_challenge(&pool, challenge)
        .await
        .map_err(server_error)?
        .ok_or_else(|| crate::server::invalid("that enrollment expired — start again"))?;
    if owner != Some(user_id) {
        return Err(crate::server::unauthorized(
            "that enrollment belongs to another session",
        ));
    }

    let state: webauthn_rs::prelude::PasskeyRegistration =
        serde_json::from_value(state).map_err(server_error)?;
    let credential: webauthn_rs::prelude::RegisterPublicKeyCredential =
        serde_json::from_str(&credential)
            .map_err(|error| crate::server::invalid(&format!("unreadable credential: {error}")))?;

    let passkey = webauthn()?
        .finish_passkey_registration(&credential, &state)
        .map_err(server_error)?;

    let label = label.trim();
    super::repository::insert_passkey(
        &pool,
        user_id,
        if label.is_empty() { "Passkey" } else { label },
        serde_json::to_value(&passkey).map_err(server_error)?,
    )
    .await
    .map_err(server_error)
}

/// `None` means "sign in some other way". An unknown address answers exactly
/// like a known one with no passkey, so the step cannot be used to test
/// whether an account exists.
#[server(endpoint = "auth/passkey_login_begin")]
pub async fn passkey_login_begin(email: String) -> Result<Option<PasskeyChallenge>, ServerFnError> {
    let pool = crate::server::require_pool()?;
    let Some(email) = super::normalize_email(&email) else {
        return Ok(None);
    };

    let Some((user_id, _)) = super::repository::find_user(&pool, &email)
        .await
        .map_err(server_error)?
    else {
        return Ok(None);
    };

    let enrolled: Vec<_> = decode_passkeys(
        super::repository::passkeys(&pool, user_id)
            .await
            .map_err(server_error)?,
    )
    .into_iter()
    .map(|(_, key)| key)
    .collect();
    if enrolled.is_empty() {
        return Ok(None);
    }

    let (options, state) = webauthn()?
        .start_passkey_authentication(&enrolled)
        .map_err(server_error)?;

    park_challenge(&pool, user_id, &state, &options)
        .await
        .map(Some)
}

#[server(endpoint = "auth/passkey_login_finish")]
pub async fn passkey_login_finish(
    challenge_id: String,
    credential: String,
) -> Result<(), ServerFnError> {
    let pool = crate::server::require_pool()?;
    let challenge = parse_uuid(&challenge_id, "unknown sign-in")?;
    let (owner, state) = super::repository::take_challenge(&pool, challenge)
        .await
        .map_err(server_error)?
        .ok_or_else(|| crate::server::invalid("that sign-in expired — try again"))?;
    let user_id = owner.ok_or_else(|| crate::server::unauthorized(NO_PASSKEY))?;

    let state: webauthn_rs::prelude::PasskeyAuthentication =
        serde_json::from_value(state).map_err(server_error)?;
    let credential: webauthn_rs::prelude::PublicKeyCredential =
        serde_json::from_str(&credential)
            .map_err(|error| crate::server::invalid(&format!("unreadable credential: {error}")))?;

    let assertion = webauthn()?
        .finish_passkey_authentication(&credential, &state)
        .map_err(|_| crate::server::unauthorized("that passkey was not accepted"))?;

    record_passkey_use(&pool, user_id, &assertion).await?;

    let token = crate::server::new_session_token();
    super::repository::create_session(
        &pool,
        user_id,
        &crate::server::hash_session_token(&token),
        crate::server::client_ip().as_deref(),
        crate::server::client_user_agent().as_deref(),
    )
    .await
    .map_err(server_error)?;
    crate::server::set_session_cookie(Some(&token));
    Ok(())
}

#[cfg(feature = "ssr")]
async fn record_passkey_use(
    pool: &sqlx::PgPool,
    user_id: uuid::Uuid,
    assertion: &webauthn_rs::prelude::AuthenticationResult,
) -> Result<(), ServerFnError> {
    let rows = super::repository::passkeys(pool, user_id)
        .await
        .map_err(server_error)?;
    let Some((id, mut key)) = decode_passkeys(rows)
        .into_iter()
        .find(|(_, key)| key.cred_id() == assertion.cred_id())
    else {
        return Ok(());
    };
    key.update_credential(assertion);
    super::repository::touch_passkey(pool, id, serde_json::to_value(&key).map_err(server_error)?)
        .await
        .map_err(server_error)
}

#[server(endpoint = "auth/passkey_delete")]
pub async fn passkey_delete(id: String) -> Result<(), ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let id = parse_uuid(&id, "unknown passkey")?;
    let removed = super::repository::delete_passkey(&pool, user_id, id)
        .await
        .map_err(server_error)?;
    if removed == 0 {
        return Err(crate::server::not_found("unknown passkey"));
    }
    Ok(())
}

#[cfg(all(test, feature = "ssr"))]
mod tests {
    use super::relying_party;

    #[test]
    fn relying_party_id_is_the_origin_host() {
        let (rp_id, url) = relying_party("https://arbikullakshi.com").expect("valid origin");
        assert_eq!(rp_id, "arbikullakshi.com");
        assert_eq!(url.as_str(), "https://arbikullakshi.com/");
    }

    #[test]
    fn relying_party_id_drops_the_port_for_local_development() {
        let (rp_id, _) = relying_party("http://localhost:3000").expect("valid origin");
        assert_eq!(rp_id, "localhost");
    }

    #[test]
    fn a_bare_hostname_is_not_an_origin() {
        assert!(relying_party("arbikullakshi.com").is_err());
    }
}
