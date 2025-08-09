import type {
  TodoProjectCollaboratorCreate,
  TodoProjectCollaboratorResponse,
} from '@cockpit-app/api-types';
import { environments, logger } from '@cockpit-app/shared-utils';
import httpClient from './http.service';

const API_URL = `${environments.apiUrl}/api/v1/todo/projects`;

export const collaboratorsService = {
  async getTodoProjectCollaborators(
    projectId: number
  ): Promise<TodoProjectCollaboratorResponse[]> {
    try {
      const response = await httpClient.get(
        `${API_URL}/${projectId}/collaborators`
      );
      return response.data;
    } catch (error) {
      logger.error(
        `Error fetching collaborators for project ${projectId}:`,
        error
      );
      throw error;
    }
  },

  async addTodoProjectCollaborators(
    projectId: number,
    collaboratorIds: string[]
  ): Promise<TodoProjectCollaboratorResponse[]> {
    try {
      const payload: TodoProjectCollaboratorCreate[] = collaboratorIds.map(
        (id) => ({ id })
      );
      const response = await httpClient.post(
        `${API_URL}/${projectId}/collaborators`,
        payload
      );
      return response.data;
    } catch (error) {
      logger.error(
        `Error adding collaborators to project ${projectId}:`,
        error
      );
      throw error;
    }
  },

  async removeTodoProjectCollaborator(
    projectId: number,
    userId: string
  ): Promise<void> {
    try {
      await httpClient.delete(
        `${API_URL}/${projectId}/collaborators/${userId}`
      );
    } catch (error) {
      logger.error(
        `Error removing collaborator from project ${projectId}:`,
        error
      );
      throw error;
    }
  },
};
