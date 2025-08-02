#!/usr/bin/env node
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import * as crypto from 'crypto';

/**
 * Validates if the current API types are up to date with the remote OpenAPI specification.
 *
 * This script:
 * 1. Fetches the latest OpenAPI spec from https://api.parda.me/openapi.json
 * 2. Compares it with the local cached version
 * 3. Exits with status code 0 if types are up to date, 1 if they need updating
 */

const REMOTE_OPENAPI_URL = 'https://api.parda.me/openapi.json';
const LOCAL_OPENAPI_PATH = path.join(__dirname, 'openapi.json');

/**
 * Fetches content from a URL and returns it as a string
 */
function fetchUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response: unknown) => {
        // Type assertion for Node.js IncomingMessage
        const res = response as {
          statusCode?: number;
          statusMessage?: string;
          on: (event: string, callback: (data?: unknown) => void) => void;
        };

        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
          return;
        }

        let data = '';
        res.on('data', (chunk: unknown) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(data);
        });
      })
      .on('error', (error: unknown) => {
        reject(error);
      });
  });
}

/**
 * Creates SHA-256 hash of the given content
 */
function createHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Reads local OpenAPI file if it exists
 */
function readLocalOpenApi(): string | null {
  try {
    return fs.readFileSync(LOCAL_OPENAPI_PATH, 'utf-8');
  } catch {
    return null;
  }
}

/**
 * Normalizes JSON content by parsing and stringifying to ensure consistent formatting
 */
function normalizeJson(content: string): string {
  try {
    return JSON.stringify(JSON.parse(content), null, 2);
  } catch (error) {
    throw new Error(`Invalid JSON content: ${error}`);
  }
}

/**
 * Main validation function
 */
async function validateTypes(): Promise<void> {
  try {
    console.log('🔍 Fetching remote OpenAPI specification...');
    const remoteContent = await fetchUrl(REMOTE_OPENAPI_URL);

    console.log('📁 Reading local OpenAPI specification...');
    const localContent = readLocalOpenApi();

    if (!localContent) {
      console.log(
        '❌ Local OpenAPI file not found. Types need to be generated.'
      );
      console.log(
        '💡 Run "npm run update:types" to fetch and generate the latest types.'
      );
      process.exit(1);
    }

    // Normalize both JSON contents for comparison
    const normalizedRemote = normalizeJson(remoteContent);
    const normalizedLocal = normalizeJson(localContent);

    // Create hashes for comparison
    const remoteHash = createHash(normalizedRemote);
    const localHash = createHash(normalizedLocal);

    console.log(`🔍 Remote OpenAPI hash: ${remoteHash.substring(0, 12)}...`);
    console.log(`📁 Local OpenAPI hash:  ${localHash.substring(0, 12)}...`);

    if (remoteHash === localHash) {
      console.log('✅ Types are up to date! No changes detected.');
      process.exit(0);
    } else {
      console.log(
        '❌ Types are outdated! Remote OpenAPI specification has changed.'
      );
      console.log(
        '💡 Run "npm run update:types" to fetch and generate the latest types.'
      );
      process.exit(1);
    }
  } catch (error) {
    console.error('🚨 Error during type validation:', error);
    process.exit(1);
  }
}

// Run validation if this script is executed directly
if (require.main === module) {
  validateTypes();
}

export { validateTypes };
