import { computed, ref, watch } from 'vue';
import type {
  TodoProject,
  TodoProjectCreate,
  TodoProjectUpdate,
} from '@cockpit-app/api-types';
import { todoProjectsService } from '../services/todoProjectsService';
import { logger } from '@cockpit-app/shared-utils';
import { useRoute } from 'vue-router';
import { useCurrentUser } from '../composables/useCurrentUser';

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

async function addProject(name: string) {
  if (!name.trim()) return;
  const newProject: TodoProjectCreate = {
    name,
  };
  try {
    const createdProject = await todoProjectsService.addTodoProject(newProject);
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
  updates: TodoProjectUpdate
) {
  try {
    const updatedProject = await todoProjectsService.updateTodoProject(
      projectId,
      updates
    );
    const index = projects.value.findIndex((p) => p.id === updatedProject.id);
    if (index !== -1) {
      projects.value[index] = updatedProject;
    }
  } catch (error) {
    logger.error('Failed to update project:', error);
  }
}

fetchProjects();

export function useProjects() {
  const router = useRoute();
  const selectProject = (project: TodoProject | null) => {
    selectedProject.value = project;
  };
  const { currentUser } = useCurrentUser();

  const myProjects = computed(() => {
    const currentUserId = currentUser.value?.user_id;
    if (!currentUserId) return [];
    return projects.value.filter(
      (project) => project.owner_id === currentUserId
    );
  });

  const sharedProjects = computed(() => {
    const currentUserId = currentUser.value?.user_id;
    if (!currentUserId) return [];
    return projects.value.filter(
      (project) => project.owner_id !== currentUserId
    );
  });

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
    myProjects,
    sharedProjects,
    isLoading,
    selectedProject,
    selectProject,
    addProject,
    deleteProject,
    updateProject,
  };
}
