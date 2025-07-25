import { AuthService } from './lib/auth.service';
import { PermissionsService } from './lib/permissions.service';

export * from './lib/utils';

const authService = new AuthService();
const permissionsService = new PermissionsService();

export const isLoggedIn = () => authService.isLoggedIn();
export const getCurrentUser = () => authService.getCurrentUser();
export const refreshAccessToken = () => authService.refreshAccessToken();
export const login = (email: string, password: string) =>
  authService.login(email, password);
export const logout = () => authService.logout();
export const isAdmin = () => permissionsService.isAdmin();
export const hasPermission = (permission: string) =>
  permissionsService.hasPermission(permission);
export const getUserRole = async () => {
  const roles = await permissionsService.getRoles();
  return roles[0] ?? null;
};
export const hasRole = (roleName: string) =>
  permissionsService.hasRole(roleName);
