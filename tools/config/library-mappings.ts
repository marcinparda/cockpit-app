/**
 * Library mapping configuration for OpenAPI type generation
 *
 * This file defines how OpenAPI tags and schemas map to specific Nx libraries.
 * Each mapping specifies which parts of the API belong to which library.
 */

import { LibraryMapping } from '../types/generation-types';

/**
 * Complete mapping of OpenAPI spec sections to Nx libraries
 */
export const LIBRARY_MAPPINGS: Record<string, LibraryMapping> = {
  'ai-budget-expenses': {
    library: '@cockpit-app/types-ai-budget-expenses',
    outputPath: 'libs/types/ai-budget/expenses/src',
    includedTags: ['ai-budget/expenses'],
    includedSchemas: ['Expense', 'ExpenseCreate', 'ExpenseUpdate'],
    description: 'TypeScript types for AI Budget expense management',
  },

  'ai-budget-categories': {
    library: '@cockpit-app/types-ai-budget-categories',
    outputPath: 'libs/types/ai-budget/categories/src',
    includedTags: ['ai-budget/categories'],
    includedSchemas: ['Category', 'CategoryCreate', 'CategoryUpdate'],
    description: 'TypeScript types for AI Budget category management',
  },

  'ai-budget-payment-methods': {
    library: '@cockpit-app/types-ai-budget-payment-methods',
    outputPath: 'libs/types/ai-budget/payment-methods/src',
    includedTags: ['ai-budget/payment_methods'],
    includedSchemas: [
      'PaymentMethod',
      'PaymentMethodCreate',
      'PaymentMethodUpdate',
    ],
    description: 'TypeScript types for AI Budget payment method management',
  },

  'todo-items': {
    library: '@cockpit-app/types-todo-items',
    outputPath: 'libs/types/todo/items/src',
    includedTags: ['todo/items'],
    includedSchemas: ['TodoItem', 'TodoItemCreate', 'TodoItemUpdate'],
    description: 'TypeScript types for Todo item management',
  },

  'todo-projects': {
    library: '@cockpit-app/types-todo-projects',
    outputPath: 'libs/types/todo/projects/src',
    includedTags: ['todo/projects'],
    includedSchemas: ['TodoProject', 'TodoProjectCreate', 'TodoProjectUpdate'],
    description: 'TypeScript types for Todo project management',
  },

  'shared-auth': {
    library: '@cockpit-app/types-shared-auth',
    outputPath: 'libs/types/shared/auth/src',
    includedTags: ['shared/auth'],
    includedSchemas: [
      'LoginRequest',
      'LoginResponse',
      'PasswordChangeRequest',
      'PasswordChangeResponse',
      'PasswordResetRequest',
      'PasswordResetResponse',
      'UserInfoResponse',
      'SimpleRefreshResponse',
    ],
    description: 'TypeScript types for authentication and authorization',
  },

  'shared-users': {
    library: '@cockpit-app/types-shared-users',
    outputPath: 'libs/types/shared/users/src',
    includedTags: ['shared/users'],
    includedSchemas: [
      'UserCreate',
      'UserUpdate',
      'UserWithRole',
      'UserWithPermissions',
      'UserPermissionAssign',
      'UserPermissionAssignResponse',
    ],
    description: 'TypeScript types for user management',
  },

  'shared-roles': {
    library: '@cockpit-app/types-shared-roles',
    outputPath: 'libs/types/shared/roles/src',
    includedTags: ['shared/roles'],
    includedSchemas: ['UserRole', 'Permission'],
    description: 'TypeScript types for role and permission management',
  },

  'shared-utils': {
    library: '@cockpit-app/types-shared-utils',
    outputPath: 'libs/types/shared/utils/src',
    includedTags: ['shared'],
    includedSchemas: [
      'OCRResponse',
      'Body_extract_text_from_image_api_v1_shared_ocr_post',
      'HTTPValidationError',
      'ValidationError',
    ],
    description: 'TypeScript types for shared utilities (OCR, validation errors, etc.)',
  },

  'system-health': {
    library: '@cockpit-app/types-system-health',
    outputPath: 'libs/types/system/health/src',
    includedTags: ['health'],
    includedSchemas: [],
    description: 'TypeScript types for system health monitoring',
  },

  'system-root': {
    library: '@cockpit-app/types-system-root',
    outputPath: 'libs/types/system/root/src',
    includedTags: ['root'],
    includedSchemas: [],
    description: 'TypeScript types for root system endpoints',
  },
};

/**
 * Gets all configured library names
 */
export function getAllLibraryNames(): string[] {
  return Object.keys(LIBRARY_MAPPINGS);
}

/**
 * Gets library mapping by name
 */
export function getLibraryMapping(name: string): LibraryMapping | undefined {
  return LIBRARY_MAPPINGS[name];
}

/**
 * Gets all included tags across all libraries
 */
export function getAllIncludedTags(): string[] {
  const tags = new Set<string>();

  Object.values(LIBRARY_MAPPINGS).forEach((mapping) => {
    mapping.includedTags.forEach((tag) => tags.add(tag));
  });

  return Array.from(tags).sort();
}

/**
 * Gets all included schemas across all libraries
 */
export function getAllIncludedSchemas(): string[] {
  const schemas = new Set<string>();

  Object.values(LIBRARY_MAPPINGS).forEach((mapping) => {
    mapping.includedSchemas?.forEach((schema) => schemas.add(schema));
  });

  return Array.from(schemas).sort();
}

/**
 * Finds which library a tag belongs to
 */
export function findLibraryForTag(tag: string): LibraryMapping | undefined {
  return Object.values(LIBRARY_MAPPINGS).find((mapping) =>
    mapping.includedTags.some((includedTag) => tag.includes(includedTag))
  );
}

/**
 * Finds which library a schema belongs to
 */
export function findLibraryForSchema(
  schema: string
): LibraryMapping | undefined {
  return Object.values(LIBRARY_MAPPINGS).find((mapping) =>
    mapping.includedSchemas?.includes(schema)
  );
}
