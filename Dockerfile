# Build stage: compiles the server binary and the hydrated WASM bundle.
FROM rust:1.97-slim AS builder

# aws-lc-sys (pulled in by rustls) needs cmake, a C compiler, and perl.
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        cmake \
        curl \
        perl \
        pkg-config \
    && rm -rf /var/lib/apt/lists/*

RUN rustup target add wasm32-unknown-unknown

# cargo-binstall fetches the prebuilt cargo-leptos instead of compiling it.
RUN curl -L --proto '=https' --tlsv1.2 -sSf \
        https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh \
        | bash \
    && cargo binstall cargo-leptos --locked -y

WORKDIR /build
COPY . .
RUN cargo leptos build --release

# Runtime stage: only the binary, the site assets, and TLS roots.
FROM debian:bookworm-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --system --create-home --home-dir /app --shell /usr/sbin/nologin portfolio

WORKDIR /app
COPY --from=builder /build/target/release/portfolio /app/portfolio
COPY --from=builder /build/target/site /app/site

ENV LEPTOS_OUTPUT_NAME=portfolio \
    LEPTOS_SITE_ROOT=/app/site \
    LEPTOS_SITE_ADDR=0.0.0.0:3000 \
    LEPTOS_ENV=PROD

USER portfolio
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD curl -fsS http://127.0.0.1:3000/api/health || exit 1

ENTRYPOINT ["/app/portfolio"]
