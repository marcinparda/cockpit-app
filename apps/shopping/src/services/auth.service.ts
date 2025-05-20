const AUTH_KEY = 'x-api-key';

export const authService = {
  getApiKey(): string | null {
    return localStorage.getItem(AUTH_KEY);
  },

  setApiKey(apiKey: string): void {
    localStorage.setItem(AUTH_KEY, apiKey);
  },

  removeApiKey(): void {
    localStorage.removeItem(AUTH_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getApiKey();
  },

  logout(): void {
    this.removeApiKey();
  },
};
