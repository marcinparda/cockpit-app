import type {
  TodoItem,
  TodoItemCreate,
  TodoItemUpdate,
} from '@cockpit-app/api-types';
import httpClient from './httpClient';
import { TODO_ENDPOINTS } from './endpoints';

export const todoItemsService = {
  async getTodoItems(skip = 0, limit = 100): Promise<TodoItem[]> {
    try {
      const response = await httpClient.get(
        `${TODO_ENDPOINTS.items()}?skip=${skip}&limit=${limit}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching todo items:', error);
      throw error;
    }
  },

  async getTodoItem(id: number): Promise<TodoItem> {
    try {
      const response = await httpClient.get(TODO_ENDPOINTS.itemById(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo item with id ${id}:`, error);
      throw error;
    }
  },

  async addTodoItem(item: TodoItemCreate): Promise<TodoItem> {
    try {
      const response = await httpClient.post(TODO_ENDPOINTS.items(), item);
      return response.data;
    } catch (error) {
      console.error('Error adding todo item:', error);
      throw error;
    }
  },

  async updateTodoItem(id: number, updates: TodoItemUpdate): Promise<TodoItem> {
    try {
      const response = await httpClient.put(TODO_ENDPOINTS.itemById(id), updates);
      return response.data;
    } catch (error) {
      console.error('Error updating todo item:', error);
      throw error;
    }
  },

  async deleteTodoItem(id: number): Promise<TodoItem> {
    try {
      const response = await httpClient.delete(TODO_ENDPOINTS.itemById(id));
      return response.data;
    } catch (error) {
      console.error('Error deleting todo item:', error);
      throw error;
    }
  },
};
