<script setup lang="ts">
  import { cn } from '@cockpit-app/shared-react-ui';
  import { Button, InputText, Checkbox } from '@cockpit-app/shared-vue-ui';
  import type { TodoItem } from '@cockpit-app/api-types';
  import { ref } from 'vue';
  import { useItems } from '../composables/useTodoItems';

  const props = defineProps<{
    item: TodoItem;
  }>();
  const { toggleTodoItem, deleteTodoItem, updateTodoItemTitle } = useItems();

  const isEditing = ref(false);
  const editingItemNewTitle = ref('');

  function handleEditNameInput(val: string | undefined) {
    editingItemNewTitle.value = val ?? '';
  }

  function startEditing() {
    if (props.item) {
      editingItemNewTitle.value = props.item.name;
      isEditing.value = true;
    }
  }

  function cancelEditing() {
    isEditing.value = false;
  }

  async function handleSaveTodoItem() {
    if (!editingItemNewTitle.value.trim()) {
      cancelEditing();
      return;
    }

    try {
      await updateTodoItemTitle(props.item.id, editingItemNewTitle.value);
      editingItemNewTitle.value = '';
      isEditing.value = false;
    } catch (error) {
      console.error('Failed to save todo item:', error);
    }
  }

  async function handleCheckboxChange(val: boolean) {
    await toggleTodoItem(props.item.id, val);
  }

  async function handleDeleteButtonClick() {
    await deleteTodoItem(props.item.id);
  }
</script>

<template>
  <li v-if="item">
    <div v-if="isEditing" class="flex items-center gap-2 p-2">
      <InputText
        class="flex-1"
        :model-value="editingItemNewTitle"
        type="text"
        placeholder="Enter new item title"
        @update:model-value="handleEditNameInput"
        @keyup.enter="handleSaveTodoItem"
      />
      <Button @click="handleSaveTodoItem" @click.stop>Save</Button>
      <Button severity="secondary" @click="cancelEditing" @click.stop>
        Cancel
      </Button>
    </div>
    <div
      v-if="!isEditing"
      class="flex items-center gap-2 cursor-pointer hover:bg-neutral-800 rounded p-2"
      @click="startEditing"
    >
      <Checkbox
        :model-value="item.is_closed"
        binary
        size="large"
        @update:model-value="handleCheckboxChange"
        @click.stop
      />
      <label>
        <span
          :class="cn('cursor-pointer', item.is_closed ? 'line-through' : '')"
        >
          {{ item.name }}
        </span>
      </label>
      <Button
        class="ml-auto"
        severity="danger"
        @click="handleDeleteButtonClick"
        @click.stop
      >
        Delete
      </Button>
    </div>
  </li>
</template>
