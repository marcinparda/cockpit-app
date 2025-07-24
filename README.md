# CockpitApp

## API Types System

This project includes a comprehensive OpenAPI types system that provides type-safe API integration across applications. The system automatically generates TypeScript interfaces from the OpenAPI specification and organizes them into domain-specific libraries.

### 📚 Type Libraries

The project includes specialized type libraries organized by domain.

### 🔧 Available Scripts

#### Core Type Management

```bash
# Generate types from OpenAPI specification
npm run generate:types

# Generate types in watch mode (for development)
npm run generate:types:watch

# Force regeneration of all types
npm run generate:types:force

# Build all type libraries
npm run build:types

# Complete type update pipeline (generate + build + verify)
npm run update:types
```

#### Quality Assurance & Testing

```bash
# Run comprehensive type generation tests
npm run test:types

# Check for API drift (changes in OpenAPI spec)
npm run check:drift

# View type documentation
npm run docs:types
```

### 🔄 Automated Workflows

#### CI/CD Integration

```yaml
# .github/workflows/api-types.yml
- name: Check API Drift
  run: npm run check:drift

- name: Update Types if Needed
  run: npm run update:types
```

The type system includes automated drift detection for CI/CD pipelines:

```yaml
# .github/workflows/api-types.yml
- name: Check API Drift
  run: npm run check:drift

- name: Update Types if Needed
  run: npm run update:types

- name: Validate Type Coverage
  run: npm run verify:types
```

## Running unit tests

To execute unit tests with the Vitest.

````

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
````

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
