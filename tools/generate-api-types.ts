#!/usr/bin/env node

/**
 * OpenAPI Types Generation Script
 * 
 * This script fetches the OpenAPI specification from the Cockpit API
 * and generates TypeScript types for all libraries based on the configured mappings.
 * 
 * Usage:
 *   npm run generate:types
 *   npm run generate:types:watch
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const OPENAPI_URL = 'https://api.parda.me/openapi.json';
const WORKSPACE_ROOT = join(__dirname, '..');

/**
 * Library mapping configuration
 * Maps OpenAPI tags and schemas to specific Nx libraries
 */
interface LibraryMapping {
  library: string;
  outputPath: string;
  includedTags: string[];
  includedSchemas?: string[];
  customTypes?: Record<string, string>;
}

const LIBRARY_MAPPINGS: Record<string, LibraryMapping> = {
  'ai-budget-expenses': {
    library: '@cockpit-app/types-ai-budget-expenses',
    outputPath: 'libs/types/ai-budget/expenses/src',
    includedTags: ['ai-budget/expenses'],
    includedSchemas: ['Expense', 'ExpenseCreate', 'ExpenseUpdate', 'ExpenseResponse'],
  },
  'ai-budget-categories': {
    library: '@cockpit-app/types-ai-budget-categories',
    outputPath: 'libs/types/ai-budget/categories/src',
    includedTags: ['ai-budget/categories'],
    includedSchemas: ['Category', 'CategoryCreate', 'CategoryUpdate', 'CategoryResponse'],
  },
  'ai-budget-payment-methods': {
    library: '@cockpit-app/types-ai-budget-payment-methods',
    outputPath: 'libs/types/ai-budget/payment-methods/src',
    includedTags: ['ai-budget/payment_methods'],
    includedSchemas: ['PaymentMethod', 'PaymentMethodCreate', 'PaymentMethodUpdate', 'PaymentMethodResponse'],
  },
  'todo-items': {
    library: '@cockpit-app/types-todo-items',
    outputPath: 'libs/types/todo/items/src',
    includedTags: ['todo/items'],
    includedSchemas: ['TodoItem', 'TodoItemCreate', 'TodoItemUpdate', 'TodoItemResponse'],
  },
  'todo-projects': {
    library: '@cockpit-app/types-todo-projects',
    outputPath: 'libs/types/todo/projects/src',
    includedTags: ['todo/projects'],
    includedSchemas: ['TodoProject', 'TodoProjectCreate', 'TodoProjectUpdate', 'TodoProjectResponse'],
  },
  'shared-auth': {
    library: '@cockpit-app/types-shared-auth',
    outputPath: 'libs/types/shared/auth/src',
    includedTags: ['shared/auth'],
    includedSchemas: ['LoginRequest', 'LoginResponse', 'LogoutResponse', 'RefreshTokenRequest', 'RefreshTokenResponse'],
  },
  'shared-users': {
    library: '@cockpit-app/types-shared-users',
    outputPath: 'libs/types/shared/users/src',
    includedTags: ['shared/users'],
    includedSchemas: ['User', 'UserCreate', 'UserUpdate', 'UserResponse'],
  },
  'shared-roles': {
    library: '@cockpit-app/types-shared-roles',
    outputPath: 'libs/types/shared/roles/src',
    includedTags: ['shared/roles'],
    includedSchemas: ['Role', 'RoleCreate', 'RoleUpdate', 'RoleResponse', 'Permission'],
  },
  'shared-utils': {
    library: '@cockpit-app/types-shared-utils',
    outputPath: 'libs/types/shared/utils/src',
    includedTags: ['shared'],
    includedSchemas: ['OCRResponse', 'OCRRequest'],
  },
  'system-health': {
    library: '@cockpit-app/types-system-health',
    outputPath: 'libs/types/system/health/src',
    includedTags: ['health'],
    includedSchemas: ['HealthResponse'],
  },
  'system-root': {
    library: '@cockpit-app/types-system-root',
    outputPath: 'libs/types/system/root/src',
    includedTags: ['root'],
    includedSchemas: ['RootResponse'],
  },
};

/**
 * Generation result interface
 */
