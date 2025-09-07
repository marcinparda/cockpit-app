import type {
  TodoItem,
  TodoItemCreate,
  TodoItemUpdate,
} from '@cockpit-app/api-types';
import { baseApi } from '@cockpit-app/common-shared-data-access';
import { TODO_ENDPOINTS } from './endpoints';
import { todoItemSchema, todoItemsSchema } from './schemas';

export const todoItemsService = {
  async getTodoItems(skip = 0, limit = 100, projectId?: number): Promise<TodoItem[]> {
    try {
      const params = new URLSearchParams({
        skip: skip.toString(),
        limit: limit.toString(),
      });
      
      if (projectId !== undefined) {
        params.append('project_id', projectId.toString());
      }
      
      return await baseApi.getRequest(
        `${TODO_ENDPOINTS.items()}?${params.toString()}`,
        todoItemsSchema,
      );
    } catch (error) {
      console.error('Error fetching todo items:', error);
      throw error;
    }
  },

  async getTodoItem(id: number): Promise<TodoItem> {
    try {
      return await baseApi.getRequest(
        TODO_ENDPOINTS.itemById(id),
        todoItemSchema,
      );
    } catch (error) {
      console.error(`Error fetching todo item with id ${id}:`, error);
      throw error;
    }
  },

  async addTodoItem(item: TodoItemCreate): Promise<TodoItem> {
    try {
      return await baseApi.postRequest(
        TODO_ENDPOINTS.items(),
        todoItemSchema,
        item,
      );
    } catch (error) {
      console.error('Error adding todo item:', error);
      throw error;
    }
  },

  async updateTodoItem(id: number, updates: TodoItemUpdate): Promise<TodoItem> {
    try {
      return await baseApi.putRequest(
        TODO_ENDPOINTS.itemById(id),
        todoItemSchema,
        updates,
      );
    } catch (error) {
      console.error('Error updating todo item:', error);
      throw error;
    }
  },

  async deleteTodoItem(id: number): Promise<TodoItem> {
    try {
      return await baseApi.deleteRequest(
        TODO_ENDPOINTS.itemById(id),
        todoItemSchema,
      );
    } catch (error) {
      console.error('Error deleting todo item:', error);
      throw error;
    }
  },
};
