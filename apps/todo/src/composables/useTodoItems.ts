import { ref, onMounted, onScopeDispose } from 'vue';
import type {
  TodoItem,
  TodoItemCreate,
  TodoItemUpdate,
} from '@cockpit-app/api-types';
import { todoItemsService } from '@cockpit-app/todo-data-access';
import { logger } from '@cockpit-app/shared-utils';

const todoItems = ref<TodoItem[]>([]);
const isLoading = ref(false);

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
      item.project_id === other.project_id
    );
  });
}

async function fetchTodoItems() {
  isLoading.value = true;
  try {
    const fetchedItems = await todoItemsService.getTodoItems();
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

export function useTodoItems() {
  // Fetch items when the composable is used within a component lifecycle
  onMounted(() => {
    fetchTodoItems();
  });

  function startPolling(intervalMs = 10000) {
    pollerConsumers += 1;
    if (pollerId) return;
    pollerId = setInterval(() => {
      if (!isLoading.value) {
        fetchTodoItems();
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
    addTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    updateTodoItemTitle,
    startPolling,
    stopPolling,
  };
}
