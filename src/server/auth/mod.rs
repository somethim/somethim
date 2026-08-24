pub mod login;
pub mod logout;
pub mod passkeys;
#[cfg(feature = "ssr")]
pub mod repository;
pub mod security;
pub mod session;
pub mod sessions;

use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct AdminAccount {
    pub email: String,
    pub totp_enabled: bool,
    pub passkeys: Vec<PasskeyInfo>,
    pub sessions: Vec<SessionInfo>,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct PasskeyInfo {
    pub id: String,
    pub label: String,
    pub created: String,
    pub last_used: Option<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct PasskeyChallenge {
    pub challenge_id: String,
    pub options: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct SessionInfo {
    pub id: String,
    pub device: String,
    pub ip: String,
    pub created: String,
    pub last_seen: String,
    pub current: bool,
}

#[derive(Clone, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub struct TotpSetup {
    pub secret: String,
    pub qr_base64: String,
    pub otpauth_url: String,
}

#[cfg(feature = "ssr")]
pub(crate) fn build_totp(
    secret_base32: &str,
    account: &str,
) -> Result<totp_rs::Totp, leptos::prelude::ServerFnError> {
    use leptos::prelude::ServerFnError;
    let secret = totp_rs::Secret::try_from_base32(secret_base32)
        .map_err(|_| ServerFnError::new("invalid TOTP secret"))?;
    totp_rs::Builder::new()
        .with_secret(secret)
        .with_issuer(Some("arbikullakshi.com"))
        .with_account_name(account)
        .build()
        .map_err(|error| ServerFnError::new(error.to_string()))
}

#[must_use]
pub fn normalize_email(email: &str) -> Option<String> {
    let email = email.trim().to_lowercase();
    let (local, domain) = email.split_once('@')?;
    if local.is_empty() || !domain.contains('.') || domain.starts_with('.') || domain.ends_with('.')
    {
        return None;
    }
    if email.split('@').count() != 2 || email.contains(char::is_whitespace) {
        return None;
    }
    Some(email)
}

#[cfg(test)]
mod tests {
    use super::normalize_email;

    #[test]
    fn normalizes_case_and_surrounding_space() {
        assert_eq!(
            normalize_email("  Arbi@Example.COM "),
            Some("arbi@example.com".to_string())
        );
    }

    #[test]
    fn rejects_addresses_that_cannot_be_delivered() {
        for candidate in [
            "",
            "arbi",
            "arbi@",
            "@example.com",
            "arbi@example",
            "arbi@.com",
            "arbi@example.",
            "one@two@example.com",
            "ar bi@example.com",
        ] {
            assert_eq!(normalize_email(candidate), None, "accepted {candidate:?}");
        }
    }
}
