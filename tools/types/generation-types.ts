/**
 * TypeScript interfaces for type generation system
 */

/**
 * Library mapping configuration
 */
export interface LibraryMapping {
  /** The npm package name for the library */
  library: string;
  /** Output path relative to workspace root */
  outputPath: string;
  /** OpenAPI tags to include in this library */
  includedTags: string[];
  /** Specific schemas to include (optional) */
  includedSchemas?: string[];
  /** Custom type mappings for special cases */
  customTypes?: Record<string, string>;
  /** Description for JSDoc generation */
  description?: string;
}

/**
 * Generation result for a single library
 */
export interface GenerationResult {
  /** Whether generation was successful */
  success: boolean;
  /** Library package name */
  library: string;
  /** List of generated file paths */
  generatedFiles: string[];
  /** Any errors encountered during generation */
  errors: string[];
  /** Warning messages */
  warnings: string[];
  /** Generation metadata */
  metadata: {
    /** Number of types generated */
    typeCount: number;
    /** Number of schemas processed */
    schemaCount: number;
    /** Generation timestamp */
    timestamp: string;
    /** Processing time in milliseconds */
    processingTime: number;
  };
}

/**
 * Overall generation summary
 */
export interface GenerationSummary {
  /** Total libraries processed */
  totalLibraries: number;
  /** Successfully generated libraries */
  successfulLibraries: number;
  /** Failed libraries */
  failedLibraries: number;
  /** Total processing time */
  totalProcessingTime: number;
  /** Individual library results */
  results: GenerationResult[];
  /** OpenAPI spec metadata */
  specMetadata: {
    /** OpenAPI version */
    version: string;
    /** API title */
    title: string;
    /** Total paths in spec */
    totalPaths: number;
    /** Total schemas in spec */
    totalSchemas: number;
  };
}

/**
 * Generation options
 */
export interface GenerationOptions {
  /** Force regeneration even if files exist */
  force?: boolean;
  /** Enable verbose logging */
  verbose?: boolean;
  /** Skip backup creation */
  skipBackup?: boolean;
  /** Custom output directory */
  outputDir?: string;
  /** Specific libraries to generate (if not specified, all will be generated) */
  libraries?: string[];
  /** Post-processing options */
  postProcess?: {
    addUtilities?: boolean;
    addBranded?: boolean;
    enhanceEnums?: boolean;
    formatCode?: boolean;
  };
}

/**
 * Watch mode configuration
 */
export interface WatchConfig {
  /** Polling interval in milliseconds */
  interval?: number;
  /** OpenAPI spec URL to watch */
  specUrl: string;
  /** Callback for when spec changes */
  onChange?: (summary: GenerationSummary) => void;
  /** Callback for errors */
  onError?: (error: Error) => void;
}

/**
 * CLI command configuration
 */
export interface CliConfig {
  /** Command name */
  command: string;
  /** Command description */
  description: string;
  /** Command options */
  options: GenerationOptions;
}

/**
 * Type coverage report
 */
export interface TypeCoverageReport {
  /** Total schemas in OpenAPI spec */
  totalSchemas: number;
  /** Schemas covered by generated types */
  coveredSchemas: number;
  /** Coverage percentage */
  coveragePercentage: number;
  /** Missing schemas */
  missingSchemas: string[];
  /** Unused schemas (defined but not generated) */
  unusedSchemas: string[];
  /** Libraries and their coverage */
  libraryBreakdown: Record<
    string,
    {
      totalSchemas: number;
      coveredSchemas: number;
      coveragePercentage: number;
      missingSchemas: string[];
    }
  >;
}
