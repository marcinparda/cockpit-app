import type {
  TodoProject,
  TodoProjectCollaboratorResponse,
  TodoProjectCreate,
  TodoProjectUpdate,
} from '@cockpit-app/api-types';
import { logger } from '@cockpit-app/shared-utils';
import httpClient from './httpClient';
import { TODO_ENDPOINTS } from './endpoints';

export const todoProjectsService = {
  async getAllTodoProjects(): Promise<TodoProject[]> {
    try {
      const response = await httpClient.get(TODO_ENDPOINTS.projects());
      return response.data;
    } catch (error) {
      logger.error('Error fetching todo projects:', error);
      throw error;
    }
  },

  async getTodoProjectById(id: number): Promise<TodoProject> {
    try {
      const response = await httpClient.get(TODO_ENDPOINTS.projectById(id));
      return response.data;
    } catch (error) {
      logger.error(`Error fetching todo project with id ${id}:`, error);
      throw error;
    }
  },

  async addTodoProject(item: TodoProjectCreate): Promise<TodoProject> {
    try {
      const response = await httpClient.post(TODO_ENDPOINTS.projects(), item);
      return response.data;
    } catch (error) {
      logger.error('Error adding todo project:', error);
      throw error;
    }
  },

  async updateTodoProject(
    id: number,
    updates: TodoProjectUpdate,
  ): Promise<TodoProject> {
    try {
      const response = await httpClient.put(TODO_ENDPOINTS.projectById(id), updates);
      return response.data;
    } catch (error) {
      logger.error('Error updating todo project:', error);
      throw error;
    }
  },

  async deleteTodoProject(id: number): Promise<void> {
    try {
      await httpClient.delete(TODO_ENDPOINTS.projectById(id));
    } catch (error) {
      logger.error('Error deleting todo project:', error);
      throw error;
    }
  },

  async getTodoProjectCollaborators(
    projectId: number,
  ): Promise<TodoProjectCollaboratorResponse[]> {
    try {
      const response = await httpClient.get(
        TODO_ENDPOINTS.projectCollaborators(projectId),
      );
      return response.data;
    } catch (error) {
      logger.error(
        `Error fetching collaborators for project ${projectId}:`,
        error,
      );
      throw error;
    }
  },
};
