import type {
  TodoProjectCollaboratorCreate,
  TodoProjectCollaboratorResponse,
} from '@cockpit-app/api-types';
import { logger } from '@cockpit-app/shared-utils';
import { baseApi } from '@cockpit-app/common-shared-data-access';
import { TODO_ENDPOINTS } from './endpoints';
import { todoProjectCollaboratorsSchema, voidResponseSchema } from './schemas';

export const collaboratorsService = {
  async getCollaborators(
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

  async addCollaborators(
    projectId: number,
    collaboratorIds: string[],
  ): Promise<TodoProjectCollaboratorResponse[]> {
    try {
      const payload: TodoProjectCollaboratorCreate[] = collaboratorIds.map(
        (id) => ({ id }),
      );
      return await baseApi.postRequest(
        TODO_ENDPOINTS.projectCollaborators(projectId),
        todoProjectCollaboratorsSchema,
        payload,
      );
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
      await baseApi.deleteRequest(
        TODO_ENDPOINTS.projectCollaboratorById(projectId, userId),
        voidResponseSchema,
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
