import type { TodoProject } from '../types/TodoProject';
import { environment } from '../environments/environment';
import httpClient from './http.service';

const API_URL = `${environment.apiUrl}/api/v1/todo/projects`;

export const todoProjectsService = {
  async getTodoProjects(): Promise<TodoProject[]> {
    try {
      const response = await httpClient.get(`${API_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo projects:', error);
      throw error;
    }
  },

  async getTodoProject(id: number): Promise<TodoProject> {
    try {
      const response = await httpClient.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching todo project with id ${id}:`, error);
      throw error;
    }
  },

  async addTodoProject(item: { name: string }): Promise<TodoProject> {
    try {
      const response = await httpClient.post(`${API_URL}/`, item);
      return response.data;
    } catch (error) {
      console.error('Error adding todo project:', error);
      throw error;
    }
  },

  async updateTodoProject(
    id: number,
    updates: { name: string }
  ): Promise<TodoProject> {
    try {
      const response = await httpClient.put(`${API_URL}/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('Error updating todo project:', error);
      throw error;
    }
  },

  async deleteTodoProject(id: number): Promise<void> {
    try {
      await httpClient.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting todo project:', error);
      throw error;
    }
  },
};
