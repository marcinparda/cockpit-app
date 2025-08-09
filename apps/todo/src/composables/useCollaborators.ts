import { ref, computed } from 'vue';
import type { TodoProjectCollaboratorResponse } from '@cockpit-app/api-types';
import { collaboratorsService } from '../services/collaboratorsService';
import { logger } from '@cockpit-app/shared-utils';
import { useProjects } from './useProjects';
import { useCurrentUser } from './useCurrentUser';

const collaborators = ref<TodoProjectCollaboratorResponse[]>([]);
const isLoading = ref(false);

export function useCollaborators() {
  const { selectedProject } = useProjects();
  const { currentUser } = useCurrentUser();

  const isCurrentUserOwner = computed(() => {
    if (!selectedProject.value || !currentUser.value) return false;
    return selectedProject.value.owner.id === currentUser.value.user_id;
  });

  async function fetchCollaborators() {
    if (!selectedProject.value) {
      collaborators.value = [];
      return;
    }

    try {
      isLoading.value = true;
      collaborators.value = await collaboratorsService.getCollaborators(
        selectedProject.value.id,
      );
    } catch (err) {
      collaborators.value = [];
      logger.error('Failed to fetch collaborators:', err);
    } finally {
      isLoading.value = false;
    }
  }

  async function addCollaborator(userId: string): Promise<boolean> {
    if (!selectedProject.value) {
      return false;
    }

    try {
      isLoading.value = true;
      const newCollaborators = await collaboratorsService.addCollaborators(
        selectedProject.value.id,
        [userId],
      );
      collaborators.value.push(...newCollaborators);
      return true;
    } catch (err) {
      logger.error('Failed to add collaborator:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function addCollaborators(usersIds: string[]): Promise<boolean> {
    if (!selectedProject.value) {
      return false;
    }

    try {
      isLoading.value = true;
      const newCollaborators = await collaboratorsService.addCollaborators(
        selectedProject.value.id,
        usersIds,
      );
      collaborators.value.push(...newCollaborators);
      return true;
    } catch (err) {
      logger.error('Failed to add collaborator:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  async function removeCollaborator(userId: string): Promise<boolean> {
    if (!selectedProject.value) {
      return false;
    }

    try {
      isLoading.value = true;
      await collaboratorsService.removeCollaborator(
        selectedProject.value.id,
        userId,
      );
      collaborators.value = collaborators.value.filter(
        (collaborator) => collaborator.id !== userId,
      );
      return true;
    } catch (err) {
      logger.error('Failed to remove collaborator:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    collaborators,
    isLoading,
    isCurrentUserOwner,
    addCollaborator,
    addCollaborators,
    removeCollaborator,
    fetchCollaborators,
  };
}
