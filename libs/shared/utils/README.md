# @cockpit-app/shared/utils

A shared utilities library for the Cockpit App workspace containing common TypeScript utility functions.

## Features

### Predicate Functions

Type-safe predicate functions for runtime type checking with proper TypeScript type guards.

#### Available Predicates

- **`isString(value: unknown): value is string`** - Checks if a value is a string
- **`isNonEmptyString(value: unknown): value is string`** - Checks if a value is a non-empty string
- **`isEmptyOrWhitespaceString(value: unknown): boolean`** - Checks if a value is an empty string or contains only whitespace
- **`isMeaningfulString(value: unknown): value is string`** - Checks if a value is a string with meaningful content (not empty after trimming)

## Installation

The library is already configured in the workspace. Import functions as needed:

```typescript
import { isString, isMeaningfulString } from '@cockpit-app/shared/utils';
```

## Usage Examples

### Basic String Validation

```typescript
import { isString, isMeaningfulString } from '@cockpit-app/shared/utils';

// Basic string check
const userInput: unknown = 'hello world';
if (isString(userInput)) {
  // TypeScript knows userInput is a string here
  console.log(userInput.toUpperCase()); // "HELLO WORLD"
}

// Meaningful content validation
function processUserInput(input: unknown) {
  if (!isMeaningfulString(input)) {
    throw new Error('Please provide a valid input');
  }

  // TypeScript knows input is a string here
  return input.trim().toLowerCase();
}

processUserInput('  Hello World  '); // "hello world"
processUserInput(''); // throws Error
processUserInput('   '); // throws Error
processUserInput(123); // throws Error
```

### Form Validation

```typescript
import { isMeaningfulString, isEmptyOrWhitespaceString } from '@cockpit-app/shared/utils';

// Vue.js example
function handleFormSubmit(formData: { name: string; email: string }) {
  if (!isMeaningfulString(formData.name)) {
    showError('Name is required');
    return;
  }

  if (isEmptyOrWhitespaceString(formData.email)) {
    showError('Email cannot be empty');
    return;
  }

  // Process valid form data
  submitForm(formData);
}
```

### API Response Validation

```typescript
import { isString, isNonEmptyString } from '@cockpit-app/shared/utils';

interface TodoItem {
  id: number;
  name: string;
  description?: string;
}

function validateTodoItem(data: unknown): TodoItem {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid todo item data');
  }

  const item = data as any;

  if (!isNonEmptyString(item.name)) {
    throw new Error('Todo item must have a valid name');
  }

  return {
    id: item.id,
    name: item.name,
    description: isString(item.description) ? item.description : undefined,
  };
}
```

## Type Safety

All predicate functions act as TypeScript type guards, meaning they narrow the type of the tested value:

```typescript
function example(value: unknown) {
  // value is unknown here

  if (isString(value)) {
    // value is string here - TypeScript knows this!
    console.log(value.charAt(0));
    console.log(value.length);
  }

  if (isMeaningfulString(value)) {
    // value is string here too
    console.log(value.trim().toUpperCase());
  }
}
```

## Testing

The library includes comprehensive test coverage. Run tests with:

```bash
nx test utils
```

## Framework Compatibility

This library is framework-agnostic and can be used in:

- Angular applications
- Vue.js applications
- React applications
- Node.js servers
- Any TypeScript/JavaScript project

## Development

To add new utility functions:

1. Add the function to the appropriate file in `src/lib/`
2. Export it from `src/index.ts`
3. Add comprehensive tests
4. Update this README with usage examples
