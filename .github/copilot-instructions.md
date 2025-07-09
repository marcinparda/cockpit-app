# Custom instructions for Copilot

## General
- Always provide concise, well-commented code.
- Prefer modern ES6+ syntax for JavaScript/TypeScript.
- Use clear, descriptive variable and function names.
- Always write JSDocs, or Python docstrings for all exported functions, classes and components.

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
- Use PrimeVue for UI components.
- Organize code into reusable components.
- Use Vue Router for navigation.
- Write tests with Vue Test Utils and Vitest.

## FastAPI
- Use Python type hints for all function signatures.
- Organize endpoints using APIRouter.
- Validate request/response models with Pydantic.
- Add OpenAPI documentation via FastAPI's built-in features.
- Write async endpoints where appropriate.
- Use pytest for testing API endpoints.

## Documentation
- Add JSDoc comments to exported functions and components in JS/TS.
- Do not write comments unless JSDoc.