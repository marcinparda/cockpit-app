# CockpitApp

## API Types System

This project includes a comprehensive OpenAPI types system that provides type-safe API integration across applications. The system automatically generates TypeScript interfaces from the OpenAPI specification.

### 📚 Type Libraries

All API types are now provided by a single library: `@cockpit-app/api-types`.

### 🔧 Available Scripts

#### Core Scripts

```bash
# Start the development server (all apps)
npm start

# Build all apps and libraries
npm run build

# Watch mode for builds (development)
npm run watch

# Run all tests
npm test

# Generate types from OpenAPI specification
npm run generate:types

# Fetch latest OpenAPI spec
npm run fetch-openapi

# Update types (fetch + generate)
npm run update:types
```
