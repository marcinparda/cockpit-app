export const USER_MANAGEMENT_ENDPOINTS = {
  users: () => '/api/v1/users',
  userById: (userId: string) => `/api/v1/users/${userId}`,
  changeUserRole: (userId: string) => `/api/v1/users/${userId}/role`,
  userPermissions: (userId: string) => `/api/v1/users/${userId}/permissions`,
  userPermissionById: (userId: string, permissionId: string) =>
    `/api/v1/users/${userId}/permissions/${permissionId}`,
} as const;
