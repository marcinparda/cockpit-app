# TwoDo — Vikunja

Self-hosted task manager on Raspberry Pi. External app — reference only.

- **App**: https://twodo.parda.me
- **Docker image**: `vikunja/vikunja:latest` (port `3456`)

## API

- **Base URL**: `https://twodo.parda.me/api/v1`
- **Swagger UI**: `https://twodo.parda.me/api/v1/docs`
- **OpenAPI spec**: `https://twodo.parda.me/api/v1/docs.json`

### Auth

```http
POST https://twodo.parda.me/api/v1/login
Content-Type: application/json

{ "username": "<VIKUNJA_USERNAME>", "password": "<VIKUNJA_PASSWORD>" }
```

Returns `token`. Use in subsequent requests:

```http
Authorization: Bearer <token>
```

Token is valid 24h. Env vars — see root `.env`.
