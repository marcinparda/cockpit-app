import { ref } from 'vue';
import type { TodoProject } from '@cockpit-app/api-types';
import { todoProjectsService } from '../services/todoProjectsService';
import { logger } from '@cockpit-app/shared-utils';

const todoProjects = ref<TodoProject[]>([]);
const isLoading = ref(false);

async function fetchProjects() {
  try {
    isLoading.value = true;
    todoProjects.value = await todoProjectsService.getAllTodoProjects();
  } catch (error) {
    logger.error('Failed to load todo items:', error);
  } finally {
    isLoading.value = false;
  }
}

fetchProjects();

export function useProjects() {
  return {
    todoProjects,
    isLoading,
  };
}
