import { ref, onMounted, onUnmounted } from 'vue';
import type { ShoppingItem } from '../types/ShoppingItem';
import { shoppingListService } from '../services/shoppingListService';

export function useShoppingList() {
  // State for shopping items
  const shoppingItems = ref<ShoppingItem[]>([]);
  // State for currently edited item id
  const editingItemId = ref<number | null>(null);

  // Reference for the refresh interval
  let refreshInterval: number | null = null;

  // Load shopping items
  const loadShoppingItems = async () => {
    try {
      shoppingItems.value = await shoppingListService.getShoppingItems();
    } catch (error) {
      console.error('Failed to load shopping items:', error);
    }
  };

  // Setup automatic refresh
  onMounted(() => {
    // Initial load
    loadShoppingItems();

    // Set up interval to refresh data every 5 seconds
    refreshInterval = window.setInterval(() => {
      loadShoppingItems();
    }, 5000);
  });

  // Clean up interval when component unmounts
  onUnmounted(() => {
    if (refreshInterval !== null) {
      clearInterval(refreshInterval);
    }
  });

  // Add a new shopping item
  const addShoppingItem = async (title: string) => {
    if (!title.trim()) return;

    const newItem = {
      name: title,
    };

    try {
      const createdItem = await shoppingListService.addShoppingItem(newItem);
      shoppingItems.value = [...shoppingItems.value, createdItem];
    } catch (error) {
      console.error('Failed to add shopping item:', error);
    }
  };

  const toggleShoppingItem = async (id: number, value: boolean) => {
    const item = shoppingItems.value.find((item) => item.id === id);
    if (item) {
      try {
        await shoppingListService.updateShoppingItem(id, {
          is_closed: value,
          completed_at: value ? new Date().toISOString() : null,
        });

        // Create a new array with the updated item
        const updatedItems = shoppingItems.value.map((i) =>
          i.id === id
            ? {
                ...i,
                is_closed: value,
                completed_at: value ? new Date().toISOString() : null,
              }
            : i
        );
        shoppingItems.value = updatedItems;
      } catch (error) {
        console.error('Failed to update shopping item:', error);
      }
    }
  };

  // Delete a shopping item
  const deleteShoppingItem = async (id: number) => {
    try {
      await shoppingListService.deleteShoppingItem(id);
      shoppingItems.value = shoppingItems.value.filter(
        (item) => item.id !== id
      );
    } catch (error) {
      console.error('Failed to delete shopping item:', error);
    }
  };

  // Start editing a shopping item
  const startEditing = (item: ShoppingItem) => {
    editingItemId.value = item.id;
  };

  const cancelEditedItem = () => {
    editingItemId.value = null;
  };

  // Save edited shopping item
  const saveEditedItem = async (newTitle: string) => {
    if (editingItemId.value !== null && newTitle.trim()) {
      const item = shoppingItems.value.find(
        (item) => item.id === editingItemId.value
      );
      if (item) {
        try {
          await shoppingListService.updateShoppingItem(item.id, {
            name: newTitle,
          });

          // Create a new array with the updated item
          const updatedItems = shoppingItems.value.map((shoppingItem) =>
            shoppingItem.id === item.id
              ? {
                  ...shoppingItem,
                  name: newTitle,
                }
              : shoppingItem
          );
          shoppingItems.value = updatedItems;
        } catch (error) {
          console.error('Failed to update shopping item:', error);
        }
      }
      editingItemId.value = null;
    }
  };

  return {
    shoppingItems,
    editingItemId,
    addShoppingItem,
    toggleShoppingItem,
    deleteShoppingItem,
    startEditing,
    cancelEditedItem,
    saveEditedItem,
  };
}
