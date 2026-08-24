use leptos::prelude::*;

use super::SessionInfo;

#[must_use]
pub fn describe_device(user_agent: Option<&str>) -> String {
    let Some(agent) = user_agent.map(str::trim).filter(|agent| !agent.is_empty()) else {
        return "Unknown device".to_string();
    };

    let browser = if agent.contains("Firefox/") {
        "Firefox"
    } else if agent.contains("Edg/") {
        "Edge"
    } else if agent.contains("OPR/") || agent.contains("Opera") {
        "Opera"
    } else if agent.contains("Chrome/") || agent.contains("Chromium/") {
        "Chrome"
    } else if agent.contains("Safari/") {
        "Safari"
    } else if agent.starts_with("curl/") {
        "curl"
    } else {
        "Unknown browser"
    };

    let platform = if agent.contains("Android") {
        "Android"
    } else if agent.contains("iPhone") || agent.contains("iPad") {
        "iOS"
    } else if agent.contains("Mac OS X") || agent.contains("Macintosh") {
        "macOS"
    } else if agent.contains("Windows") {
        "Windows"
    } else if agent.contains("CrOS") {
        "ChromeOS"
    } else if agent.contains("Linux") || agent.contains("X11") {
        "Linux"
    } else {
        return browser.to_string();
    };

    format!("{browser} on {platform}")
}

#[cfg(feature = "ssr")]
pub(crate) async fn active_sessions(
    pool: &sqlx::PgPool,
    user_id: uuid::Uuid,
) -> Result<Vec<SessionInfo>, ServerFnError> {
    let current = crate::server::request_session_token()
        .map(|token| crate::server::hash_session_token(&token))
        .unwrap_or_default();

    let rows = super::repository::sessions_for_user(pool, user_id, &current)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?;

    Ok(rows
        .into_iter()
        .map(
            |(id, ip, user_agent, created, last_seen, current)| SessionInfo {
                id: id.to_string(),
                device: describe_device(user_agent.as_deref()),
                ip: ip.unwrap_or_else(|| "unknown".to_string()),
                created,
                last_seen,
                current,
            },
        )
        .collect())
}

#[server(endpoint = "auth/sessions", input = server_fn::codec::GetUrl)]
pub async fn session_list() -> Result<Vec<SessionInfo>, ServerFnError> {
    crate::server::cache_reads(true);
    let (pool, user_id) = crate::server::require_admin_user().await?;
    active_sessions(&pool, user_id).await
}

#[server(endpoint = "auth/session_revoke")]
pub async fn session_revoke(id: String) -> Result<(), ServerFnError> {
    let (pool, user_id) = crate::server::require_admin_user().await?;
    let id = uuid::Uuid::parse_str(&id).map_err(|_| crate::server::not_found("unknown session"))?;
    let removed = super::repository::delete_session_by_id(&pool, user_id, id)
        .await
        .map_err(|error| ServerFnError::new(error.to_string()))?;
    if removed == 0 {
        return Err(crate::server::not_found("unknown session"));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::describe_device;

    #[test]
    fn names_the_browser_and_platform() {
        assert_eq!(
            describe_device(Some(
                "Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0"
            )),
            "Firefox on Linux"
        );
        assert_eq!(
            describe_device(Some(
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 \
                 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
            )),
            "Safari on macOS"
        );
    }

    #[test]
    fn chromium_families_are_not_all_reported_as_chrome() {
        let edge = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like \
                    Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0";
        assert_eq!(describe_device(Some(edge)), "Edge on Windows");

        let chrome = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like \
                      Gecko) Chrome/120.0.0.0 Safari/537.36";
        assert_eq!(describe_device(Some(chrome)), "Chrome on Windows");
    }

    #[test]
    fn missing_or_unparseable_agents_still_render() {
        assert_eq!(describe_device(None), "Unknown device");
        assert_eq!(describe_device(Some("   ")), "Unknown device");
        assert_eq!(describe_device(Some("curl/8.5.0")), "curl");
    }
}
