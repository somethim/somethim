use leptos::prelude::*;

use super::{AdminAccount, TotpSetup};

#[server(endpoint = "auth/account", input = server_fn::codec::GetUrl)]
pub async fn account_info() -> Result<AdminAccount, ServerFnError> {
    crate::server::cache_reads(true);
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let (email, totp_enabled) = super::repository::account(&pool, user_id)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?
        .ok_or_else(|| crate::server::not_found("account not found"))?;
    Ok(AdminAccount {
        email,
        totp_enabled,
        passkeys: super::passkeys::enrolled_passkeys(&pool, user_id).await?,
        sessions: super::sessions::active_sessions(&pool, user_id).await?,
    })
}

#[server(endpoint = "auth/update_email")]
pub async fn update_email(email: String) -> Result<(), ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let email = super::normalize_email(&email)
        .ok_or_else(|| crate::server::invalid("that does not look like an email"))?;
    super::repository::set_email(&pool, user_id, &email)
        .await
        .map_err(|error| match error {
            sqlx::Error::Database(error) if error.is_unique_violation() => {
                crate::server::conflict("another account already uses that address")
            }
            error => ServerFnError::new(error.to_string()),
        })
}

#[server(endpoint = "auth/change_password")]
pub async fn change_password(current: String, new_password: String) -> Result<(), ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    if new_password.len() < 12 {
        return Err(crate::server::invalid(
            "new password must be at least 12 characters",
        ));
    }
    let hash = super::repository::password_hash(&pool, user_id)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?
        .ok_or_else(|| crate::server::not_found("account not found"))?;
    if password_auth::verify_password(&current, &hash).is_err() {
        return Err(crate::server::unauthorized("current password is wrong"));
    }
    super::repository::set_password_hash(
        &pool,
        user_id,
        &password_auth::generate_hash(&new_password),
    )
    .await
    .map_err(|error| ServerFnError::new(error.to_string()))
}

#[server(endpoint = "auth/totp_begin")]
pub async fn totp_begin() -> Result<TotpSetup, ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let (email, _) = super::repository::account(&pool, user_id)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?
        .ok_or_else(|| crate::server::not_found("account not found"))?;

    let secret = totp_rs::Secret::generate().to_base32();
    let totp = super::build_totp(&secret, &email)?;
    Ok(TotpSetup {
        otpauth_url: totp
            .to_url()
            .map_err(|error| ServerFnError::new(error.to_string()))?,
        qr_base64: totp
            .to_qr_base64()
            .map_err(|error| ServerFnError::new(error.to_string()))?,
        secret,
    })
}

#[server(endpoint = "auth/totp_confirm")]
pub async fn totp_confirm(secret: String, code: String) -> Result<(), ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let (email, _) = super::repository::account(&pool, user_id)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?
        .ok_or_else(|| crate::server::not_found("account not found"))?;

    let totp = super::build_totp(&secret, &email)?;
    if totp.check_current(code.trim()).is_none() {
        return Err(crate::server::invalid(
            "that code did not match — try again",
        ));
    }
    super::repository::set_totp_secret(&pool, user_id, Some(&secret))
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))
}

#[server(endpoint = "auth/totp_disable")]
pub async fn totp_disable(password: String) -> Result<(), ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let hash = super::repository::password_hash(&pool, user_id)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?
        .ok_or_else(|| crate::server::not_found("account not found"))?;
    if password_auth::verify_password(&password, &hash).is_err() {
        return Err(crate::server::unauthorized("password is wrong"));
    }
    super::repository::set_totp_secret(&pool, user_id, None)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))
}
