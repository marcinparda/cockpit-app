<script setup lang="ts">
import { InputText, Button } from '@cockpit-app/shared/vue-ui';
import { ref } from 'vue';
import { useTodoList } from '../composables/useTodoList';
import TodoList from '../components/TodoList.vue';
import type { TodoItem } from '../types/TodoItem';

const newItemTitle = ref('');
const editingItemNewTitle = ref('');

const {
  todoItems,
  editingItemId,
  addTodoItem,
  startEditing,
  saveEditedItem,
  cancelEditedItem,
  toggleTodoItem,
  deleteTodoItem,
} = useTodoList();

const handleAddTodoItem = async () => {
  await addTodoItem(newItemTitle.value);
  newItemTitle.value = '';
};

const handleStartEditing = (item: TodoItem) => {
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
        @keyup.enter="handleAddTodoItem"
      />
      <Button @click="handleAddTodoItem"> Add to list </Button>
    </div>
    <TodoList
      v-model:editing-item-new-title="editingItemNewTitle"
      :items="todoItems"
      :editing-item-id="editingItemId"
      :start-editing="handleStartEditing"
      :cancel-edited-item="cancelEditedItem"
      :save-edited-item="handleSaveEditedItem"
      :toggle-todo-item="toggleTodoItem"
      :delete-todo-item="deleteTodoItem"
    />
  </div>
</template>
