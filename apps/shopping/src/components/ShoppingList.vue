<script setup lang="ts">
import type { ShoppingItem as ShoppingItemType } from '../types/ShoppingItem';
import ShoppingItem from './ShoppingItem.vue';

const props = defineProps<{
  items: ShoppingItemType[];
  editingItemId: number | null;
  startEditing: (item: ShoppingItemType) => void;
  saveItemUpdate: () => void;
  toggleShoppingItem: (id: number, value: boolean) => void;
  deleteShoppingItem: (id: number) => void;
}>();

const editingItemNewTitle = defineModel<string>('editingItemNewTitle');
</script>

<template>
  <ul>
    <ShoppingItem
      v-for="item in items"
      :key="item.id"
      v-model="editingItemNewTitle"
      :item="item"
      :editing-item-id="editingItemId"
      @start-editing="startEditing"
      @save-item-update="saveItemUpdate"
      @toggle-shopping-item="
        (item, value) => toggleShoppingItem(item.id, value)
      "
      @delete-shopping-item="deleteShoppingItem"
    />
  </ul>
</template>
