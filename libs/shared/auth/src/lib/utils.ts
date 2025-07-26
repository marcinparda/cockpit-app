/**
 * Utility functions for environment config, API URL construction, error formatting, and debug logging.
 */

import { AUTH_ENV_KEYS } from './constants';

/**
 * Gets the API base URL from environment variables.
 */
export function getApiBaseUrl(): string {
  // @ts-expect-error -- import.meta.env is valid in consuming app with correct module option
  return import.meta.env[AUTH_ENV_KEYS.API_BASE_URL] || '';
}

/**
 * Constructs a full API URL from a path.
 */
export function buildApiUrl(path: string): string {
  const base = getApiBaseUrl();
  return base ? `${base}${path}` : path;
}

/**
 * Formats an error object for display/logging.
 */
export function formatAuthError(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}
