<script setup lang="ts">
import type { ShoppingItem as ShoppingItemType } from '../types/ShoppingItem';
import ShoppingItem from './ShoppingItem.vue';
import { Divider } from '@cockpit-app/shared/vue-ui';

const props = defineProps<{
  items: ShoppingItemType[];
  editingItemId: number | null;
  editingItemNewTitle: string;
  startEditing: (item: ShoppingItemType) => void;
  cancelEditedItem: () => void;
  saveEditedItem: () => void;
  toggleShoppingItem: (id: number, value: boolean) => void;
  deleteShoppingItem: (id: number) => void;
}>();

const emit = defineEmits(['update:editingItemNewTitle']);

const handleInput = (val: string) => {
  emit('update:editingItemNewTitle', val);
};
</script>

<template>
  <ul class="py-8">
    <template v-for="(item, idx) in items" :key="item.id">
      <ShoppingItem
        :item="item"
        :editing-item-id="editingItemId"
        :editing-item-new-title="editingItemNewTitle"
        @update:editing-item-new-title="handleInput"
        @start-editing="startEditing"
        @cancel-edited-item="cancelEditedItem"
        @save-edited-item="saveEditedItem"
        @toggle-shopping-item="
          (item, value) => toggleShoppingItem(item.id, value)
        "
        @delete-shopping-item="deleteShoppingItem"
      />
      <Divider v-if="idx < items.length - 1" class="my-2" />
    </template>
  </ul>
</template>
