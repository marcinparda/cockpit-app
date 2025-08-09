import { environments } from '@cockpit-app/shared-utils';
import httpClient from '../services/http.service';
import { SimpleUserResponse } from '@cockpit-app/api-types';

const API_URL = `${environments.apiUrl}/api/v1/users`;

export const usersService = {
  async getUsers(): Promise<SimpleUserResponse[]> {
    try {
      const response = await httpClient.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },
};
