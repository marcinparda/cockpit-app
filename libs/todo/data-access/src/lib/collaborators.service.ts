import type {
  TodoProjectCollaboratorCreate,
  TodoProjectCollaboratorResponse,
} from '@cockpit-app/api-types';
import { logger } from '@cockpit-app/shared-utils';
import httpClient from './httpClient';
import { TODO_ENDPOINTS } from './endpoints';

export const collaboratorsService = {
  async getCollaborators(
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

  async addCollaborators(
    projectId: number,
    collaboratorIds: string[],
  ): Promise<TodoProjectCollaboratorResponse[]> {
    try {
      const payload: TodoProjectCollaboratorCreate[] = collaboratorIds.map(
        (id) => ({ id }),
      );
      const response = await httpClient.post(
        TODO_ENDPOINTS.projectCollaborators(projectId),
        payload,
      );
      return response.data;
    } catch (error) {
      logger.error(
        `Error adding collaborators to project ${projectId}:`,
        error,
      );
      throw error;
    }
  },

  async removeCollaborator(projectId: number, userId: string): Promise<void> {
    try {
      await httpClient.delete(
        TODO_ENDPOINTS.projectCollaboratorById(projectId, userId),
      );
    } catch (error) {
      logger.error(
        `Error removing collaborator from project ${projectId}:`,
        error,
      );
      throw error;
    }
  },
};
