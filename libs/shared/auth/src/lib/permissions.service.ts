/**
 * PermissionsService provides role and permission checking utilities.
 * All methods are async and framework-agnostic.
 */

import { AUTH_API_ENDPOINTS } from './constants';
import { buildApiUrl } from './utils';

/**
 * PermissionsService handles role and permission checks for the current user.
 */
export class PermissionsService {
  /**
   * Fetches roles from the new API endpoint.
   */
  public async getRoles(): Promise<string[]> {
    try {
      const url = buildApiUrl(AUTH_API_ENDPOINTS.USER_ROLES);
      const res = await fetch(url, {
        credentials: 'include',
      });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  /**
   * Fetches permissions from the new API endpoint.
   */
  public async getPermissions(): Promise<string[]> {
    try {
      const url = buildApiUrl(AUTH_API_ENDPOINTS.USER_PERMISSIONS);
      const res = await fetch(url, {
        credentials: 'include',
      });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }

  /**
   * Checks if the user has the 'admin' role.
   */
  public async isAdmin(): Promise<boolean> {
    const roles = await this.getRoles();
    return roles.includes('admin');
  }

  /**
   * Checks if the user has a specific role.
   */
  public async hasRole(roleName: string): Promise<boolean> {
    const roles = await this.getRoles();
    return roles.includes(roleName);
  }

  /**
   * Checks if the user has a specific permission.
   */
  public async hasPermission(permission: string): Promise<boolean> {
    const permissions = await this.getPermissions();
    return permissions.includes(permission);
  }

  /**
   * Checks if the user has any of the given permissions (OR).
   */
  public async hasAnyPermission(permissions: string[]): Promise<boolean> {
    const userPermissions = await this.getPermissions();
    return permissions.some((p) => userPermissions.includes(p));
  }

  /**
   * Checks if the user has all of the given permissions (AND).
   */
  public async hasAllPermissions(permissions: string[]): Promise<boolean> {
    const userPermissions = await this.getPermissions();
    return permissions.every((p) => userPermissions.includes(p));
  }
}
