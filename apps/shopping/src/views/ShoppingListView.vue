<script setup lang="ts">
import { InputText, Button } from '@cockpit-app/shared/vue-ui';
import { useShoppingList } from '../composables/useShoppingList';
import ShoppingList from '../components/ShoppingList.vue';

const {
  shoppingItems,
  newItemTitle,
  addShoppingItem,
  editingItemId,
  editingItemNewTitle,
  startEditing,
  saveItemUpdate,
  toggleShoppingItem,
  deleteShoppingItem,
} = useShoppingList();
</script>

<template>
  <div>
    <div>
      <InputText
        v-model="newItemTitle"
        placeholder="Add a new item"
        @keyup.enter="addShoppingItem"
      />
      <Button @click="addShoppingItem"> Add to list </Button>
    </div>
    <ShoppingList
      v-model="editingItemNewTitle"
      :items="shoppingItems"
      :editing-item-id="editingItemId"
      :start-editing="startEditing"
      :save-item-update="saveItemUpdate"
      :toggle-shopping-item="toggleShoppingItem"
      :delete-shopping-item="deleteShoppingItem"
    />
  </div>
</template>
