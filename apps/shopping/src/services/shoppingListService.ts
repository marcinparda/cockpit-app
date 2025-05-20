import type { ShoppingItem } from '../types/ShoppingItem';

// This is a mock service that simulates API calls
// In a real application, you would replace these with actual API calls

// Initial mock data
const mockShoppingItems: ShoppingItem[] = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Clean the house', completed: true },
];

export const shoppingListService = {
  // Get all shopping items
  async getShoppingItems(): Promise<ShoppingItem[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));
    return [...mockShoppingItems];
  },

  // Add a new shopping item
  async addShoppingItem(title: string): Promise<ShoppingItem> {
    const newId =
      mockShoppingItems.length > 0
        ? Math.max(...mockShoppingItems.map((item) => item.id)) + 1
        : 1;

    const newItem: ShoppingItem = {
      id: newId,
      title,
      completed: false,
    };

    mockShoppingItems.push(newItem);
    return newItem;
  },

  // Update a shopping item
  async updateShoppingItem(updatedItem: ShoppingItem): Promise<ShoppingItem> {
    const index = mockShoppingItems.findIndex(
      (item) => item.id === updatedItem.id
    );
    if (index !== -1) {
      mockShoppingItems[index] = { ...updatedItem };
      return mockShoppingItems[index];
    }
    throw new Error('Shopping item not found');
  },

  // Delete a shopping item
  async deleteShoppingItem(id: number): Promise<void> {
    const index = mockShoppingItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockShoppingItems.splice(index, 1);
      return;
    }
    throw new Error('Shopping item not found');
  },
};
