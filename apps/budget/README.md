# Budget — Actual Budget

Self-hosted personal finance app on Raspberry Pi. External app — reference only.

- **App**: https://budget.parda.me
- **Docker image**: `ghcr.io/marcinparda/actual:latest` (port `5006`)

## API

No native REST API. Uses Node.js package `@actual-app/api` — cannot run in browser.

Planned: deploy [`actual-http-api`](https://github.com/jhonderson/actual-http-api) REST wrapper on Pi to expose REST endpoints.

Env vars — see root `.env`.
