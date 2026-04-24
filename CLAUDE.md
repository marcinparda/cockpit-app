# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CockpitApp is a multi-application monorepo built with Nx that includes several web applications with a comprehensive type-safe API integration system.

### API Integration

- **Type Generation**: Auto-generated from OpenAPI specification at `https://api.parda.me/openapi.json`
- **Type Library**: `@cockpit-app/api-types` provides type-safe API integration

### Deployment

- See .github dir

### External Services (Raspberry Pi)

Two external apps hosted on Raspberry Pi via Docker — not part of this codebase but planned for agent integration:

- **TwoDo** — Vikunja task manager. Full REST API, JWT auth, OpenAPI spec at `/api/v1/docs.json`.
- **Budget** — Actual Budget finance app. No native REST; uses `@actual-app/api` Node.js package. Community REST wrapper: `actual-http-api`.

## API Integration Pattern

The codebase uses a centralized API types system:

1. OpenAPI specification is fetched from the live API
2. TypeScript interfaces are generated using `openapi-typescript`
3. Generated types are used across all applications for type-safe API calls
4. Each app handles API calls through their respective data access patterns (React Query for React, custom services for Vue)

<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- You have access to the Nx MCP server and its tools, use them to help the user
- When answering questions about the repository, use the `nx_workspace` tool first to gain an understanding of the workspace architecture where applicable.
- When working in individual projects, use the `nx_project_details` mcp tool to analyze and understand the specific project structure and dependencies
- For questions around nx configuration, best practices or if you're unsure, use the `nx_docs` tool to get relevant, up-to-date docs. Always use this instead of assuming things about nx configuration
- If the user needs help with an Nx configuration or project graph error, use the `nx_workspace` tool to get any errors

<!-- nx configuration end-->
