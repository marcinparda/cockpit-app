<script setup lang="ts">
  import { useTodoItems } from '../composables/useTodoItems';
  import { useProjects } from '../composables/useProjects';
  import TodoItem from './TodoItem.vue';
  import { Divider } from '@cockpit-app/shared-vue-ui';
  import { onMounted } from 'vue';

  const { selectedProject, projects } = useProjects();
  const { todoItems, startPolling, isLoading } = useTodoItems(
    selectedProject,
    projects,
  );

  onMounted(() => {
    startPolling();
  });
</script>

<template>
  <div class="py-8">
    <div v-if="isLoading" class="flex justify-center py-8">
      <div class="text-sm text-gray-500">Loading todos...</div>
    </div>

    <div v-else-if="todoItems.length === 0" class="flex justify-center py-8">
      <div class="text-sm text-gray-500">No todos found</div>
    </div>

    <div v-else class="space-y-2">
      <ul>
        <template v-for="(item, itemIdx) in todoItems" :key="item.id">
          <TodoItem :item="item" />
          <Divider v-if="itemIdx < todoItems.length - 1" />
        </template>
      </ul>
    </div>
  </div>
</template>
