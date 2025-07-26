/**
 * AuthService provides authentication utilities for API-based auth using httpOnly cookies.
 * All methods are async and framework-agnostic.
 */

import { UserInfoResponse } from '@cockpit-app/types-shared-auth';
import { AUTH_API_ENDPOINTS } from './constants';
import { buildApiUrl } from './utils';

/**
 * AuthService handles authentication state, user info, and token refresh.
 */
export class AuthService {
  /**
   * Checks if the user is currently logged in (via API call).
   */
  public async isLoggedIn(): Promise<boolean> {
    try {
      console.log(
        `Checking login status at`,
        AUTH_API_ENDPOINTS.USER,
        buildApiUrl(AUTH_API_ENDPOINTS.USER)
      );
      const url = buildApiUrl(AUTH_API_ENDPOINTS.USER);

      const res = await fetch(url, {
        credentials: 'include',
      });
      if (!res.ok) return false;
      const data = await res.json();
      return !!data?.authenticated;
    } catch {
      return false;
    }
  }

  /**
   * Fetches the current user info from the API.
   */
  public async getCurrentUser(): Promise<UserInfoResponse | null> {
    try {
      const url = buildApiUrl(AUTH_API_ENDPOINTS.USER);
      const res = await fetch(url, {
        credentials: 'include',
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }

  /**
   * Attempts to refresh the access token using httpOnly cookies.
   */
  public async refreshAccessToken(): Promise<boolean> {
    try {
      const url = buildApiUrl(AUTH_API_ENDPOINTS.REFRESH);
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  /**
   * Logs out the user by calling the logout endpoint.
   */
  public async logout(): Promise<boolean> {
    try {
      const url = buildApiUrl(AUTH_API_ENDPOINTS.LOGOUT);
      await fetch(url, {
        method: 'POST',
        credentials: 'include',
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Makes an authenticated API request (with cookies).
   */
  public async makeAuthenticatedRequest(
    url: string,
    options?: RequestInit
  ): Promise<Response> {
    return fetch(url, { ...options, credentials: 'include' });
  }

  /**
   * Makes an authenticated request, auto-refreshing token on 401.
   */
  public async makeAuthenticatedRequestWithRetry(
    url: string,
    options?: RequestInit
  ): Promise<Response> {
    let res = await this.makeAuthenticatedRequest(url, options);
    if (res.status === 401) {
      const refreshed = await this.refreshAccessToken();
      if (refreshed) {
        res = await this.makeAuthenticatedRequest(url, options);
      }
    }
    return res;
  }
}
