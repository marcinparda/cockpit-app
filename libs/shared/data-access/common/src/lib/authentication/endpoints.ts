export const AUTHENTICATION_ENDPOINTS = {
  login: () => '/api/v1/auth/login',
  logout: () => '/api/v1/auth/logout',
  refresh: () => '/api/v1/auth/refresh',
  user: () => '/api/v1/auth/me',
  changePassword: () => '/api/v1/auth/change-password',
} as const;
