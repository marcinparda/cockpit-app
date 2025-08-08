<script setup lang="ts">
  import { useItems } from '../composables/useTodoItems';
  import TodoItem from './TodoItem.vue';
  import { Divider } from '@cockpit-app/shared-vue-ui';

  const { todoItems } = useItems();
</script>

<template>
  <ul class="py-8">
    <template v-for="(item, idx) in todoItems" :key="item.id">
      <TodoItem :item="item" />
      <Divider v-if="idx < todoItems.length - 1" class="my-2" />
    </template>
  </ul>
</template>
