import { environments } from '@cockpit-app/shared-utils';
import httpClient from './http.service';
import type { UserInfoResponse } from '@cockpit-app/api-types';

const API_URL = `${environments.apiUrl}/api/v1/auth/me`;

export const userService = {
  async getCurrentUserInfo(): Promise<UserInfoResponse> {
    try {
      const response = await httpClient.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  },
};
