import { environment } from '../environments/environments';

/**
 * Constructs a full API URL from a path.
 */
export function buildApiUrl(path: string): string {
  return `${environment.apiUrl}${path}`;
}

/**
 * Formats an error object for display/logging.
 */
export function formatAuthError(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  return 'Unknown error';
}
