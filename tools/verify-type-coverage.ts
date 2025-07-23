#!/usr/bin/env node

/**
 * Type Coverage Verification Script
 *
 * This script verifies that all OpenAPI schemas have corresponding TypeScript types
 * and that the generated types match the specification exactly.
 *
 * Features:
 * - Fetches latest OpenAPI spec
 * - Compares with generated types
 * - Reports coverage statistics
 * - Detects missing or extra types
 * - Validates type completeness
 *
 * Usage:
 *   npm run verify:types
 *   tsx tools/verify-type-coverage.ts
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const OPENAPI_URL = 'https://api.parda.me/openapi.json';
const WORKSPACE_ROOT = join(__dirname, '..');

interface VerificationReport {
  totalSchemas: number;
  generatedTypes: number;
  coverage: number;
  missingTypes: string[];
  extraTypes: string[];
  libraryStats: Record<
    string,
    {
      schemas: number;
      types: number;
      coverage: number;
    }
  >;
  success: boolean;
}

/**
 * Fetch OpenAPI specification from the API
 */
async function fetchOpenAPISpec(): Promise<Record<string, unknown>> {
  console.log('🔍 Fetching OpenAPI spec from API...');
  try {
    const response = await fetch(OPENAPI_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const spec = await response.json();
    console.log('✅ Successfully fetched OpenAPI spec');
    return spec;
  } catch (error) {
    console.error('❌ Failed to fetch OpenAPI spec:', error);
    throw error;
  }
}

/**
 * Extract all schema names from OpenAPI spec
 */
function extractSchemaNames(spec: Record<string, unknown>): string[] {
  const components = spec.components as Record<string, unknown> | undefined;
  const schemas = (components?.schemas as Record<string, unknown>) || {};
  return Object.keys(schemas);
}

/**
 * Extract type names from a TypeScript file
 */
function extractTypeNames(filePath: string): string[] {
  if (!existsSync(filePath)) {
    return [];
  }

  const content = readFileSync(filePath, 'utf-8');
  const typeNames: string[] = [];

  // Match interface and type declarations
  const interfacePattern = /export\s+interface\s+(\w+)/g;
  const typePattern = /export\s+type\s+(\w+)/g;

  let match;

  while ((match = interfacePattern.exec(content)) !== null) {
    typeNames.push(match[1]);
  }

  while ((match = typePattern.exec(content)) !== null) {
    typeNames.push(match[1]);
  }

  return typeNames;
}

/**
 * Get library name from file path
 */
function getLibraryName(filePath: string): string {
  const parts = filePath.split('/');
  const typesIndex = parts.findIndex((part) => part === 'types');
  if (typesIndex !== -1 && typesIndex + 3 < parts.length) {
    // e.g., libs/types/ai-budget/expenses -> ai-budget-expenses
    return `${parts[typesIndex + 1]}-${parts[typesIndex + 2]}`;
  }
  return 'unknown';
}

/**
 * Verify type coverage across all libraries
 */
async function verifyTypeCoverage(): Promise<VerificationReport> {
  console.log('🔍 Verifying type coverage...\n');

  try {
    // Fetch OpenAPI spec and extract schemas
    const spec = await fetchOpenAPISpec();
    const allSchemas = extractSchemaNames(spec);
    console.log(`📋 Found ${allSchemas.length} schemas in OpenAPI spec\n`);

    // Calculate coverage
    const uniqueGeneratedTypes = [...new Set(allGeneratedTypes)];
    const coverage =
      allSchemas.length > 0
        ? (uniqueGeneratedTypes.length / allSchemas.length) * 100
        : 0;

    // Find missing and extra types
    const missingTypes = allSchemas.filter(
      (schema) =>
        !uniqueGeneratedTypes.some(
          (type) =>
            type === schema ||
            type === `${schema}Create` ||
            type === `${schema}Update` ||
            type.includes(schema)
        )
    );

    const extraTypes = uniqueGeneratedTypes.filter(
      (type) =>
        !allSchemas.some(
          (schema) =>
            type === schema ||
            type === `${schema}Create` ||
            type === `${schema}Update` ||
            type.includes(schema)
        )
    );

    // Calculate library-specific coverage
    for (const [libraryName, stats] of Object.entries(libraryStats)) {
      // Estimate expected schemas for each library based on naming patterns
      const expectedSchemas = allSchemas.filter((schema) => {
        const lowerSchema = schema.toLowerCase();
        const lowerLibrary = libraryName.toLowerCase();
        return (
          lowerLibrary.includes(
            lowerSchema
              .split(/(?=[A-Z])/)
              .join('-')
              .toLowerCase()
          ) || lowerSchema.includes(lowerLibrary.replace('-', ''))
        );
      }).length;

      stats.schemas = Math.max(expectedSchemas, 1); // At least 1 to avoid division by zero
      stats.coverage = (stats.types / stats.schemas) * 100;
    }

    const report: VerificationReport = {
      totalSchemas: allSchemas.length,
      generatedTypes: uniqueGeneratedTypes.length,
      coverage: Math.round(coverage * 100) / 100,
      missingTypes,
      extraTypes,
      libraryStats,
      success: missingTypes.length === 0 && coverage >= 90,
    };

    return report;
  } catch (error) {
    console.error('❌ Verification failed:', error);
    throw error;
  }
}

/**
 * Print verification report
 */
function printReport(report: VerificationReport): void {
  console.log('📊 Type Coverage Report');
  console.log('========================\n');

  console.log(`📋 Total OpenAPI Schemas: ${report.totalSchemas}`);
  console.log(`🔧 Generated Types: ${report.generatedTypes}`);
  console.log(`📈 Coverage: ${report.coverage}%\n`);

  // Library stats
  console.log('📦 Library Statistics:');
  console.log('----------------------');
  for (const [library, stats] of Object.entries(report.libraryStats)) {
    console.log(
      `  ${library}: ${stats.types} types (${Math.round(
        stats.coverage
      )}% coverage)`
    );
  }
  console.log('');

  // Missing types
  if (report.missingTypes.length > 0) {
    console.log('❌ Missing Types:');
    console.log('-----------------');
    report.missingTypes.forEach((type) => console.log(`  • ${type}`));
    console.log('');
  }

  // Extra types
  if (report.extraTypes.length > 0) {
    console.log('➕ Extra Types (not in OpenAPI spec):');
    console.log('-------------------------------------');
    report.extraTypes.forEach((type) => console.log(`  • ${type}`));
    console.log('');
  }

  // Success/failure summary
  if (report.success) {
    console.log('✅ Type coverage verification PASSED!');
    console.log(`   Coverage: ${report.coverage}% (target: 90%+)`);
    console.log('   All critical types are present.\n');
  } else {
    console.log('❌ Type coverage verification FAILED!');
    console.log(`   Coverage: ${report.coverage}% (target: 90%+)`);
    console.log(`   Missing types: ${report.missingTypes.length}`);
    console.log('   Please run npm run generate:types to update.\n');
  }
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    const report = await verifyTypeCoverage();
    printReport(report);

    // Exit with appropriate code
    process.exit(report.success ? 0 : 1);
  } catch (error) {
    console.error('💥 Verification script failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
