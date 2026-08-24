use std::time::{Duration, Instant};

use axum::{extract::State, http::StatusCode, Json};
use serde::Serialize;
use sqlx::PgPool;
use time::{format_description::well_known::Rfc3339, OffsetDateTime};

const DATABASE_PING_TIMEOUT: Duration = Duration::from_secs(3);

#[derive(Serialize, PartialEq, Eq, Clone, Copy)]
#[serde(rename_all = "snake_case")]
enum DependencyStatus {
    Ok,
    Error,
    NotConfigured,
}

#[derive(Serialize)]
struct Dependency {
    status: DependencyStatus,
    #[serde(skip_serializing_if = "Option::is_none")]
    latency_ms: Option<u64>,
}

#[derive(Serialize)]
struct Dependencies {
    database: Dependency,
}

#[derive(Serialize)]
pub struct Health {
    status: &'static str,
    timestamp: String,
    dependencies: Dependencies,
}

pub async fn health(State(db): State<Option<PgPool>>) -> (StatusCode, Json<Health>) {
    let database = match db.as_ref() {
        Some(pool) => ping_database(pool).await,
        None => Dependency {
            status: DependencyStatus::NotConfigured,
            latency_ms: None,
        },
    };

    let (code, status) = if database.status == DependencyStatus::Error {
        (StatusCode::SERVICE_UNAVAILABLE, "degraded")
    } else {
        (StatusCode::OK, "ok")
    };

    let body = Health {
        status,
        timestamp: OffsetDateTime::now_utc()
            .format(&Rfc3339)
            .unwrap_or_default(),
        dependencies: Dependencies { database },
    };

    (code, Json(body))
}

async fn ping_database(pool: &PgPool) -> Dependency {
    let started = Instant::now();
    let ping = tokio::time::timeout(DATABASE_PING_TIMEOUT, sqlx::query("SELECT 1").execute(pool));

    let status = match ping.await {
        Ok(Ok(_)) => DependencyStatus::Ok,
        Ok(Err(error)) => {
            leptos::logging::error!("health: database ping failed: {error}");
            DependencyStatus::Error
        }
        Err(_) => {
            leptos::logging::error!(
                "health: database ping timed out after {DATABASE_PING_TIMEOUT:?}"
            );
            DependencyStatus::Error
        }
    };

    Dependency {
        status,
        latency_ms: (status == DependencyStatus::Ok)
            .then(|| u64::try_from(started.elapsed().as_millis()).unwrap_or(u64::MAX)),
    }
}
