import type {
  TodoProject,
  TodoProjectCollaboratorResponse,
  TodoProjectCreate,
  TodoProjectUpdate,
} from '@cockpit-app/api-types';
import { logger } from '@cockpit-app/shared-utils';
import { baseApi } from '@cockpit-app/common-shared-data-access';
import { TODO_ENDPOINTS } from './endpoints';
import { todoProjectSchema, todoProjectsSchema, todoProjectCollaboratorsSchema, voidResponseSchema } from './schemas';

export const todoProjectsService = {
  async getAllTodoProjects(): Promise<TodoProject[]> {
    try {
      return await baseApi.getRequest(
        TODO_ENDPOINTS.projects(),
        todoProjectsSchema,
      );
    } catch (error) {
      logger.error('Error fetching todo projects:', error);
      throw error;
    }
  },

  async getTodoProjectById(id: number): Promise<TodoProject> {
    try {
      return await baseApi.getRequest(
        TODO_ENDPOINTS.projectById(id),
        todoProjectSchema,
      );
    } catch (error) {
      logger.error(`Error fetching todo project with id ${id}:`, error);
      throw error;
    }
  },

  async addTodoProject(item: TodoProjectCreate): Promise<TodoProject> {
    try {
      return await baseApi.postRequest(
        TODO_ENDPOINTS.projects(),
        todoProjectSchema,
        item,
      );
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
      return await baseApi.putRequest(
        TODO_ENDPOINTS.projectById(id),
        todoProjectSchema,
        updates,
      );
    } catch (error) {
      logger.error('Error updating todo project:', error);
      throw error;
    }
  },

  async deleteTodoProject(id: number): Promise<void> {
    try {
      return await baseApi.deleteRequest(
        TODO_ENDPOINTS.projectById(id),
        voidResponseSchema,
      );
    } catch (error) {
      logger.error('Error deleting todo project:', error);
      throw error;
    }
  },

  async getTodoProjectCollaborators(
    projectId: number,
  ): Promise<TodoProjectCollaboratorResponse[]> {
    try {
      return await baseApi.getRequest(
        TODO_ENDPOINTS.projectCollaborators(projectId),
        todoProjectCollaboratorsSchema,
      );
    } catch (error) {
      logger.error(
        `Error fetching collaborators for project ${projectId}:`,
        error,
      );
      throw error;
    }
  },
};
