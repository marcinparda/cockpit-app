import { ref, onMounted, onUnmounted } from 'vue';
import type { TodoItem } from '../types/TodoItem';
import { todoItemsService } from '../services/todoItemsService';

export function useTodoList() {
  // State for todo items
  const todoItems = ref<TodoItem[]>([]);
  // State for currently edited item id
  const editingItemId = ref<number | null>(null);

  // Reference for the refresh interval
  let refreshInterval: number | null = null;

  // Load todo items
  const loadTodoItems = async () => {
    try {
      todoItems.value = await todoItemsService.getTodoItems();
    } catch (error) {
      console.error('Failed to load todo items:', error);
    }
  };

  // Setup automatic refresh
  onMounted(() => {
    // Initial load
    loadTodoItems();

    // Set up interval to refresh data every 5 seconds
    refreshInterval = window.setInterval(() => {
      loadTodoItems();
    }, 5000);
  });

  // Clean up interval when component unmounts
  onUnmounted(() => {
    if (refreshInterval !== null) {
      clearInterval(refreshInterval);
    }
  });

  // Add a new todo item
  const addTodoItem = async (title: string, projectId: number | null) => {
    if (!title.trim()) return;

    const newItem: Partial<TodoItem> = {
      name: title,
      project_id: projectId,
    };

    try {
      const createdItem = await todoItemsService.addTodoItem(newItem);
      todoItems.value = [...todoItems.value, createdItem].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } catch (error) {
      console.error('Failed to add todo item:', error);
    }
  };

  const toggleTodoItem = async (id: number, value: boolean) => {
    const item = todoItems.value.find((item) => item.id === id);
    if (item) {
      try {
        await todoItemsService.updateTodoItem(id, {
          is_closed: value,
          completed_at: value ? new Date().toISOString() : null,
        });

        // Create a new array with the updated item
        const updatedItems = todoItems.value
          .map((i) =>
            i.id === id
              ? {
                  ...i,
                  is_closed: value,
                  completed_at: value ? new Date().toISOString() : null,
                }
              : i
          )
          .sort((a, b) => a.name.localeCompare(b.name));
        todoItems.value = updatedItems;
      } catch (error) {
        console.error('Failed to update todo item:', error);
      }
    }
  };

  // Delete a todo item
  const deleteTodoItem = async (id: number) => {
    try {
      await todoItemsService.deleteTodoItem(id);
      todoItems.value = todoItems.value.filter((item) => item.id !== id);
    } catch (error) {
      console.error('Failed to delete todo item:', error);
    }
  };

  // Start editing a todo item
  const startEditing = (item: TodoItem) => {
    editingItemId.value = item.id;
  };

  const cancelEditedItem = () => {
    editingItemId.value = null;
  };

  // Save edited todo item
  const saveEditedItem = async (newTitle: string) => {
    if (editingItemId.value !== null && newTitle.trim()) {
      const item = todoItems.value.find(
        (item) => item.id === editingItemId.value
      );
      if (item) {
        try {
          await todoItemsService.updateTodoItem(item.id, {
            name: newTitle,
          });

          // Create a new array with the updated item and sort them by name
          const updatedItems = todoItems.value
            .map((todoItem) =>
              todoItem.id === item.id
                ? {
                    ...todoItem,
                    name: newTitle,
                  }
                : todoItem
            )
            .sort((a, b) => a.name.localeCompare(b.name));
          todoItems.value = updatedItems;
        } catch (error) {
          console.error('Failed to update todo item:', error);
        }
      }
      editingItemId.value = null;
    }
  };

  return {
    todoItems,
    editingItemId,
    addTodoItem,
    toggleTodoItem,
    deleteTodoItem,
    startEditing,
    cancelEditedItem,
    saveEditedItem,
  };
}
