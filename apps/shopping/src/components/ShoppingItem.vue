<script setup lang="ts">
import { Button, InputText, Checkbox } from '@cockpit-app/shared/vue-ui';
import type { ShoppingItem as ShoppingItemType } from '../types/ShoppingItem';
import { computed } from 'vue';

const props = defineProps<{
  item: ShoppingItemType;
  editingItemId: number | null;
  updateItemTitle: string;
}>();

const emit = defineEmits<{
  (e: 'start-editing', item: ShoppingItemType): void;
  (e: 'save-item-update'): void;
  (e: 'toggle-shopping-item', item: ShoppingItemType): void;
  (e: 'delete-shopping-item', id: number): void;
  (e: 'update:updateItemTitle', value: string): void; // added for v-model workaround
}>();

const isEditing = computed(() => props.editingItemId === props.item.id);
</script>

<template>
  <li>
    <div v-if="isEditing">
      <InputText
        :model-value="updateItemTitle"
        @update:model-value="$emit('update:updateItemTitle', $event)"
        @keyup.enter="$emit('save-item-update')"
      />
      <Button @click="$emit('save-item-update')"> Save </Button>
    </div>
    <div v-else>
      <div class="flex items-center gap-2">
        <Checkbox
          v-model="item.is_closed"
          binary
          size="large"
          @change="$emit('toggle-shopping-item', item)"
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
      <Button @click="$emit('start-editing', item)"> Edit </Button>
      <Button @click="$emit('delete-shopping-item', item.id)"> Delete </Button>
    </div>
  </li>
</template>
