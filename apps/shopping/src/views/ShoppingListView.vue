<script setup lang="ts">
import { useShoppingList } from '../composables/useShoppingList';

const {
  shoppingItems,
  newItemTitle,
  updateItemTitle,
  editingItemId,
  addShoppingItem,
  toggleShoppingItem,
  deleteShoppingItem,
  startEditing,
  saveItemUpdate,
} = useShoppingList();
</script>

<template>
  <div>
    <h1>Shopping List</h1>

    <!-- Create new shopping item -->
    <div>
      <input
        v-model="newItemTitle"
        placeholder="Add a new item"
        @keyup.enter="addShoppingItem"
      />
      <button @click="addShoppingItem">Add to list</button>
    </div>

    <!-- List shopping items -->
    <ul>
      <li v-for="item in shoppingItems" :key="item.id">
        <!-- Edit mode -->
        <div v-if="editingItemId === item.id">
          <input v-model="updateItemTitle" @keyup.enter="saveItemUpdate" />
          <button @click="saveItemUpdate">Save</button>
        </div>

        <!-- Display mode -->
        <div v-else>
          <input
            type="checkbox"
            :checked="item.completed"
            @change="toggleShoppingItem(item.id)"
          />
          <span
            :style="{
              textDecoration: item.is_closed ? 'line-through' : 'none',
            }"
          >
            {{ item.name }}
          </span>
          <button @click="startEditing(item)">Edit</button>
          <button @click="deleteShoppingItem(item.id)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>
