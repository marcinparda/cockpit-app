/**
 * Type processing utilities for enhancing generated TypeScript types
 */

/**
 * Adds JSDoc comments to TypeScript types
 */
export function addJSDocComments(
  typeContent: string,
  libraryInfo: {
    library: string;
    tags: string[];
    description?: string;
  }
): string {
  const header = `/**
 * Generated TypeScript types for ${libraryInfo.library}
 * 
 * Auto-generated from OpenAPI specification
 * Source: https://api.parda.me/openapi.json
 * 
 * Tags: ${libraryInfo.tags.join(', ')}
 * ${libraryInfo.description ? `Description: ${libraryInfo.description}` : ''}
 * 
 * @generated This file is auto-generated. Do not edit manually.
 * @see https://api.parda.me/openapi.json
 */

`;

  return header + typeContent;
}

/**
 * Extracts exported type names from TypeScript content
 */
export function extractExportedTypes(content: string): string[] {
  const exportRegex = /export\s+(?:type\s+|interface\s+)?(\w+)/g;
  const exports: string[] = [];
  let match;

  while ((match = exportRegex.exec(content)) !== null) {
    exports.push(match[1]);
  }

  return [...new Set(exports)]; // Remove duplicates
}

/**
 * Adds utility types for common API patterns
 */
export function addUtilityTypes(content: string, libraryName: string): string {
  const utilityTypes = `
/**
 * Utility types for ${libraryName}
 */

/** Generic API response wrapper */
export interface APIResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/** Generic list response */
export interface ListResponse<T> {
  items: T[];
  total?: number;
  limit?: number;
  skip?: number;
}

/** Generic error response */
export interface APIError {
  detail: string;
  type?: string;
  code?: number;
}

/** Request ID for tracking */
export interface RequestContext {
  requestId?: string;
  timestamp?: string;
}
`;

  return content + utilityTypes;
}

/**
 * Enhances enum types with better TypeScript patterns
 */
export function enhanceEnumTypes(content: string): string {
  // Ensure content is a string
  if (typeof content !== 'string') {
    console.warn(
      '⚠️ enhanceEnumTypes received non-string content:',
      typeof content
    );
    return String(content);
  }

  // Convert enum-like unions to proper TypeScript patterns
  return content.replace(
    /export type (\w+) = "([^"]+)"(\s*\|\s*"[^"]*")*/g,
    (match, typeName, firstValue, otherValues) => {
      const values = [firstValue];
      if (otherValues) {
        const additionalValues = otherValues.match(/"([^"]+)"/g);
        if (additionalValues) {
          values.push(...additionalValues.map((v) => v.slice(1, -1)));
        }
      }

      const enumName = `${typeName}Enum`;
      const enumDef = `export enum ${enumName} {
${values
  .map(
    (value) =>
      `  ${value.toUpperCase().replace(/[^A-Z0-9]/g, '_')} = "${value}"`
  )
  .join(',\n')}
}

export type ${typeName} = \`\${${enumName}}\`;`;

      return enumDef;
    }
  );
}

/**
 * Adds branded types for better type safety
 */
export function addBrandedTypes(content: string): string {
  // Add branded types for IDs and similar values
  const brandedTypes = `
/** Branded type utilities */
declare const __brand: unique symbol;
export type Branded<T, B> = T & { [__brand]: B };

/** Branded ID types for better type safety */
export type UserId = Branded<string, 'UserId'>;
export type RoleId = Branded<string, 'RoleId'>;
export type PermissionId = Branded<string, 'PermissionId'>;
export type ExpenseId = Branded<number, 'ExpenseId'>;
export type CategoryId = Branded<number, 'CategoryId'>;
export type PaymentMethodId = Branded<number, 'PaymentMethodId'>;
export type TodoItemId = Branded<number, 'TodoItemId'>;
export type TodoProjectId = Branded<number, 'TodoProjectId'>;
`;

  return content + brandedTypes;
}

/**
 * Cleans up and formats TypeScript content
 */
export function cleanupTypeScript(content: string): string {
  return (
    content
      // Remove empty lines at the beginning
      .replace(/^\s*\n+/, '')
      // Remove excessive empty lines (more than 2)
      .replace(/\n\s*\n\s*\n+/g, '\n\n')
      // Ensure proper spacing around export statements
      .replace(/\nexport\s/g, '\n\nexport ')
      // Remove trailing whitespace
      .replace(/[ \t]+$/gm, '')
      // Ensure file ends with newline
      .replace(/\n*$/, '\n')
  );
}

/**
 * Post-processes generated types for better TypeScript compatibility
 */
export function postProcessTypes(
  content: string,
  options: {
    libraryName: string;
    addUtilities?: boolean;
    addBranded?: boolean;
    enhanceEnums?: boolean;
  }
): string {
  let processed = content;

  // Apply enhancements based on options
  if (options.enhanceEnums) {
    processed = enhanceEnumTypes(processed);
  }

  if (options.addUtilities) {
    processed = addUtilityTypes(processed, options.libraryName);
  }

  if (options.addBranded) {
    processed = addBrandedTypes(processed);
  }

  // Final cleanup
  processed = cleanupTypeScript(processed);

  return processed;
}
