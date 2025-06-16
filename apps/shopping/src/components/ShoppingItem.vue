<script setup lang="ts">
import { Button, InputText, Checkbox } from '@cockpit-app/shared/vue-ui';
import type { ShoppingItem as ShoppingItemType } from '../types/ShoppingItem';
import { computed } from 'vue';

const props = defineProps<{
  item: ShoppingItemType;
  editingItemId: number | null;
}>();

const emit = defineEmits<{
  (e: 'start-editing', item: ShoppingItemType): void;
  (e: 'save-item-update'): void;
  (e: 'toggle-shopping-item', item: ShoppingItemType, value: boolean): void;
  (e: 'delete-shopping-item', id: number): void;
}>();

const editingItemNewTitle = defineModel<string>('editingItemNewTitle');

const isEditing = computed(() => props.editingItemId === props.item.id);
</script>

<template>
  <li>
    <div v-if="isEditing">
      <InputText
        v-model="editingItemNewTitle"
        @keyup.enter="emit('save-item-update')"
      />
      <Button @click="emit('save-item-update')"> Save </Button>
    </div>
    <div v-else>
      <div class="flex items-center gap-2">
        <Checkbox
          :model-value="item.is_closed"
          binary
          size="large"
          @update:model-value="(val) => emit('toggle-shopping-item', item, val)"
        />
        <label>
          <span
            :style="{
              textDecoration: item.is_closed ? 'line-through' : 'none',
            }"
            >{{ item.name }}</span
          >
        </label>
      </div>
      <Button @click="emit('start-editing', item)"> Edit </Button>
      <Button @click="emit('delete-shopping-item', item.id)"> Delete </Button>
    </div>
  </li>
</template>
