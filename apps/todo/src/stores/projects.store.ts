import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type {
  TodoProject,
  TodoProjectCreate,
  TodoProjectUpdate,
} from '@cockpit-app/api-types';
import { todoProjectsService } from '@cockpit-app/todo-data-access';
import { logger } from '@cockpit-app/shared-utils';
import { useRoute } from 'vue-router';
import { useCurrentUserStore } from './currentUser.store';

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<TodoProject[]>([]);
  const isLoading = ref(false);
  const route = useRoute();

  const selectedProject = computed<TodoProject | null>(() => {
    const param = route.query['project'];
    const id =
      typeof param === 'string'
        ? Number(param)
        : Array.isArray(param)
          ? Number(param[0])
          : null;
    if (!id) return null;
    return projects.value.find((p) => p.id === id) ?? null;
  });

  const myProjects = computed(() => {
    const { currentUser } = useCurrentUserStore();
    const currentUserId = currentUser?.user_id;
    if (!currentUserId) return [] as TodoProject[];
    return projects.value.filter((p) => p.owner.id === currentUserId);
  });

  const sharedProjects = computed(() => {
    const { currentUser } = useCurrentUserStore();
    const currentUserId = currentUser?.user_id;
    if (!currentUserId) return [] as TodoProject[];
    return projects.value.filter((p) => p.owner.id !== currentUserId);
  });

  async function fetchProjects() {
    try {
      isLoading.value = true;
      projects.value = await todoProjectsService.getAllTodoProjects();
    } catch (error) {
      logger.error('Failed to load projects:', error);
    } finally {
      isLoading.value = false;
    }
  }

  async function addProject(name: string) {
    if (!name.trim()) return;
    const newProject: TodoProjectCreate = { name };
    try {
      const createdProject =
        await todoProjectsService.addTodoProject(newProject);
      projects.value.push(createdProject);
    } catch (error) {
      logger.error('Failed to add project:', error);
    }
  }

  async function deleteProject(projectId: number) {
    try {
      await todoProjectsService.deleteTodoProject(projectId);
      projects.value = projects.value.filter((p) => p.id !== projectId);
    } catch (error) {
      logger.error('Failed to delete project:', error);
    }
  }

  async function updateProject(
    projectId: TodoProject['id'],
    updates: TodoProjectUpdate,
  ) {
    try {
      const updatedProject = await todoProjectsService.updateTodoProject(
        projectId,
        updates,
      );
      const index = projects.value.findIndex((p) => p.id === updatedProject.id);
      if (index !== -1) {
        projects.value[index] = updatedProject;
      }
    } catch (error) {
      logger.error('Failed to update project:', error);
    }
  }

  function selectProject() {
    // Kept for compatibility if components want to set selection explicitly
    // In most cases selectedProject is derived from the route
  }

  return {
    projects,
    isLoading,
    selectedProject,
    myProjects,
    sharedProjects,
    fetchProjects,
    addProject,
    deleteProject,
    updateProject,
    selectProject,
  };
});
