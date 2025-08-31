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

### Framework-Specific Patterns

- **Vue Apps**: Use Pinia stores for state management, follow Vue 3 Composition API patterns
- **React Apps**: Use React Query for server state, React Router for navigation
- **Angular Apps**: Use Angular services for state management
- **Shared Libraries**: Export utilities and types that can be consumed by both Vue and React apps

### Build System

- All projects use Vite as the build tool
- Nx handles dependency graph and build orchestration
- TypeScript strict mode is enabled across all projects
- ESLint with TypeScript configuration for code quality

## API Integration Pattern

The codebase uses a centralized API types system:

1. OpenAPI specification is fetched from the live API
2. TypeScript interfaces are generated using `openapi-typescript`
3. Generated types are used across all applications for type-safe API calls
4. Each app handles API calls through their respective data access patterns (React Query for React, custom services for Vue)
