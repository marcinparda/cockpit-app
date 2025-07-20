/**
 * File system utilities for type generation
 */

import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { execSync } from 'child_process';

/**
 * Ensures a directory exists, creating it recursively if necessary
 */
export async function ensureDirectoryExists(path: string): Promise<void> {
  await fs.mkdir(path, { recursive: true });
}

/**
 * Writes content to a TypeScript file with proper formatting
 */
export async function writeTypeFile(filePath: string, content: string): Promise<void> {
  // Ensure directory exists
  await ensureDirectoryExists(dirname(filePath));
  
  // Write the file
  await fs.writeFile(filePath, content, 'utf-8');
  
  // Try to format with prettier if available
  try {
    execSync(`npx prettier --write "${filePath}"`, { 
      stdio: 'ignore',
      cwd: dirname(filePath)
    });
  } catch {
    // Prettier formatting failed, file is still written
    console.warn(`⚠️ Could not format ${filePath} with Prettier`);
  }
}

/**
 * Creates an index.ts file with barrel exports
 */
export async function createIndexFile(
  libraryPath: string, 
  exports: string[]
): Promise<void> {
  const indexPath = join(libraryPath, 'index.ts');
  
  const content = `// Auto-generated barrel export file
// This file exports all types from this library

${exports.map(exportName => `export * from './${exportName}';`).join('\n')}

// Re-export commonly used types for convenience
${exports.map(exportName => `export type * from './${exportName}';`).join('\n')}
`;

  await writeTypeFile(indexPath, content);
}

/**
 * Reads a file and returns its content
 */
export async function readFileContent(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to read file ${filePath}: ${error}`);
  }
}

/**
 * Checks if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Creates a backup of an existing file
 */
export async function backupFile(filePath: string): Promise<string> {
  const backupPath = `${filePath}.backup.${Date.now()}`;
  
  if (await fileExists(filePath)) {
    await fs.copyFile(filePath, backupPath);
    return backupPath;
  }
  
  return '';
}

/**
 * Removes backup files older than specified time
 */
export async function cleanupBackups(
  directory: string, 
  olderThanMs: number = 7 * 24 * 60 * 60 * 1000 // 7 days
): Promise<void> {
  try {
    const files = await fs.readdir(directory);
    const backupFiles = files.filter(file => file.includes('.backup.'));
    const now = Date.now();
    
    for (const file of backupFiles) {
      const filePath = join(directory, file);
      const stats = await fs.stat(filePath);
      
      if (now - stats.mtime.getTime() > olderThanMs) {
        await fs.unlink(filePath);
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not cleanup backups in ${directory}: ${error}`);
  }
}
