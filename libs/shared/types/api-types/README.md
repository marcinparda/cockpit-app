# API Type Validation

This directory contains the validation script for checking if API types are up to date with the remote OpenAPI specification.

## Usage

### Validate Types

```bash
npm run validate:types
```

This script will:

- Fetch the latest OpenAPI specification from `https://api.parda.me/openapi.json`
- Compare it with the local cached version using SHA-256 hashing
- Exit with status 0 if types are up to date, 1 if they need updating

### Update Types (if needed)

```bash
npm run update:types
```

This will fetch the latest OpenAPI spec and regenerate the TypeScript types.

## Files

- `validateTypes.ts` - The main validation script
- `openapi.json` - Local cached version of the OpenAPI specification
- `lib/openapi-types.d.ts` - Generated TypeScript type definitions

## CI/CD Integration

The validation script is used in the `.github/workflows/validate-types.yml` workflow to ensure types are always up to date in CI/CD pipelines.

## Error Scenarios

1. **Missing local file**: Script will exit with code 1 and suggest running `update:types`
2. **Outdated types**: Script will exit with code 1 and show hash comparison
3. **Network issues**: Script will exit with code 1 and show the error
4. **Invalid JSON**: Script will exit with code 1 and show parsing error
