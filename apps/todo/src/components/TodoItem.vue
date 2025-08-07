<script setup lang="ts">
  import { cn } from '@cockpit-app/shared-react-ui';
  import { Button, InputText, Checkbox } from '@cockpit-app/shared-vue-ui';
  import type { TodoItem as TodoItemType } from '@cockpit-app/api-types';
  import { computed } from 'vue';

  const props = defineProps<{
    item: TodoItemType;
    editingItemId: number | null;
    editingItemNewTitle: string;
  }>();

  const emit = defineEmits<{
    (e: 'start-editing', item: TodoItemType): void;
    (e: 'save-edited-item'): void;
    (e: 'toggle-todo-item', item: TodoItemType, value: boolean): void;
    (e: 'delete-todo-item', id: number): void;
    (e: 'update:editingItemNewTitle', value: string): void;
    (e: 'cancel-edited-item'): void;
  }>();

  const isEditing = computed(() => props.editingItemId === props.item.id);

  function handleEditNameInput(val: string | undefined) {
    emit('update:editingItemNewTitle', val ?? '');
  }
</script>

<template>
  <li>
    <div v-if="isEditing" class="flex items-center gap-2 p-2">
      <InputText
        class="flex-1"
        :model-value="editingItemNewTitle"
        type="text"
        placeholder="Enter new item title"
        @update:model-value="handleEditNameInput"
        @keyup.enter="emit('save-edited-item')"
      />
      <Button @click="emit('save-edited-item')" @click.stop>Save</Button>
      <Button
        severity="secondary"
        @click="emit('cancel-edited-item')"
        @click.stop
      >
        Cancel
      </Button>
    </div>
    <div
      v-else
      class="flex items-center gap-2 cursor-pointer hover:bg-neutral-800 rounded p-2"
      @click="emit('start-editing', item)"
    >
      <Checkbox
        :model-value="item.is_closed"
        binary
        size="large"
        @update:model-value="(val) => emit('toggle-todo-item', item, val)"
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
        @click="emit('delete-todo-item', item.id)"
        @click.stop
      >
        Delete
      </Button>
    </div>
  </li>
</template>
