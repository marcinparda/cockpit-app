import { ref, watch } from 'vue';
import type { TodoProject } from '@cockpit-app/api-types';
import { todoProjectsService } from '../services/todoProjectsService';
import { logger } from '@cockpit-app/shared-utils';
import { useRoute } from 'vue-router';

const projects = ref<TodoProject[]>([]);
const isLoading = ref(false);
const selectedProject = ref<TodoProject | null>(null);

async function fetchProjects() {
  try {
    isLoading.value = true;
    projects.value = await todoProjectsService.getAllTodoProjects();
  } catch (error) {
    logger.error('Failed to load todo items:', error);
  } finally {
    isLoading.value = false;
  }
}

fetchProjects();

export function useProjects() {
  const router = useRoute();
  const selectProject = (project: TodoProject | null) => {
    selectedProject.value = project;
  };
  watch(
    [() => router.query['project'], () => projects.value],
    ([newProjectId, projects]) => {
      if (newProjectId && projects && projects.length > 0) {
        const project = projects.find((p) => p.id === Number(newProjectId));
        selectedProject.value = project || null;
      } else {
        selectedProject.value = null;
      }
    },
    { immediate: true }
  );
  return {
    projects,
    isLoading,
    selectedProject,
    selectProject,
  };
}
