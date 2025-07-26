import { AuthService } from './lib/auth.service';
import { PermissionsService } from './lib/permissions.service';

export * from './lib/utils';

const authService = new AuthService();
const permissionsService = new PermissionsService();

export const isLoggedIn = () => authService.isLoggedIn();
export const getCurrentUser = () => authService.getCurrentUser();
export const refreshAccessToken = () => authService.refreshAccessToken();
export const logout = () => authService.logout();
export const makeAuthenticatedRequest = (url: string, options?: RequestInit) =>
  authService.makeAuthenticatedRequest(url, options);
export const makeAuthenticatedRequestWithRetry = (
  url: string,
  options?: RequestInit
) => authService.makeAuthenticatedRequestWithRetry(url, options);
export const isAdmin = () => permissionsService.isAdmin();
export const hasPermission = (permission: string) =>
  permissionsService.hasPermission(permission);
export const getUserRole = async () => {
  const roles = await permissionsService.getRoles();
  return roles[0] ?? null;
};
export const hasRole = (roleName: string) =>
  permissionsService.hasRole(roleName);
