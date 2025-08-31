# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CockpitApp is a multi-application monorepo built with Nx that includes several web applications with a comprehensive type-safe API integration system. The project uses Angular, Vue and React applications within the same workspace.

## Architecture

### Monorepo Structure

- **Apps**: Located in `apps/` directory
  - `cockpit`: React app (main dashboard)
  - `todo`: Vue 3 app with Pinia state management
  - `cv`: React app
  - `login`: React app
  - `ai-budget`: Angular app
- **Libraries**: Located in `libs/` directory
  - `shared/types/api-types`: Auto-generated OpenAPI TypeScript types
  - `shared/ui/react`: React UI components
  - `shared/ui/vue`: Vue UI components
  - `shared/utils`: Shared utilities
  - `todo/data-access`: Todo-specific data access layer

### Frontend Frameworks

- **Angular Applications**: Use basic Angular
- **Vue 3 Applications**: Use Pinia for state management, Vue Router, and PrimeVue UI
- **React Applications**: Use React Query (@tanstack/react-query), React Router, and custom UI components
- **Styling**: TailwindCSS 4.x with custom configurations

### API Integration

- **Type Generation**: Auto-generated from OpenAPI specification at `https://api.parda.me/openapi.json`
- **Type Library**: `@cockpit-app/api-types` provides type-safe API integration
- **Location**: `libs/shared/types/api-types/src/lib/openapi-types.ts`

## Development Commands

### Core Development

```bash
# Start development server (all apps)
npm start

# Build all applications and libraries
npm run build

# Watch mode for development builds
npm run watch

# Run all tests
npm test
```

### API Type Management

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

### Nx-Specific Commands

```bash
# Run specific app in development
nx serve <app-name>

# Build specific project
nx build <app-name>

# Run tests for specific project
nx test <project-name>

# Lint specific project
nx lint <project-name>

# Check project dependencies
nx show project <project-name> --web

# Type check specific project
nx typecheck <project-name>
```

### Testing

- **React Apps**: Use Vitest with React Testing Library
- **Vue Apps**: Use Vitest with Vue Test Utils
- **E2E**: Playwright for end-to-end testing

## Key Configuration Files

- `nx.json`: Nx workspace configuration with build caching and task orchestration
- `package.json`: Root package configuration with workspace scripts
- Individual project configurations in `apps/*/project.json` and `libs/*/project.json`

## Development Notes

### Type Safety

- Never manually edit `openapi-types.ts` - it's auto-generated
- For API requests and responses, always import types from `@cockpit-app/api-types`
- Don't use `any` type, prefer `unknown` or specific types

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

### Nx Workspace Conventions

- Use proper imports from `@cockpit-app` libraries
- Do not use relative imports in apps and libs
- When generating new js/ts libraries/apps, use vite and vitest

### Code Quality Guidelines

- Always provide concise, well-commented code
- Prefer modern ES6+ syntax for JavaScript/TypeScript
- Use clear, descriptive variable and function names
- Prefer Self-Explanatory Code Over Comments
- Use Comments to Explain Why, Not What
- Keep Comments Updated

### Build System

- All projects use Vite as the build tool
- Nx handles dependency graph and build orchestration
- TypeScript strict mode is enabled across all projects
- ESLint with TypeScript configuration for code quality

### Deployment

- Use Docker for containerization
- Use GitHub Actions for CI/CD pipelines
- Each app should have its own Dockerfile
- Use `docker compose` for multi-container setups
- Docker setup is only for production, development uses `nx serve` commands

## API Integration Pattern

The codebase uses a centralized API types system:

1. OpenAPI specification is fetched from the live API
2. TypeScript interfaces are generated using `openapi-typescript`
3. Generated types are used across all applications for type-safe API calls
4. Each app handles API calls through their respective data access patterns (React Query for React, custom services for Vue)
