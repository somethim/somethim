//! Data access for admin sessions and operator lookup.

// Every function here fails for exactly one reason — the database call.
#![allow(clippy::missing_errors_doc)]

use sqlx::PgPool;
use uuid::Uuid;

pub const SESSION_DAYS: i32 = 30;

pub const CHALLENGE_MINUTES: i32 = 5;

pub async fn find_user(pool: &PgPool, email: &str) -> Result<Option<(Uuid, String)>, sqlx::Error> {
    sqlx::query_as("SELECT id, password_hash FROM users WHERE email = $1")
        .bind(email)
        .fetch_optional(pool)
        .await
}

pub async fn create_session(
    pool: &PgPool,
    user_id: Uuid,
    token_hash: &str,
    ip: Option<&str>,
    user_agent: Option<&str>,
) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO sessions (user_id, token_hash, expires_at, ip, user_agent)
         VALUES ($1, $2, now() + make_interval(days => $3), $4, $5)",
    )
    .bind(user_id)
    .bind(token_hash)
    .bind(SESSION_DAYS)
    .bind(ip)
    .bind(user_agent)
    .execute(pool)
    .await?;
    sqlx::query("UPDATE users SET last_login_at = now() WHERE id = $1")
        .bind(user_id)
        .execute(pool)
        .await
        .map(|_| ())
}

pub async fn session_is_valid(pool: &PgPool, token_hash: &str) -> Result<bool, sqlx::Error> {
    sqlx::query_scalar(
        "SELECT EXISTS (
             SELECT 1 FROM sessions WHERE token_hash = $1 AND expires_at > now()
         )",
    )
    .bind(token_hash)
    .fetch_one(pool)
    .await
}

pub async fn delete_session(pool: &PgPool, token_hash: &str) -> Result<(), sqlx::Error> {
    sqlx::query("DELETE FROM sessions WHERE token_hash = $1")
        .bind(token_hash)
        .execute(pool)
        .await
        .map(|_| ())
}

pub async fn session_user(pool: &PgPool, token_hash: &str) -> Result<Option<Uuid>, sqlx::Error> {
    sqlx::query_scalar(
        "UPDATE sessions SET last_seen_at = now()
         WHERE token_hash = $1 AND expires_at > now()
         RETURNING user_id",
    )
    .bind(token_hash)
    .fetch_optional(pool)
    .await
}

pub async fn sessions_for_user(
    pool: &PgPool,
    user_id: Uuid,
    current_hash: &str,
) -> Result<Vec<(Uuid, Option<String>, Option<String>, String, String, bool)>, sqlx::Error> {
    sqlx::query_as(
        "SELECT id,
                ip,
                user_agent,
                to_char(created_at, 'YYYY-MM-DD HH24:MI'),
                to_char(last_seen_at, 'YYYY-MM-DD HH24:MI'),
                token_hash = $2
         FROM sessions
         WHERE user_id = $1 AND expires_at > now()
         ORDER BY last_seen_at DESC",
    )
    .bind(user_id)
    .bind(current_hash)
    .fetch_all(pool)
    .await
}

pub async fn delete_session_by_id(
    pool: &PgPool,
    user_id: Uuid,
    id: Uuid,
) -> Result<u64, sqlx::Error> {
    sqlx::query("DELETE FROM sessions WHERE id = $1 AND user_id = $2")
        .bind(id)
        .bind(user_id)
        .execute(pool)
        .await
        .map(|result| result.rows_affected())
}

pub async fn account(pool: &PgPool, user_id: Uuid) -> Result<Option<(String, bool)>, sqlx::Error> {
    sqlx::query_as("SELECT email, totp_secret IS NOT NULL FROM users WHERE id = $1")
        .bind(user_id)
        .fetch_optional(pool)
        .await
}

pub async fn set_email(pool: &PgPool, user_id: Uuid, email: &str) -> Result<(), sqlx::Error> {
    sqlx::query("UPDATE users SET email = $2 WHERE id = $1")
        .bind(user_id)
        .bind(email)
        .execute(pool)
        .await
        .map(|_| ())
}

