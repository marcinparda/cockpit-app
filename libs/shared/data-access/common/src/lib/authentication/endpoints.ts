export const AUTHENTICATION_ENDPOINTS = {
  login: () => '/api/v1/authentication/sessions/login',
  logout: () => '/api/v1/authentication/sessions/logout',
  refresh: () => '/api/v1/authentication/tokens/refresh',
  user: () => '/api/v1/authentication/sessions/me',
  changePassword: () => '/api/v1/authentication/passwords/change',
} as const;
