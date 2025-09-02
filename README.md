# CockpitApp

A multi-framework monorepo built with Nx showcasing modern web development across React, Vue 3, and Angular applications with comprehensive type-safe API integration.

## 🚀 Applications

- **[Todo App](apps/todo/README.md)** - Vue 3 + Pinia (✅ **Deployment Ready**)
- **[Cockpit Dashboard](apps/cockpit/README.md)** - React + React Query (✅ **Deployment Ready**)
- **[Login System](apps/login/README.md)** - React (✅ **Deployment Ready**)
- **[CV Portfolio](apps/cv/README.md)** - React (_In Development_)
- **[AI Budget](apps/ai-budget/README.md)** - Angular (_Template_)

## Architecture

### Monorepo Structure

```
cockpit-app/
├── apps/                    # Applications
│   ├── todo/               # Vue 3 + Pinia (Production)
│   ├── cockpit/           # React Dashboard
│   ├── cv/                # React Portfolio
│   ├── login/             # React Auth
│   └── ai-budget/         # Angular Template
├── libs/                   # Shared Libraries
│   ├── shared/
│   │   ├── types/api-types # Auto-generated OpenAPI types
│   │   ├── ui/react        # React UI components
│   │   ├── ui/vue          # Vue UI components
│   │   ├── data-access/    # Framework-specific data layers
│   │   └── utils/          # Shared utilities
│   └── todo/data-access   # Todo-specific data layer
```

### Module Boundaries & Future-Proofing

The architecture follows domain-driven design principles with clear separation of concerns:

- **Framework-specific UI libraries** - Shared components per framework
- **Specialized data-access layers** - Business logic separation
- **Auto-generated API types** - Type-safe integration across all apps
- **Domain-specific libraries** - (e.g., `todo/data-access`) ready for microservices extraction

_Future: Nx module boundaries will be enforced to maintain architectural integrity._

## Technology Stack

### Frontend Frameworks

- **React 19** - Modern hooks, React Query for state management
- **Vue 3** - Composition API, Pinia state management, PrimeVue UI
- **Angular 19** - Dependency injection, RxJS observables

### Build & Development

- **Nx 21** - Monorepo management, build caching, task orchestration
- **Vite 6** - Fast builds and HMR across all applications
- **TypeScript 5.8** - Strict mode enabled, comprehensive type safety
- **TailwindCSS 4** - Utility-first styling with custom configurations

### API Integration

- **OpenAPI TypeScript Generation** - Auto-generated from live API specification
- **Type-safe HTTP clients** - Framework-specific implementations
- **Centralized API types** - Shared across all applications (`@cockpit-app/api-types`)

## Development

### Quick Start

```bash
# Install dependencies
npm install

# Start all applications in development
npm start

# Start specific application
nx serve todo
nx serve cockpit
```

### API Type Management

```bash
# Update API types from live specification
npm run update:types

# Generate types from OpenAPI specification
npm run generate:types

# Fetch latest OpenAPI spec
npm run fetch-openapi

# Validate generated types
npm run validate:types
```

### Core Commands

```bash
# Build all projects
npm run build

# Watch mode for builds (development)
npm run watch

# Run tests
npm test

# Lint all projects
nx run-many -t lint

# Type check all projects
nx run-many -t typecheck
```

## Testing Strategy

Current implementation includes unit tests with framework-specific testing tools:

- **React**: Vitest + React Testing Library
- **Vue**: Vitest + Vue Test Utils
- **Angular**: Jasmine + Karma
- **E2E**: Playwright

_Planned: Migration to testing pyramid structure as applications mature from "move fast, break things" to production-ready._

## Deployment

### Development

Local development uses Nx serve commands with hot reload and fast builds via Vite.

### Production

Docker containerization with multi-stage builds for optimized production images.

**Raspberry Pi Deployment Showcase:**

- Repository: [nx-docker-rpi-deployment](https://github.com/marcinparda/nx-docker-rpi-deployment)
- Article: [Nx Docker RPi Deployment Guide](https://www.parda.me/blog/nx-docker-rpi-deployment/)

Each application includes its own Dockerfile with production-optimized builds.

## Documentation

- **API Documentation** - Auto-generated from OpenAPI specification
- **Architecture Decisions** - Documented in individual project READMEs
- **Development Workflows** - Nx-powered task orchestration and caching

## Key Features

- **Type Safety First** - End-to-end TypeScript with auto-generated API types
- **Framework Agnostic** - Choose the right tool for each application
- **Developer Experience** - Fast builds, hot reload, comprehensive tooling
- **Production Ready** - Docker deployment, testing infrastructure
- **Scalable Architecture** - Ready for DDD/microservices transition

---

_Built with modern development practices and architectural patterns for scalable, maintainable web applications._
