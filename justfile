set shell := ["bash", "-cu"]
set dotenv-load := true

# Show the available project commands.
default:
    @just --list

# Start the development server with file watching and hot reload, against
# the local database (started, migrated, and seeded automatically).
dev: db-seed
    cargo leptos watch

# Start the local development PostgreSQL container and wait until it is
# healthy (compose --wait blocks on the container's healthcheck).
db-up:
    docker compose up -d --wait postgres

# Stop the local development PostgreSQL container (data persists in the volume).
db-down:
    docker compose down

# Apply pending migrations to the database (needs sqlx-cli; starts the
# database if needed).
db-migrate: db-up
    sqlx migrate run

# Drop the local database volume and rebuild it from scratch.
db-reset:
    docker compose down -v
    just db-seed

# Load the initial content, idempotently (starts and migrates first).
db-seed: db-migrate
    docker compose exec -T postgres psql -U portfolio -d portfolio -v ON_ERROR_STOP=1 < seeds/seed.sql

# Build the server and hydrated frontend for production.
build:
    cargo leptos build --release

# Start an existing production build.
start:
    ./target/release/portfolio

# Build and then start the production application.
prod: build
    ./target/release/portfolio

# Format Leptos view macros and ordinary Rust code.
format:
    leptosfmt './src/**/*.rs'
    cargo fmt --all

# Format, type-check, and run Clippy with warnings treated as errors.
check: format
    cargo check --all-features
    cargo clippy --all-targets --all-features -- -D warnings

# Run the complete test suite.
test:
    cargo test --all-features

# Run all local quality checks.
verify: check test
