use leptos::prelude::*;

// Verified against when the account is unknown, so response time does not
// reveal whether an address exists.
#[cfg(feature = "ssr")]
const DUMMY_HASH: &str = "$argon2id$v=19$m=19456,t=2,p=1$lrBfVfrzjbWzT8Zo49rllQ$hqWePPC3yRAZJ8FeXmn8zTYMRxw8IcnCpHG3ThjrTWA";

#[server(endpoint = "auth/login")]
pub async fn login(
    email: String,
    password: String,
    totp: Option<String>,
) -> Result<(), ServerFnError> {
    let pool = crate::server::require_pool()?;

    let email = super::normalize_email(&email).unwrap_or_default();
    let user = super::repository::find_user(&pool, &email)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?;

    let (user_id, hash) = match &user {
        Some((id, hash)) => (Some(*id), hash.as_str()),
        None => (None, DUMMY_HASH),
    };
    let verified = password_auth::verify_password(&password, hash).is_ok();
    let Some(user_id) = user_id.filter(|_| verified) else {
        return Err(crate::server::unauthorized("invalid email or password"));
    };

    if let Some(secret) = super::repository::totp_secret(&pool, user_id)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?
    {
        let code = totp.unwrap_or_default();
        if code.trim().is_empty() {
            return Err(crate::server::unauthorized("a one-time code is required"));
        }
        let valid = super::build_totp(&secret, &email)?
            .check_current(code.trim())
            .is_some();
        if !valid {
            return Err(crate::server::unauthorized("invalid one-time code"));
        }
    }

    let token = crate::server::new_session_token();
    super::repository::create_session(
        &pool,
        user_id,
        &crate::server::hash_session_token(&token),
        crate::server::client_ip().as_deref(),
        crate::server::client_user_agent().as_deref(),
    )
    .await
    .map_err(|error| ServerFnError::new(error.to_string()))?;
    crate::server::set_session_cookie(Some(&token));
    Ok(())
}