interface GenerationResult {
  success: boolean;
  library: string;
  generatedFiles: string[];
  errors: string[];
  warnings: string[];
}

/**
 * Fetches the OpenAPI specification from the API
 */
async function fetchOpenAPISpec(url: string): Promise<Record<string, unknown>> {
  console.log(`🔍 Fetching OpenAPI spec from ${url}...`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const spec = await response.json() as Record<string, unknown>;
    const paths = spec.paths as Record<string, unknown> || {};
    console.log(`✅ Successfully fetched OpenAPI spec (${Object.keys(paths).length} paths)`);
    return spec;
  } catch (error) {
    console.error(`❌ Failed to fetch OpenAPI spec: ${error}`);
    throw error;
  }
}

/**
 * Generates TypeScript types for a specific library
 */
async function generateTypesForLibrary(
  libraryName: string,
  mapping: LibraryMapping,
  _spec: Record<string, unknown>
): Promise<GenerationResult> {
  const result: GenerationResult = {
    success: false,
    library: mapping.library,
    generatedFiles: [],
    errors: [],
    warnings: [],
  };

  try {
    console.log(`🔨 Generating types for ${mapping.library}...`);

    // Create output directory if it doesn't exist
    const outputPath = join(WORKSPACE_ROOT, mapping.outputPath);
    await fs.mkdir(outputPath, { recursive: true });

    // For now, create a placeholder file
    // In Step 2, we'll implement the actual type generation logic
    const typesFile = join(outputPath, `${libraryName}.types.ts`);
    const placeholderContent = `/**
 * Generated TypeScript types for ${mapping.library}
 * 
 * This file will contain auto-generated types from OpenAPI spec:
 * ${OPENAPI_URL}
 * 
 * Tags: ${mapping.includedTags.join(', ')}
 * Schemas: ${mapping.includedSchemas?.join(', ') || 'TBD'}
 */

// Placeholder - will be replaced with actual generated types
export interface Placeholder {
  message: string;
}
`;

    await fs.writeFile(typesFile, placeholderContent);

    // Update the index.ts file
    const indexFile = join(outputPath, 'index.ts');
    const indexContent = `// Auto-generated barrel export file for ${mapping.library}
export * from './${libraryName}.types';
`;

    await fs.writeFile(indexFile, indexContent);

    result.generatedFiles = [typesFile, indexFile];
    result.success = true;
    
    console.log(`✅ Generated types for ${mapping.library}`);
  } catch (error) {
    console.error(`❌ Failed to generate types for ${mapping.library}:`, error);
    result.errors.push(String(error));
  }

  return result;
}

/**
 * Main function
 */
async function main() {
  console.log('🚀 Starting OpenAPI types generation...\n');

  try {
    // Step 1: Fetch OpenAPI specification
    const spec = await fetchOpenAPISpec(OPENAPI_URL);

    // Step 2: Generate types for each library
    const results: GenerationResult[] = [];
    
    for (const [libraryName, mapping] of Object.entries(LIBRARY_MAPPINGS)) {
      const result = await generateTypesForLibrary(libraryName, mapping, spec);
      results.push(result);
    }

    // Step 3: Report results
    console.log('\n📊 Generation Summary:');
    console.log('='.repeat(50));
    
    const successful = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    
    console.log(`✅ Successful: ${successful.length}/${results.length} libraries`);
    if (failed.length > 0) {
      console.log(`❌ Failed: ${failed.length}/${results.length} libraries`);
      failed.forEach(result => {
        console.log(`   - ${result.library}: ${result.errors.join(', ')}`);
      });
    }

    console.log('\n🎉 Type generation completed!');
    console.log('\nNext steps:');
    console.log('1. Run `npm run build:types` to build all type libraries');
    console.log('2. Import types in your applications');
    console.log('3. Enjoy type safety! 🎯');

  } catch (error) {
    console.error('💥 Type generation failed:', error);
    process.exit(1);
  }
}

// Watch mode support
const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {
  console.log('👀 Watch mode is not yet implemented');
  console.log('For now, run the script manually when the API changes');
  console.log('Run: npm run generate:types\n');
}

// Run the main function if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

export { main, fetchOpenAPISpec, generateTypesForLibrary, LIBRARY_MAPPINGS };
