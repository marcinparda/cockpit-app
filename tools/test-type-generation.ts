#!/usr/bin/env node

/**
 * Type Generation Testing Script
 *
 * This script tests the type generation process to ensure it works correctly
 * and produces valid TypeScript types.
 *
 * Features:
 * - Tests OpenAPI spec accessibility
 * - Validates type generation process
 * - Checks TypeScript compilation
 * - Verifies generated file structure
 *
 * Usage:
 *   npm run test:types
 *   tsx tools/test-type-generation.ts
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const OPENAPI_URL = 'https://api.parda.me/openapi.json';
const WORKSPACE_ROOT = join(__dirname, '..');

interface TestResult {
  name: string;
  status: 'PASS' | 'FAIL';
  message?: string;
  duration?: number;
}

interface TestSuite {
  name: string;
  results: TestResult[];
  success: boolean;
  totalTests: number;
  passedTests: number;
  duration: number;
}

/**
 * Execute a shell command and return the result
 */
function executeCommand(
  command: string,
  cwd?: string
): { stdout: string; success: boolean } {
  try {
    const stdout = execSync(command, {
      cwd: cwd || WORKSPACE_ROOT,
      encoding: 'utf-8',
      stdio: 'pipe',
    });
    return { stdout, success: true };
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';
    if (
      error &&
      typeof error === 'object' &&
      'stdout' in error &&
      error.stdout
    ) {
      errorMessage = String(error.stdout);
    } else if (
      error &&
      typeof error === 'object' &&
      'stderr' in error &&
      error.stderr
    ) {
      errorMessage = String(error.stderr);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    return {
      stdout: errorMessage,
      success: false,
    };
  }
}

/**
 * Test OpenAPI spec accessibility
 */
async function testOpenAPIAccess(): Promise<TestResult> {
  const startTime = Date.now();

  try {
    console.log('🔗 Testing OpenAPI spec accessibility...');
    const response = await fetch(OPENAPI_URL);

    if (!response.ok) {
      return {
        name: 'OpenAPI Accessibility',
        status: 'FAIL',
        message: `HTTP ${response.status}: ${response.statusText}`,
        duration: Date.now() - startTime,
      };
    }

    const spec = await response.json();

    if (!spec.openapi && !spec.swagger) {
      return {
        name: 'OpenAPI Accessibility',
        status: 'FAIL',
        message: 'Invalid OpenAPI specification format',
        duration: Date.now() - startTime,
      };
    }

    const pathCount = Object.keys(spec.paths || {}).length;
    const schemaCount = Object.keys(spec.components?.schemas || {}).length;

    return {
      name: 'OpenAPI Accessibility',
      status: 'PASS',
      message: `✅ OpenAPI spec accessible (${pathCount} paths, ${schemaCount} schemas)`,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      name: 'OpenAPI Accessibility',
      status: 'FAIL',
      message: `Network error: ${
        error instanceof Error ? error.message : String(error)
      }`,
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Test type generation process
 */
async function testTypeGeneration(): Promise<TestResult> {
  const startTime = Date.now();

  try {
    console.log('🔧 Testing type generation process...');

    // Run type generation
    const result = executeCommand('npm run generate:types');

    if (!result.success) {
      return {
        name: 'Type Generation',
        status: 'FAIL',
        message: `Generation failed: ${result.stdout}`,
        duration: Date.now() - startTime,
      };
    }

    // Check if type files were created
    const expectedFiles = [
      'libs/types/ai-budget/expenses/src/ai-budget-expenses.types.ts',
      'libs/types/todo/items/src/todo-items.types.ts',
      'libs/types/shared/auth/src/shared-auth.types.ts',
    ];

    for (const file of expectedFiles) {
      const filePath = join(WORKSPACE_ROOT, file);
      if (!existsSync(filePath)) {
        return {
          name: 'Type Generation',
          status: 'FAIL',
          message: `Missing generated file: ${file}`,
          duration: Date.now() - startTime,
        };
      }
    }

    return {
      name: 'Type Generation',
      status: 'PASS',
      message: `✅ Type generation successful (${expectedFiles.length} files verified)`,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      name: 'Type Generation',
      status: 'FAIL',
      message: `Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Test TypeScript compilation of generated types
 */
async function testTypeScriptCompilation(): Promise<TestResult> {
  const startTime = Date.now();

  try {
    console.log('⚙️ Testing TypeScript compilation...');

    // Create a temporary test directory within the workspace
    const tempDir = join(WORKSPACE_ROOT, 'tmp', 'type-test-' + Date.now());
    require('fs').mkdirSync(tempDir, { recursive: true });
    const testFile = join(tempDir, 'test-imports.ts');

    // Write test imports
    const testContent = `
// Test imports of generated types
import type { Expense, ExpenseCreate } from '@cockpit-app/types-ai-budget-expenses';
import type { TodoItem, TodoItemCreate } from '@cockpit-app/types-todo-items';
import type { LoginRequest, LoginResponse } from '@cockpit-app/types-shared-auth';

// Test that types can be used
const expense: Expense = {
  id: 1,
  amount: 25.50,
  description: 'Test',
  category_id: 1,
  payment_method_id: 1,
  date: '2024-01-01',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

const todoItem: TodoItem = {
  id: 1,
  name: 'Test',
  description: 'Test description',
  is_closed: false,
  project_id: 1,
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z'
};

const loginRequest: LoginRequest = {
  email: 'test@example.com',
  password: 'password'
};

export { expense, todoItem, loginRequest };
`;

    require('fs').writeFileSync(testFile, testContent);

    // Create a temporary tsconfig.json that extends the base configuration
    const tempTsConfig = join(tempDir, 'tsconfig.json');
    const relativePath = require('path').relative(
      tempDir,
      join(WORKSPACE_ROOT, 'tsconfig.base.json')
    );
    const tsConfigContent = `{
  "extends": "${relativePath}",
  "compilerOptions": {
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["test-imports.ts"],
  "exclude": ["node_modules"]
}`;
    require('fs').writeFileSync(tempTsConfig, tsConfigContent);

    // Try to compile with TypeScript using the temporary config
    const result = executeCommand(
      `"${join(
        WORKSPACE_ROOT,
        'node_modules/.bin/tsc'
      )}" --project "${tempTsConfig}"`,
      WORKSPACE_ROOT
    );

    // Clean up
    rmSync(tempDir, { recursive: true, force: true });

    if (!result.success) {
      return {
        name: 'TypeScript Compilation',
        status: 'FAIL',
        message: `Compilation failed: ${result.stdout}`,
        duration: Date.now() - startTime,
      };
    }

    return {
      name: 'TypeScript Compilation',
      status: 'PASS',
      message: '✅ Generated types compile successfully',
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      name: 'TypeScript Compilation',
      status: 'FAIL',
      message: `Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Test generated file structure
 */
async function testFileStructure(): Promise<TestResult> {
  const startTime = Date.now();

  try {
    console.log('📁 Testing generated file structure...');

    const requiredStructure = [
      'libs/types/ai-budget/expenses/src/index.ts',
      'libs/types/ai-budget/expenses/src/ai-budget-expenses.types.ts',
      'libs/types/todo/items/src/index.ts',
      'libs/types/todo/items/src/todo-items.types.ts',
      'libs/types/shared/auth/src/index.ts',
      'libs/types/shared/auth/src/shared-auth.types.ts',
    ];

    const missingFiles: string[] = [];
    const invalidFiles: string[] = [];

    for (const file of requiredStructure) {
      const filePath = join(WORKSPACE_ROOT, file);

      if (!existsSync(filePath)) {
        missingFiles.push(file);
        continue;
      }

      // Check if file has content
      const content = readFileSync(filePath, 'utf-8').trim();
      if (content.length === 0) {
        invalidFiles.push(file);
      }
    }

    if (missingFiles.length > 0 || invalidFiles.length > 0) {
      const errors = [];
      if (missingFiles.length > 0) {
        errors.push(`Missing files: ${missingFiles.join(', ')}`);
      }
      if (invalidFiles.length > 0) {
        errors.push(`Empty files: ${invalidFiles.join(', ')}`);
      }

      return {
        name: 'File Structure',
        status: 'FAIL',
        message: errors.join('; '),
        duration: Date.now() - startTime,
      };
    }

    return {
      name: 'File Structure',
      status: 'PASS',
      message: `✅ All required files present (${requiredStructure.length} files)`,
      duration: Date.now() - startTime,
    };
  } catch (error) {
    return {
      name: 'File Structure',
      status: 'FAIL',
      message: `Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
      duration: Date.now() - startTime,
    };
  }
}

/**
 * Run all tests
 */
async function runTests(): Promise<TestSuite> {
  const suiteStartTime = Date.now();
  console.log('🧪 Running Type Generation Tests...\n');

  const tests = [
    testOpenAPIAccess,
    testTypeGeneration,
    testTypeScriptCompilation,
    testFileStructure,
  ];

  const results: TestResult[] = [];

  for (const test of tests) {
    const result = await test();
    results.push(result);

    const status = result.status === 'PASS' ? '✅' : '❌';
    const duration = result.duration ? `(${result.duration}ms)` : '';
    console.log(`${status} ${result.name} ${duration}`);
    if (result.message) {
      console.log(`   ${result.message}`);
    }
    console.log('');
  }

  const passedTests = results.filter((r) => r.status === 'PASS').length;
  const success = passedTests === results.length;
  const duration = Date.now() - suiteStartTime;

  return {
    name: 'Type Generation Test Suite',
    results,
    success,
    totalTests: results.length,
    passedTests,
    duration,
  };
}

/**
 * Print test summary
 */
function printSummary(suite: TestSuite): void {
  console.log('📊 Test Summary');
  console.log('===============\n');

  console.log(`🧪 Tests Run: ${suite.totalTests}`);
  console.log(`✅ Passed: ${suite.passedTests}`);
  console.log(`❌ Failed: ${suite.totalTests - suite.passedTests}`);
  console.log(`⏱️  Duration: ${suite.duration}ms\n`);

  if (suite.success) {
    console.log('🎉 All tests PASSED! Type generation is working correctly.\n');
  } else {
    console.log('💥 Some tests FAILED! Please check the errors above.\n');

    const failedTests = suite.results.filter((r) => r.status === 'FAIL');
    console.log('Failed tests:');
    failedTests.forEach((test) => {
      console.log(`  • ${test.name}: ${test.message}`);
    });
    console.log('');
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    const suite = await runTests();
    printSummary(suite);

    // Exit with appropriate code
    process.exit(suite.success ? 0 : 1);
  } catch (error) {
    console.error('💥 Test suite failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
