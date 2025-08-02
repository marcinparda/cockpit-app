<script setup lang="ts">
import type { TodoItem as TodoItemType } from '@cockpit-app/api-types';
import TodoItem from './TodoItem.vue';
import { Divider } from '@cockpit-app/shared-vue-ui';

const props = defineProps<{
  items: TodoItemType[];
  editingItemId: number | null;
  editingItemNewTitle: string;
  startEditing: (item: TodoItemType) => void;
  cancelEditedItem: () => void;
  saveEditedItem: () => void;
  toggleTodoItem: (id: number, value: boolean) => void;
  deleteTodoItem: (id: number) => void;
}>();

const emit = defineEmits(['update:editingItemNewTitle']);

const handleInput = (val: string) => {
  emit('update:editingItemNewTitle', val);
};
</script>

<template>
  <ul class="py-8">
    <template v-for="(item, idx) in items" :key="item.id">
      <TodoItem
        :item="item"
        :editing-item-id="editingItemId"
        :editing-item-new-title="editingItemNewTitle"
        @update:editing-item-new-title="handleInput"
        @start-editing="startEditing"
        @cancel-edited-item="cancelEditedItem"
        @save-edited-item="saveEditedItem"
        @toggle-todo-item="(item, value) => toggleTodoItem(item.id, value)"
        @delete-todo-item="deleteTodoItem"
      />
      <Divider v-if="idx < items.length - 1" class="my-2" />
    </template>
  </ul>
</template>
