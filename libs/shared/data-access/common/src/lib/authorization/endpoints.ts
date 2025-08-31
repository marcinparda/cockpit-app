export const AUTHORIZATION_ENDPOINTS = {
  currentUserRoles: () => '/api/v1/authorization/roles/me',
  allRoles: () => '/api/v1/authorization/roles/',
  allPermissions: () => '/api/v1/authorization/permissions',
  currentUserPermissions: () => '/api/v1/authorization/user-permissions/me',
} as const;
