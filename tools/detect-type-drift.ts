#!/usr/bin/env node

/**
 * Type Drift Detection Script
 *
 * This script detects when the OpenAPI specification has changed
 * and the generated types need to be updated.
 *
 * Features:
 * - Compares current OpenAPI spec with last generated hash
 * - Detects schema changes and additions
 * - Reports drift details
 * - Suggests remediation actions
 *
 * Usage:
 *   npm run check:drift
 *   tsx tools/detect-type-drift.ts
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

// Get current directory (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const OPENAPI_URL = 'https://api.parda.me/openapi.json';
const WORKSPACE_ROOT = join(__dirname, '..');
const DRIFT_CACHE_FILE = join(WORKSPACE_ROOT, '.type-generation-cache.json');

interface DriftCache {
  lastCheckTimestamp: number;
  openApiSpecHash: string;
  schemaCount: number;
  pathCount: number;
  schemas: string[];
}

interface DriftReport {
  hasDrift: boolean;
  driftType: 'none' | 'minor' | 'major';
  driftDetails: string[];
  previousHash: string;
  currentHash: string;
  addedSchemas: string[];
  removedSchemas: string[];
  modifiedSchemas: string[];
  lastGenerated: Date | null;
  recommendations: string[];
}

/**
 * Fetch OpenAPI specification from the API
 */
