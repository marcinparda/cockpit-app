import { ref, onScopeDispose, watch, type Ref } from 'vue';
import type {
  TodoItem,
  TodoItemCreate,
  TodoItemUpdate,
  TodoProject,
} from '@cockpit-app/api-types';
import { todoItemsService } from '@cockpit-app/todo-data-access';
import { logger } from '@cockpit-app/shared-utils';

// Shared state - singleton across all instances
const todoItems = ref<TodoItem[]>([]);
const isLoading = ref(false);
const currentProjectId = ref<number | null>(null);

// single shared poller across all consumers of this composable
let pollerId: ReturnType<typeof setInterval> | null = null;
let pollerConsumers = 0;

function areTodoItemsEqual(a: TodoItem[], b: TodoItem[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, idx) => {
    const other = b[idx];
    return (
      item.id === other.id &&
      item.name === other.name &&
      item.is_closed === other.is_closed &&
      item.completed_at === other.completed_at &&
      item.project_id === other.project_id &&
      item.project?.name === other.project?.name
    );
  });
}

async function fetchTodoItemsForProject(projectId?: number) {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const fetchedItems = await todoItemsService.getTodoItems(0, 100, projectId);
    const current = todoItems.value;
    const areTodoItemsCached = areTodoItemsEqual(current, fetchedItems);
    if (!areTodoItemsCached) {
      todoItems.value = fetchedItems;
    }
  } catch (error) {
    logger.error('Failed to load todo items:', error);
  } finally {
    isLoading.value = false;
  }
}

async function fetchTodoItemsForInbox(projects: TodoProject[]) {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    const promises = projects.map((project) =>
      todoItemsService.getTodoItems(0, 100, project.id),
    );

    const results = await Promise.all(promises);
    const allItems = results.flat();
    const sortedItems = allItems.sort((a, b) => a.name.localeCompare(b.name));

    const current = todoItems.value;
    const areTodoItemsCached = areTodoItemsEqual(current, sortedItems);
    if (!areTodoItemsCached) {
      todoItems.value = sortedItems;
    }
  } catch (error) {
    logger.error('Failed to load todo items for inbox:', error);
  } finally {
    isLoading.value = false;
  }
}

const addTodoItem = async (title: string, projectId: number) => {
  if (!title.trim()) return;

  const newItem: TodoItemCreate = {
    name: title,
    project_id: projectId,
  };

  try {
    const createdItem = await todoItemsService.addTodoItem(newItem);
    todoItems.value = [...todoItems.value, createdItem].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  } catch (error) {
    console.error('Failed to add todo item:', error);
  }
};

const toggleTodoItem = async (todoItemId: number, value: boolean) => {
  const item = todoItems.value.find((item) => item.id === todoItemId);
  if (item) {
    try {
      const updateData: TodoItemUpdate = {
        is_closed: value,
        completed_at: value ? new Date().toISOString() : null,
      };

      await todoItemsService.updateTodoItem(todoItemId, updateData);

      const updatedItems = todoItems.value
        .map((i) =>
          i.id === todoItemId
            ? {
                ...i,
                is_closed: value,
                completed_at: value ? new Date().toISOString() : null,
              }
            : i,
        )
        .sort((a, b) => a.name.localeCompare(b.name));
      todoItems.value = updatedItems;
    } catch (error) {
      console.error('Failed to update todo item:', error);
    }
  }
};

const deleteTodoItem = async (todoItemId: number) => {
  try {
    await todoItemsService.deleteTodoItem(todoItemId);
    todoItems.value = todoItems.value.filter((item) => item.id !== todoItemId);
  } catch (error) {
    console.error('Failed to delete todo item:', error);
  }
};

const updateTodoItemTitle = async (todoItemId: number, newTitle: string) => {
  const updateData: TodoItemUpdate = {
    name: newTitle,
  };
  try {
    await todoItemsService.updateTodoItem(todoItemId, updateData);
    todoItems.value = todoItems.value
      .map((item) =>
        item.id === todoItemId ? { ...item, name: newTitle } : item,
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Failed to update todo item:', error);
  }
};

function setCurrentProject(projectId: number | null) {
  currentProjectId.value = projectId;
}

async function fetchTodoItems() {
  await fetchTodoItemsForProject(currentProjectId.value || undefined);
}

export function useTodoItems(
  selectedProject?: Ref<TodoProject | null>,
  projects?: Ref<TodoProject[]>,
) {
  if (selectedProject && projects) {
    watch(
      [selectedProject, projects],
      async ([newProject, allProjects]) => {
        if (!allProjects || allProjects.length === 0) {
          if (!newProject) {
            todoItems.value = [];
            return;
          }
          return;
        }

        if (newProject) {
          setCurrentProject(newProject.id);
          debugger;
          await fetchTodoItemsForProject(newProject.id);
        } else {
          setCurrentProject(null);
          await fetchTodoItemsForInbox(allProjects);
        }
      },
      { immediate: true },
    );
  }

  function startPolling(intervalMs = 10000) {
    pollerConsumers += 1;
    if (pollerId) return;
    pollerId = setInterval(() => {
      if (!isLoading.value) {
        if (currentProjectId.value) {
          fetchTodoItemsForProject(currentProjectId.value);
        } else if (projects?.value && projects.value.length > 0) {
          fetchTodoItemsForInbox(projects.value);
        } else {
          fetchTodoItems();
        }
      }
    }, intervalMs);
  }

  function stopPolling() {
    pollerConsumers = Math.max(0, pollerConsumers - 1);
    if (pollerConsumers === 0 && pollerId) {
      clearInterval(pollerId);
      pollerId = null;
    }
  }

  onScopeDispose(() => {
    stopPolling();
  });

  return {
    todoItems,
    fetchTodoItems,
    fetchTodoItemsForProject,
    fetchTodoItemsForInbox,
    setCurrentProject,
    addTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    updateTodoItemTitle,
    startPolling,
    stopPolling,
    isLoading,
  };
}
