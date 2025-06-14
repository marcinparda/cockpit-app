<script setup lang="ts">
import type { ShoppingItem as ShoppingItemType } from '../types/ShoppingItem';
import ShoppingItem from './ShoppingItem.vue';

defineProps<{
  items: ShoppingItemType[];
  editingItemId: number | null;
  updateItemTitle: string;
  startEditing: (item: ShoppingItemType) => void;
  saveItemUpdate: () => void;
  toggleShoppingItem: (item: ShoppingItemType) => void;
  deleteShoppingItem: (id: number) => void;
}>();
</script>

<template>
  <ul>
    <ShoppingItem
      v-for="item in items"
      :key="item.id"
      :item="item"
      :editing-item-id="editingItemId"
      :update-item-title="updateItemTitle"
      @start-editing="startEditing"
      @save-item-update="saveItemUpdate"
      @toggle-shopping-item="toggleShoppingItem"
      @delete-shopping-item="deleteShoppingItem"
    />
  </ul>
</template>
