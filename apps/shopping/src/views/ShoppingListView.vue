<script setup lang="ts">
import { Button, InputText, Checkbox } from '@cockpit-app/shared/vue-ui';
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
    <div>
      <InputText
        v-model="newItemTitle"
        placeholder="Add a new item"
        @keyup.enter="addShoppingItem"
      />
      <Button @click="addShoppingItem"> Add to list </Button>
    </div>

    <ul>
      <li v-for="item in shoppingItems" :key="item.id">
        <div v-if="editingItemId === item.id">
          <InputText v-model="updateItemTitle" @keyup.enter="saveItemUpdate" />
          <Button @click="saveItemUpdate"> Save </Button>
        </div>

        <div v-else>
          <div class="flex items-center gap-2">
            <Checkbox
              v-model="item.is_closed"
              binary
              size="large"
              @change="toggleShoppingItem(item)"
            />
            <label>
              <span
                :style="{
                  textDecoration: item.is_closed ? 'line-through' : 'none',
                }"
                >{{ item.name }}
              </span>
            </label>
          </div>
          <Button @click="startEditing(item)"> Edit </Button>
          <Button @click="deleteShoppingItem(item.id)"> Delete </Button>
        </div>
      </li>
    </ul>
  </div>
</template>
