# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CockpitApp is a multi-application monorepo built with Nx that includes several web applications with a comprehensive type-safe API integration system.

### API Integration

- **Type Generation**: Auto-generated from OpenAPI specification at `https://api.parda.me/openapi.json`
- **Type Library**: `@cockpit-app/api-types` provides type-safe API integration

#### API Type Management

```bash
# Fetch latest OpenAPI specification
npm run fetch-openapi

# Generate TypeScript types from OpenAPI spec
npm run generate:types

# Update types (fetch + generate)
npm run update:types

# Validate generated types
npm run validate:types
```

### Framework-Specific Patterns

#### React

- Use functional components and React Hooks
- Prefer arrow functions for component definitions
- Use `function` for event handlers and functions in general instead of arrow functions
- Always include TypeScript interfaces for component props
- Use React Testing Library and Jest for testing

#### Vue

- Use the Composition API for new components
- Prefer `<script setup lang="ts">` for TypeScript support
- Use PrimeVue for UI components in vue-ui lib
- In apps (like todo) use components from vue-ui lib
- Use Vue Router for navigation
- Write tests with Vue Test Utils and Vitest

#### Angular

- Use Angular CLI conventions for file and folder structure
- Implement services for business logic and dependency injection
- Use RxJS observables for asynchronous operations
- Prefer OnPush change detection for performance
- Write unit tests with Jasmine and Karma

### Code Quality Guidelines

- If you need to use Comments to Explain Why, Not What
- Keep Comments Updated
- Use `logger` from '@cockpit-app/shared-utils' if logging information is necessary

### Deployment

- See .github dir

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
