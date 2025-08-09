<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { useTodoItems } from '../composables/useTodoItems';
  import TodoItem from './TodoItem.vue';
  import { Divider } from '@cockpit-app/shared-vue-ui';
  import { computed, onMounted } from 'vue';

  const route = useRoute();
  const { todoItems, startPolling } = useTodoItems();

  onMounted(() => {
    startPolling();
  });

  const projectTodoItems = computed(() => {
    const projectId = route.query['project']
      ? Number(route.query['project'])
      : null;
    if (projectId) {
      return todoItems.value.filter((item) => item.project_id === projectId);
    }
    return todoItems.value;
  });
</script>

<template>
  <ul class="py-8">
    <template v-for="(item, idx) in projectTodoItems" :key="item.id">
      <TodoItem :item="item" />
      <Divider v-if="idx < projectTodoItems.length - 1" class="my-2" />
    </template>
  </ul>
</template>
