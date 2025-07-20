/**
 * OpenAPI parsing utilities for type generation
 */

/**
 * OpenAPI 3.x operation interface
 */
interface OpenAPIOperation {
  tags?: string[];
  summary?: string;
  operationId?: string;
  parameters?: unknown[];
  requestBody?: unknown;
  responses?: Record<string, unknown>;
  security?: unknown[];
}

/**
 * OpenAPI 3.x path item interface
 */
interface OpenAPIPathItem {
  get?: OpenAPIOperation;
  post?: OpenAPIOperation;
  put?: OpenAPIOperation;
  delete?: OpenAPIOperation;
  options?: OpenAPIOperation;
  head?: OpenAPIOperation;
  patch?: OpenAPIOperation;
  trace?: OpenAPIOperation;
}

/**
 * OpenAPI 3.x Document interface
 */
interface OpenAPIDocument {
  openapi: string;
  info: {
    title: string;
    version: string;
  };
  paths: Record<string, OpenAPIPathItem>;
  components?: {
    schemas?: Record<string, unknown>;
    securitySchemes?: Record<string, unknown>;
  };
}

/**
 * Filters OpenAPI spec by included tags and schemas
 */
export function filterOpenAPISpec(
  spec: OpenAPIDocument,
  includedTags: string[],
  includedSchemas?: string[]
): OpenAPIDocument {
  const filteredSpec: OpenAPIDocument = {
    openapi: spec.openapi,
    info: spec.info,
    paths: {},
    components: {
      schemas: {},
      securitySchemes: spec.components?.securitySchemes || {}
    }
  };

  // Filter paths by tags
  for (const [path, pathItem] of Object.entries(spec.paths)) {
    const filteredPathItem: Partial<OpenAPIPathItem> = {};
    let hasMatchingTag = false;

    for (const [method, operation] of Object.entries(pathItem)) {
      if (typeof operation === 'object' && operation?.tags) {
        const operationTags = operation.tags as string[];
        const hasIncludedTag = operationTags.some(tag => 
          includedTags.some(includedTag => tag.includes(includedTag))
        );

        if (hasIncludedTag) {
          (filteredPathItem as Record<string, unknown>)[method] = operation;
          hasMatchingTag = true;
        }
      }
    }

    if (hasMatchingTag) {
      filteredSpec.paths[path] = filteredPathItem as OpenAPIPathItem;
    }
  }

  // Filter schemas if specified
  if (spec.components?.schemas && includedSchemas) {
    for (const schemaName of includedSchemas) {
      if (spec.components.schemas[schemaName]) {
        if (filteredSpec.components && filteredSpec.components.schemas) {
          filteredSpec.components.schemas[schemaName] = spec.components.schemas[schemaName];
        }
      }
    }
  } else if (spec.components?.schemas) {
    // If no specific schemas specified, include all referenced schemas
    const referencedSchemas = extractReferencedSchemas(filteredSpec.paths);
    for (const schemaName of referencedSchemas) {
      if (spec.components.schemas[schemaName]) {
        if (filteredSpec.components && filteredSpec.components.schemas) {
          filteredSpec.components.schemas[schemaName] = spec.components.schemas[schemaName];
        }
      }
    }
  }

  return filteredSpec;
}

/**
 * Extracts schema names referenced in paths
 */
function extractReferencedSchemas(paths: Record<string, OpenAPIPathItem>): Set<string> {
  const schemas = new Set<string>();

  function extractFromObject(obj: unknown): void {
    if (typeof obj !== 'object' || obj === null) return;

    const objectValue = obj as Record<string, unknown>;

    if (objectValue.$ref && typeof objectValue.$ref === 'string') {
      const match = objectValue.$ref.match(/#\/components\/schemas\/(.+)/);
      if (match) {
        schemas.add(match[1]);
      }
    }

    if (Array.isArray(objectValue)) {
      objectValue.forEach(extractFromObject);
    } else {
      Object.values(objectValue).forEach(extractFromObject);
    }
  }

  extractFromObject(paths);
  return schemas;
}

/**
 * Validates OpenAPI specification structure
 */
export function validateOpenAPISpec(spec: unknown): spec is OpenAPIDocument {
  return (
    spec &&
    typeof spec === 'object' &&
    typeof (spec as Record<string, unknown>).openapi === 'string' &&
    typeof (spec as Record<string, unknown>).info === 'object' &&
    typeof (spec as Record<string, unknown>).paths === 'object'
  );
}

/**
 * Gets all unique tags from the OpenAPI spec
 */
export function extractAllTags(spec: OpenAPIDocument): string[] {
  const tags = new Set<string>();

  for (const pathItem of Object.values(spec.paths)) {
    for (const operation of Object.values(pathItem)) {
      if (typeof operation === 'object' && operation?.tags) {
        (operation.tags as string[]).forEach(tag => tags.add(tag));
      }
    }
  }

  return Array.from(tags).sort();
}

/**
 * Gets all schema names from the OpenAPI spec
 */
export function extractAllSchemas(spec: OpenAPIDocument): string[] {
  return spec.components?.schemas 
    ? Object.keys(spec.components.schemas).sort()
    : [];
}
