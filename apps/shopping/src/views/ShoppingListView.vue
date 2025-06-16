<script setup lang="ts">
import { InputText, Button } from '@cockpit-app/shared/vue-ui';
import { ref } from 'vue';
import { useShoppingList } from '../composables/useShoppingList';
import ShoppingList from '../components/ShoppingList.vue';
import type { ShoppingItem } from '../types/ShoppingItem';

const newItemTitle = ref('');
const editingItemNewTitle = ref('');

const {
  shoppingItems,
  editingItemId,
  addShoppingItem,
  startEditing,
  saveEditedItem,
  cancelEditedItem,
  toggleShoppingItem,
  deleteShoppingItem,
} = useShoppingList();

const handleAddShoppingItem = async () => {
  await addShoppingItem(newItemTitle.value);
  newItemTitle.value = '';
};

const handleStartEditing = (item: ShoppingItem) => {
  startEditing(item);
  editingItemNewTitle.value = item.name;
};

const handleSaveEditedItem = async () => {
  await saveEditedItem(editingItemNewTitle.value);
  editingItemNewTitle.value = '';
};
</script>

<template>
  <div class="max-w-2xl mx-auto py-8">
    <div class="flex items-center gap-2">
      <InputText
        v-model="newItemTitle"
        class="flex-1"
        placeholder="Add a new item"
        @keyup.enter="handleAddShoppingItem"
      />
      <Button @click="handleAddShoppingItem"> Add to list </Button>
    </div>
    <ShoppingList
      v-model:editing-item-new-title="editingItemNewTitle"
      :items="shoppingItems"
      :editing-item-id="editingItemId"
      :start-editing="handleStartEditing"
      :cancel-edited-item="cancelEditedItem"
      :save-edited-item="handleSaveEditedItem"
      :toggle-shopping-item="toggleShoppingItem"
      :delete-shopping-item="deleteShoppingItem"
    />
  </div>
</template>
