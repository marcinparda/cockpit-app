export const HEALTH_ENDPOINTS = {
  health: () => '/health',
  cleanupHealth: () => '/health/cleanup',
  root: () => '/',
} as const;
