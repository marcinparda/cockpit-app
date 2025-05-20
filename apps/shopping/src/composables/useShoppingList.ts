import { ref } from 'vue';
import type { ShoppingItem } from '../types/ShoppingItem';
import { shoppingListService } from '../services/shoppingListService';

export function useShoppingList() {
  // State for shopping items
  const shoppingItems = ref<ShoppingItem[]>([]);

  // State for new shopping item input and editing
  const newItemTitle = ref('');
  const updateItemTitle = ref('');
  const editingItemId = ref<number | null>(null);

  // Load shopping items
  const loadShoppingItems = async () => {
    try {
      shoppingItems.value = await shoppingListService.getShoppingItems();
    } catch (error) {
      console.error('Failed to load shopping items:', error);
    }
  };

  // Call once on initialization
  loadShoppingItems();

  // Add a new shopping item
  const addShoppingItem = async () => {
    if (!newItemTitle.value.trim()) return;

    const newItem = {
      name: newItemTitle.value,
    };

    try {
      const createdItem = await shoppingListService.addShoppingItem(newItem);
      shoppingItems.value.push(createdItem);
      newItemTitle.value = '';
    } catch (error) {
      console.error('Failed to add shopping item:', error);
    }
  };

  // Toggle a shopping item's completion status
  const toggleShoppingItem = async (id: number) => {
    const item = shoppingItems.value.find((item) => item.id === id);
    if (item) {
      try {
        const completed_at = item.is_closed ? null : new Date().toISOString();
        await shoppingListService.updateShoppingItem(id, {
          is_closed: !item.is_closed,
          completed_at,
        });
        item.is_closed = !item.is_closed;
        item.completed_at = completed_at;
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
    updateItemTitle.value = item.name;
  };

  // Save edited shopping item
  const saveItemUpdate = async () => {
    if (editingItemId.value !== null) {
      const item = shoppingItems.value.find(
        (item) => item.id === editingItemId.value
      );
      if (item && updateItemTitle.value.trim()) {
        try {
          await shoppingListService.updateShoppingItem(item.id, {
            name: updateItemTitle.value,
          });
          item.name = updateItemTitle.value;
        } catch (error) {
          console.error('Failed to update shopping item:', error);
        }
      }
      editingItemId.value = null;
      updateItemTitle.value = '';
    }
  };

  return {
    shoppingItems,
    newItemTitle,
    updateItemTitle,
    editingItemId,
    addShoppingItem,
    toggleShoppingItem,
    deleteShoppingItem,
    startEditing,
    saveItemUpdate,
  };
}
