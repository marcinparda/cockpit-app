# Custom instructions for Copilot

## General

- Always provide concise, well-commented code.
- Prefer modern ES6+ syntax for JavaScript/TypeScript.
- Use clear, descriptive variable and function names.
- Always write JSDocs, or Python docstrings for all exported functions, classes and components.
- For saving you thoughts or summaries use .md extension files, save them in .ai folder in appropriate folder. If folder does not exist, create it.
- Appropriate folder for .md thoughts/summaries should be the name of the feature/fix/improvement you are working on right now. .md files names convention:
  - requirements.md - for requirements of the feature - these should be buisness requirements, not technical ones
  - initial-notes.md - my for initial notes about the feature
  - development-plan.md - for development plan of the feature, this should be technical plan, based on business requirements
  - step-x.md - for each step of the feature development, where x is the number of the step
- You can find openapi API documentation on page https://api.parda.me/openapi.json.

## React

- Use functional components and React Hooks (e.g., useState, useEffect).
- Prefer arrow functions for component definitions.
- Use `function` for event handlers and functions in general instead of arrow functions.
- Use TypeScript for type safety.
- Always include TypeScript interfaces for component props.
- When writing tests, use React Testing Library and Jest.
-

## Angular

- Use Angular CLI conventions for file and folder structure.
- Use TypeScript and Angular decorators.
- Implement services for business logic and dependency injection.
- Use RxJS observables for asynchronous operations.
- Prefer OnPush change detection for performance.
- Write unit tests with Jasmine and Karma.

## Vue

- Use the Composition API for new components.
- Prefer `<script setup lang="ts">` for TypeScript support.
- Use PrimeVue for UI components in vue-ui lib.
- In apps (like todo) use components from vue-ui lib.
- Organize code into reusable components.
- Use Vue Router for navigation.
- Write tests with Vue Test Utils and Vitest.

## TypeScript

- For types for requests and responses use types libs like `@cockpit-app/types-ai-budget-expenses`, `@cockpit-app/types-todo-items`, etc.
- Don't use `any` type, prefer `unknown` or specific types.

## Documentation

- Add JSDoc comments to exported functions and components in JS/TS.
- Do not write comments unless JSDoc.

## NX

- Use NX workspace conventions for organizing apps and libraries.
- Use proper imports from `@cockpit-app` libraries.
- Do not use relative imports in apps and libs.
- When generating new js/ts libraries/apps, use vite and vitest.

## Deployment

- Use Docker for containerization.
- Use GitHub Actions for CI/CD pipelines.
- Deploys apps on personal Raspberry Pi machine.
- Each app should have its own Dockerfile.
- Use `docker compose` for multi-container setups.
- Docker setup is only for production, development uses `nx serve` commands.