pub async fn password_hash(pool: &PgPool, user_id: Uuid) -> Result<Option<String>, sqlx::Error> {
    sqlx::query_scalar("SELECT password_hash FROM users WHERE id = $1")
        .bind(user_id)
        .fetch_optional(pool)
        .await
}

pub async fn set_password_hash(
    pool: &PgPool,
    user_id: Uuid,
    hash: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query("UPDATE users SET password_hash = $2 WHERE id = $1")
        .bind(user_id)
        .bind(hash)
        .execute(pool)
        .await
        .map(|_| ())
}

pub async fn totp_secret(pool: &PgPool, user_id: Uuid) -> Result<Option<String>, sqlx::Error> {
    sqlx::query_scalar("SELECT totp_secret FROM users WHERE id = $1")
        .bind(user_id)
        .fetch_optional(pool)
        .await
        .map(Option::flatten)
}

pub async fn set_totp_secret(
    pool: &PgPool,
    user_id: Uuid,
    secret: Option<&str>,
) -> Result<(), sqlx::Error> {
    sqlx::query("UPDATE users SET totp_secret = $2 WHERE id = $1")
        .bind(user_id)
        .bind(secret)
        .execute(pool)
        .await
        .map(|_| ())
}

pub async fn passkeys(
    pool: &PgPool,
    user_id: Uuid,
) -> Result<
    Vec<(
        Uuid,
        Option<String>,
        serde_json::Value,
        String,
        Option<String>,
    )>,
    sqlx::Error,
> {
    sqlx::query_as(
        "SELECT id,
                label,
                credential,
                to_char(created_at, 'YYYY-MM-DD'),
                to_char(last_used_at, 'YYYY-MM-DD')
         FROM user_passkeys
         WHERE user_id = $1
         ORDER BY created_at DESC",
    )
    .bind(user_id)
    .fetch_all(pool)
    .await
}

pub async fn insert_passkey(
    pool: &PgPool,
    user_id: Uuid,
    label: &str,
    credential: serde_json::Value,
) -> Result<(), sqlx::Error> {
    sqlx::query("INSERT INTO user_passkeys (user_id, label, credential) VALUES ($1, $2, $3)")
        .bind(user_id)
        .bind(label)
        .bind(credential)
        .execute(pool)
        .await
        .map(|_| ())
}

pub async fn touch_passkey(
    pool: &PgPool,
    id: Uuid,
    credential: serde_json::Value,
) -> Result<(), sqlx::Error> {
    sqlx::query("UPDATE user_passkeys SET credential = $2, last_used_at = now() WHERE id = $1")
        .bind(id)
        .bind(credential)
        .execute(pool)
        .await
        .map(|_| ())
}

pub async fn delete_passkey(pool: &PgPool, user_id: Uuid, id: Uuid) -> Result<u64, sqlx::Error> {
    sqlx::query("DELETE FROM user_passkeys WHERE id = $1 AND user_id = $2")
        .bind(id)
        .bind(user_id)
        .execute(pool)
        .await
        .map(|result| result.rows_affected())
}

pub async fn insert_challenge(
    pool: &PgPool,
    user_id: Option<Uuid>,
    state: serde_json::Value,
) -> Result<Uuid, sqlx::Error> {
    sqlx::query("DELETE FROM webauthn_challenges WHERE expires_at < now()")
        .execute(pool)
        .await?;
    sqlx::query_scalar(
        "INSERT INTO webauthn_challenges (user_id, state, expires_at)
         VALUES ($1, $2, now() + make_interval(mins => $3))
         RETURNING id",
    )
    .bind(user_id)
    .bind(state)
    .bind(CHALLENGE_MINUTES)
    .fetch_one(pool)
    .await
}

pub async fn take_challenge(
    pool: &PgPool,
    id: Uuid,
) -> Result<Option<(Option<Uuid>, serde_json::Value)>, sqlx::Error> {
    sqlx::query_as(
        "DELETE FROM webauthn_challenges
         WHERE id = $1 AND expires_at > now()
         RETURNING user_id, state",
    )
    .bind(id)
    .fetch_optional(pool)
    .await
}
