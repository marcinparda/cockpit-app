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
      alert('Failed to load shopping items');
    }
  };

  // Call once on initialization
  loadShoppingItems();

  // Add a new shopping item
  const addShoppingItem = async () => {
    if (!newItemTitle.value.trim()) return;

    try {
      const newItem = await shoppingListService.addShoppingItem(
        newItemTitle.value
      );
      shoppingItems.value.push(newItem);
      newItemTitle.value = '';
    } catch (error) {
      console.error('Failed to add shopping item:', error);
      alert('Failed to add shopping item');
    }
  };

  // Toggle a shopping item's completion status
  const toggleShoppingItem = async (id: number) => {
    const item = shoppingItems.value.find((item) => item.id === id);
    if (item) {
      try {
        const updatedItem = { ...item, completed: !item.completed };
        await shoppingListService.updateShoppingItem(updatedItem);
        item.completed = !item.completed;
      } catch (error) {
        console.error('Failed to update shopping item:', error);
        alert('Failed to update shopping item');
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
      alert('Failed to delete shopping item');
    }
  };

  // Start editing a shopping item
  const startEditing = (item: ShoppingItem) => {
    editingItemId.value = item.id;
    updateItemTitle.value = item.title;
  };

  // Save edited shopping item
  const saveItemUpdate = async () => {
    if (editingItemId.value !== null) {
      const item = shoppingItems.value.find(
        (item) => item.id === editingItemId.value
      );
      if (item && updateItemTitle.value.trim()) {
        try {
          const updatedItem = { ...item, title: updateItemTitle.value };
          await shoppingListService.updateShoppingItem(updatedItem);
          item.title = updateItemTitle.value;
        } catch (error) {
          console.error('Failed to update shopping item:', error);
          alert('Failed to update shopping item');
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