async function fetchOpenAPISpec(): Promise<Record<string, unknown>> {
  console.log('🔍 Fetching OpenAPI spec to check for drift...');
  try {
    const response = await fetch(OPENAPI_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const spec = await response.json();
    return spec;
  } catch (error) {
    console.error('❌ Failed to fetch OpenAPI spec:', error);
    throw error;
  }
}

/**
 * Generate hash of OpenAPI spec for drift detection
 */
function generateSpecHash(spec: Record<string, unknown>): string {
  // Create a normalized version for hashing (remove timestamps, descriptions, etc.)
  const normalizedSpec = {
    paths: spec.paths,
    components: spec.components,
    openapi: spec.openapi,
  };

  const specString = JSON.stringify(
    normalizedSpec,
    Object.keys(normalizedSpec).sort()
  );
  return createHash('sha256').update(specString).digest('hex');
}

/**
 * Extract schema information for drift analysis
 */
function extractSchemaInfo(spec: Record<string, unknown>): {
  schemas: string[];
  schemaCount: number;
  pathCount: number;
} {
  const components = spec.components as Record<string, unknown> | undefined;
  const schemas = Object.keys(
    (components?.schemas as Record<string, unknown>) || {}
  );
  const paths = Object.keys((spec.paths as Record<string, unknown>) || {});

  return {
    schemas,
    schemaCount: schemas.length,
    pathCount: paths.length,
  };
}

/**
 * Load drift cache from file
 */
function loadDriftCache(): DriftCache | null {
  if (!existsSync(DRIFT_CACHE_FILE)) {
    return null;
  }

  try {
    const cacheContent = readFileSync(DRIFT_CACHE_FILE, 'utf-8');
    return JSON.parse(cacheContent);
  } catch {
    console.warn('⚠️  Could not read drift cache, treating as first run');
    return null;
  }
}

/**
 * Save drift cache to file
 */
function saveDriftCache(cache: DriftCache): void {
  try {
    writeFileSync(DRIFT_CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch {
    console.warn('⚠️  Could not save drift cache');
  }
}

/**
 * Compare schemas to detect changes
 */
function compareSchemas(
  previousSchemas: string[],
  currentSchemas: string[]
): {
  added: string[];
  removed: string[];
  modified: string[];
} {
  const added = currentSchemas.filter(
    (schema) => !previousSchemas.includes(schema)
  );
  const removed = previousSchemas.filter(
    (schema) => !currentSchemas.includes(schema)
  );

  // For modified, we'd need deeper inspection - for now, we'll assume any hash change
  // indicates potential modifications to existing schemas
  const modified: string[] = [];

  return { added, removed, modified };
}

/**
 * Determine drift severity
 */
function calculateDriftType(
  addedSchemas: string[],
  removedSchemas: string[],
  modifiedSchemas: string[]
): 'none' | 'minor' | 'major' {
  if (
    addedSchemas.length === 0 &&
    removedSchemas.length === 0 &&
    modifiedSchemas.length === 0
  ) {
    return 'none';
  }

  // Major drift: schemas removed or many changes
  if (removedSchemas.length > 0 || addedSchemas.length > 5) {
    return 'major';
  }

  // Minor drift: small additions or modifications
  return 'minor';
}

/**
 * Generate recommendations based on drift
 */
function generateRecommendations(report: DriftReport): string[] {
  const recommendations: string[] = [];

  if (report.driftType === 'none') {
    recommendations.push('✅ No action needed - types are up to date');
    return recommendations;
  }

  recommendations.push(
    '🔄 Run `npm run generate:types` to update generated types'
  );

  if (report.addedSchemas.length > 0) {
    recommendations.push(
      `📦 ${report.addedSchemas.length} new schemas detected - verify library mappings`
    );
  }

  if (report.removedSchemas.length > 0) {
    recommendations.push(
      `⚠️  ${report.removedSchemas.length} schemas removed - check for breaking changes`
    );
  }

  if (report.driftType === 'major') {
    recommendations.push(
      '🚨 Major changes detected - review impact on existing code'
    );
    recommendations.push(
      '🧪 Run tests after regeneration to ensure compatibility'
    );
  }

  recommendations.push(
    '📋 Run `npm run verify:types` after regeneration to validate'
  );

  return recommendations;
}

/**
 * Detect type drift
 */
async function detectTypeDrift(): Promise<DriftReport> {
  try {
    // Fetch current spec
    const currentSpec = await fetchOpenAPISpec();
    const currentHash = generateSpecHash(currentSpec);
    const currentSchemaInfo = extractSchemaInfo(currentSpec);

    // Load previous cache
    const previousCache = loadDriftCache();

    if (!previousCache) {
      console.log('📝 First-time drift check - creating baseline...');

      // Save current state as baseline
      const newCache: DriftCache = {
        lastCheckTimestamp: Date.now(),
        openApiSpecHash: currentHash,
        schemaCount: currentSchemaInfo.schemaCount,
        pathCount: currentSchemaInfo.pathCount,
        schemas: currentSchemaInfo.schemas,
      };

      saveDriftCache(newCache);

      return {
        hasDrift: false,
        driftType: 'none',
        driftDetails: ['Baseline created for future drift detection'],
        previousHash: '',
        currentHash,
        addedSchemas: [],
        removedSchemas: [],
        modifiedSchemas: [],
        lastGenerated: null,
        recommendations: [
          '✅ Baseline established - future runs will detect changes',
        ],
      };
    }

    // Compare hashes
    const hasDrift = previousCache.openApiSpecHash !== currentHash;

    if (!hasDrift) {
      return {
        hasDrift: false,
        driftType: 'none',
        driftDetails: ['No changes detected in OpenAPI specification'],
        previousHash: previousCache.openApiSpecHash,
        currentHash,
        addedSchemas: [],
        removedSchemas: [],
        modifiedSchemas: [],
        lastGenerated: new Date(previousCache.lastCheckTimestamp),
        recommendations: ['✅ No action needed - types are up to date'],
      };
    }

    // Analyze the drift
    const schemaComparison = compareSchemas(
      previousCache.schemas,
      currentSchemaInfo.schemas
    );
    const driftType = calculateDriftType(
      schemaComparison.added,
      schemaComparison.removed,
      schemaComparison.modified
    );

    const driftDetails: string[] = [];

    if (previousCache.schemaCount !== currentSchemaInfo.schemaCount) {
      const change = currentSchemaInfo.schemaCount - previousCache.schemaCount;
      driftDetails.push(
        `Schema count changed: ${previousCache.schemaCount} → ${
          currentSchemaInfo.schemaCount
        } (${change > 0 ? '+' : ''}${change})`
      );
    }

    if (previousCache.pathCount !== currentSchemaInfo.pathCount) {
      const change = currentSchemaInfo.pathCount - previousCache.pathCount;
      driftDetails.push(
        `Path count changed: ${previousCache.pathCount} → ${
          currentSchemaInfo.pathCount
        } (${change > 0 ? '+' : ''}${change})`
      );
    }

    if (schemaComparison.added.length > 0) {
      driftDetails.push(`Added schemas: ${schemaComparison.added.join(', ')}`);
    }

    if (schemaComparison.removed.length > 0) {
      driftDetails.push(
        `Removed schemas: ${schemaComparison.removed.join(', ')}`
      );
    }

    const report: DriftReport = {
      hasDrift: true,
      driftType,
      driftDetails,
      previousHash: previousCache.openApiSpecHash,
      currentHash,
      addedSchemas: schemaComparison.added,
      removedSchemas: schemaComparison.removed,
      modifiedSchemas: schemaComparison.modified,
      lastGenerated: new Date(previousCache.lastCheckTimestamp),
      recommendations: [],
    };

    report.recommendations = generateRecommendations(report);

    // Update cache
    const newCache: DriftCache = {
      lastCheckTimestamp: Date.now(),
      openApiSpecHash: currentHash,
      schemaCount: currentSchemaInfo.schemaCount,
      pathCount: currentSchemaInfo.pathCount,
      schemas: currentSchemaInfo.schemas,
    };

    saveDriftCache(newCache);

    return report;
  } catch (error) {
    console.error('❌ Drift detection failed:', error);
    throw error;
  }
}

/**
 * Print drift report
 */
function printDriftReport(report: DriftReport): void {
  console.log('🔍 Type Drift Detection Report');
  console.log('==============================\n');

  const driftIcon = report.hasDrift ? '🚨' : '✅';
  const driftStatus = report.hasDrift ? 'DETECTED' : 'NONE';

  console.log(`${driftIcon} Drift Status: ${driftStatus}`);

  if (report.hasDrift) {
    console.log(`📊 Drift Type: ${report.driftType.toUpperCase()}`);
    console.log(
      `🔗 Hash Changed: ${report.previousHash.slice(
        0,
        8
      )}...→ ${report.currentHash.slice(0, 8)}...`
    );
  } else {
    console.log(`🔗 Current Hash: ${report.currentHash.slice(0, 8)}...`);
  }

  if (report.lastGenerated) {
    console.log(`📅 Last Generated: ${report.lastGenerated.toISOString()}`);
  }

  console.log('');

  if (report.driftDetails.length > 0) {
    console.log('📋 Changes Detected:');
    console.log('-------------------');
    report.driftDetails.forEach((detail) => console.log(`  • ${detail}`));
    console.log('');
  }

  if (report.addedSchemas.length > 0) {
    console.log('➕ Added Schemas:');
    console.log('-----------------');
    report.addedSchemas.forEach((schema) => console.log(`  • ${schema}`));
    console.log('');
  }

  if (report.removedSchemas.length > 0) {
    console.log('➖ Removed Schemas:');
    console.log('------------------');
    report.removedSchemas.forEach((schema) => console.log(`  • ${schema}`));
    console.log('');
  }

  console.log('💡 Recommendations:');
  console.log('-------------------');
  report.recommendations.forEach((rec) => console.log(`  ${rec}`));
  console.log('');
}

/**
 * Main function
 */
async function main(): Promise<void> {
  try {
    const report = await detectTypeDrift();
    printDriftReport(report);

    // Exit with code indicating drift status
    process.exit(report.hasDrift && report.driftType === 'major' ? 1 : 0);
  } catch (error) {
    console.error('💥 Drift detection failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
