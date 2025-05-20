import type { ShoppingItem } from '../types/ShoppingItem';
import { environment } from '../environments/environment';

const API_URL = `${environment.apiUrl}/api/v1/shopping/items`;

export const shoppingListService = {
  async getShoppingItems(skip = 0, limit = 100): Promise<ShoppingItem[]> {
    try {
      const response = await fetch(`${API_URL}/?skip=${skip}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching shopping items:', error);
      throw error;
    }
  },

  async getShoppingItem(id: number): Promise<ShoppingItem> {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
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
      const response = await fetch(`${API_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
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
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating shopping item:', error);
      throw error;
    }
  },

  async deleteShoppingItem(id: number): Promise<ShoppingItem> {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting shopping item:', error);
      throw error;
    }
  },
};
