import type { ShoppingItem } from '../types/ShoppingItem';
import { environment } from '../environments/environment';
import httpClient from './http.service'; // Import the HTTP client

const API_URL = `${environment.apiUrl}/api/v1/shopping/items`;

export const shoppingListService = {
  async getShoppingItems(skip = 0, limit = 100): Promise<ShoppingItem[]> {
    try {
      const response = await httpClient.get(
        `${API_URL}/?skip=${skip}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching shopping items:', error);
      throw error;
    }
  },

  async getShoppingItem(id: number): Promise<ShoppingItem> {
    try {
      const response = await httpClient.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching shopping item with id ${id}:`, error);
      throw error;
    }
  },

  async addShoppingItem(item: {
    name: string;
    description?: string | null;
    categories?: string | null;
    shops?: string | null;
  }): Promise<ShoppingItem> {
    try {
      const response = await httpClient.post(`${API_URL}/`, item);
      return response.data;
    } catch (error) {
      console.error('Error adding shopping item:', error);
      throw error;
    }
  },

  async updateShoppingItem(
    id: number,
    updates: {
      name?: string | null;
      description?: string | null;
      is_closed?: boolean | null;
      categories?: string | null;
      shops?: string | null;
      completed_at?: string | null;
    }
  ): Promise<ShoppingItem> {
    try {
      const response = await httpClient.put(`${API_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating shopping item:', error);
      throw error;
    }
  },

  async deleteShoppingItem(id: number): Promise<ShoppingItem> {
    try {
      const response = await httpClient.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting shopping item:', error);
      throw error;
    }
  },
};
