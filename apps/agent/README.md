# Agent App

AI agent interface for CV tailoring. Authenticated users paste a job offer, the agent searches for company context, reads the base CV from Redis, generates a tailored preset, and asks for confirmation before saving.

Installable as a PWA (`agent.parda.me`). Network required — no offline agent.

## Features

- **Conversation threads** — persistent history per session, stored in PostgreSQL
- **CV tailoring agent** — extracts company name, searches the web (Serper), reads base CV, proposes a trimmed preset
- **Streaming SSE** — status pills during tool execution, streamed final response
- **Confirm flow** — agent pauses before writing; `ConfirmCard` shows preview, user confirms or cancels
- **Model selector** — per-conversation Copilot-style dropdown (Opus / Sonnet / Haiku)
- **PWA** — installable, `standalone` display mode

## Agent flow

```
1. User pastes job offer text
2. Agent: extract company name via Claude
3. Agent: search_company(name) → Serper API → culture / values / buzzwords
4. Agent: get_cv_base_preset() → all 8 sections from Redis "base" preset
5. Agent: generates tailored preset
     - drops irrelevant skills
     - rewrites experience bullets (keeps 3 most relevant per role)
     - decides which sections to include
6. SSE: streams status pills ("Searching the web...", "Reading your base CV...")
7. SSE: confirm_required → ConfirmCard with section preview
8. User clicks "Confirm & save"
9. SSE: agent writes preset to Redis, streams success message
```

## Project structure

```
apps/agent/src/
├── app/
│   ├── app.tsx              # Auth gate, layout, confirm/cancel wiring
│   └── providers.tsx        # TanStack Query provider
├── components/
│   ├── Sidebar.tsx          # Conversation list + new/delete actions
│   ├── ChatThread.tsx       # Messages, input box, model selector in header
│   ├── MessageBubble.tsx    # User / assistant bubble with Markdown rendering
│   ├── ModelSelector.tsx    # Copilot-style <select> dropdown
│   ├── StatusMessage.tsx    # Animated status pill during tool execution
│   └── ConfirmCard.tsx      # Preset preview + Confirm / Cancel buttons
├── hooks/
│   ├── useConversations.ts  # TanStack Query CRUD for thread list
│   └── useStreamingChat.ts  # fetch-based SSE consumer, event parser
├── api/
│   └── agent.ts             # Typed wrappers for all /api/v1/agent/* endpoints
└── styles.css               # Tailwind import
```

## SSE event protocol

| Event | Payload | When |
|-------|---------|------|
| `status` | `{ text }` | During tool execution |
| `chunk` | `{ text }` | Final assistant text (streamed) |
| `confirm_required` | `{ action, preset_name, preview }` | Before writing preset |
| `done` | `{}` | Stream complete |
| `error` | `{ text }` | Agent error |

## Confirm / cancel flow

- `confirm_required` renders `ConfirmCard` inline in chat
- "Confirm & save" sends `"yes"` as next user message — backend detects pending action in last assistant message metadata and executes the Redis write directly
- "Cancel" sends `"no"` — backend clears pending action, streams cancellation message

## Development

```bash
nx serve agent      # dev server on :4206
nx build agent      # production build → dist/apps/agent
nx lint agent       # lint
```

## Environment

No client-side env vars needed. All API keys (`ANTHROPIC_API_KEY`, `SERPER_API_KEY`) are backend-only.

## Redis key conventions (read/written by agent)

| Key | Content |
|-----|---------|
| `base:cv:{section}` | Source of truth — agent reads, never writes |
| `{preset-id}:cv:{section}` | Agent-created preset sections |
| `registry:cv:presets` | `Preset[]` — agent appends new entry on save |
