<script setup lang="ts">
import { InputText, Button } from '@cockpit-app/shared/vue-ui';
import { ref, computed } from 'vue';
import { useTodoList } from '../composables/useTodoList';
import TodoList from '../components/TodoList.vue';
import type { TodoItem } from '../types/TodoItem';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import ProjectSelect from '../components/ProjectSelect.vue';

const newItemTitle = ref('');
const editingItemNewTitle = ref('');
const route = useRoute();

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

const projectParam = computed(() => route.query['project'] || 'All');
const filteredItems = computed(() => {
  if (projectParam.value === 'All' || !projectParam.value)
    return todoItems.value;
  return todoItems.value.filter(
    (item) => item.project && item.project.name === projectParam.value
  );
});
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
    <div class="hidden md:flex">
      <Sidebar />
    </div>
    <div class="md:hidden">
      <ProjectSelect />
    </div>
    <div class="max-w-2xl flex-1 mx-auto py-6">
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
        :items="filteredItems"
        :editing-item-id="editingItemId"
        :start-editing="handleStartEditing"
        :cancel-edited-item="cancelEditedItem"
        :save-edited-item="handleSaveEditedItem"
        :toggle-todo-item="toggleTodoItem"
        :delete-todo-item="deleteTodoItem"
      />
    </div>
  </div>
</template>
