import type {
  TodoItem,
  TodoItemCreate,
  TodoItemUpdate,
} from '@cockpit-app/types-todo-items';
import { environments } from '@cockpit-app/shared-utils';
import httpClient from './http.service'; // Import the HTTP client

const API_URL = `${environments.apiUrl}/api/v1/todo/items`;

export const todoItemsService = {
  async getTodoItems(skip = 0, limit = 100): Promise<TodoItem[]> {
    try {
      const response = await httpClient.get(
        `${API_URL}?skip=${skip}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching todo items:', error);
      throw error;
    }
  },

  async getTodoItem(id: number): Promise<TodoItem> {
    try {
      const response = await httpClient.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo item with id ${id}:`, error);
      throw error;
    }
  },

  async addTodoItem(item: TodoItemCreate): Promise<TodoItem> {
    try {
      const response = await httpClient.post(`${API_URL}`, item);
      return response.data;
    } catch (error) {
      console.error('Error adding todo item:', error);
      throw error;
    }
  },

  async updateTodoItem(id: number, updates: TodoItemUpdate): Promise<TodoItem> {
    try {
      const response = await httpClient.put(`${API_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating todo item:', error);
      throw error;
    }
  },

  async deleteTodoItem(id: number): Promise<TodoItem> {
    try {
      const response = await httpClient.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting todo item:', error);
      throw error;
    }
  },
};
