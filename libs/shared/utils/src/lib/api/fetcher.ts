import { z } from 'zod';
import { logout, refreshAccessToken } from './api';
import { environments } from '../environments/environments';

interface FetcherArgs<ResponseData> {
  url: string;
  responseDataSchema: z.ZodType<ResponseData>;
  options?: RequestInit;
  /**
   * Whether to redirect to the login page on 401 Unauthorized response.
   * Defaults to true.
   */
  withRedirect?: boolean;
  withCredentials?: boolean;
}

// Main fetch function
export async function fetcher<ResponseData>({
  url,
  responseDataSchema,
  options = {},
  withRedirect = true,
  withCredentials = true,
}: FetcherArgs<ResponseData>) {
  if (withCredentials) {
    options.credentials = 'include';
  }
  const response = await fetch(url, options);

  if (response.status === 401 && withRedirect) {
    try {
      await refreshAccessToken();
      return fetcher({
        url,
        responseDataSchema,
        options,
        withRedirect: false,
        withCredentials,
      });
    } catch {
      await logout();
      const redirectUrl = new URL(environments.loginUrl);
      redirectUrl.searchParams.set('redirect_uri', window.location.href);
      window.location.href = redirectUrl.toString();
    }
  }

  const data = await response.json();
  try {
    const parsedData = responseDataSchema.parse(data);
    return parsedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        '[ZOD ERROR] Fetch response data validation error: ' +
          JSON.stringify(error.message, null, 2)
      );
    }
    throw error;
  }
}
