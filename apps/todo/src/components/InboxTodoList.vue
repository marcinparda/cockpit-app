<script setup lang="ts">
  import { useTodoItems } from '../composables/useTodoItems';
  import { useProjects } from '../composables/useProjects';
  import TodoItem from './TodoItem.vue';
  import { Divider } from '@cockpit-app/shared-vue-ui';
  import { computed, onMounted } from 'vue';

  const { selectedProject, projects } = useProjects();
  const { todoItems, startPolling, isLoading } = useTodoItems(
    selectedProject,
    projects,
  );

  onMounted(() => {
    startPolling();
  });

  const groupedTodoItems = computed(() => {
    const items = todoItems.value;

    const groups = new Map<
      string,
      { projectName: string; items: typeof items }
    >();

    items.forEach((item) => {
      const projectName = item.project?.name || 'No Project';
      const key = item.project_id?.toString() || 'no-project';

      if (!groups.has(key)) {
        groups.set(key, { projectName, items: [] });
      }
      groups.get(key)!.items.push(item);
    });

    return Array.from(groups.values()).sort((a, b) =>
      a.projectName.localeCompare(b.projectName),
    );
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

    <template
      v-for="group in groupedTodoItems"
      v-else
      :key="`group-${group.projectName}`"
    >
      <div class="mb-6">
        <div class="mb-3">
          <h3
            class="px-1 text-base font-semibold text-gray-800 sm:px-0 sm:text-lg dark:text-gray-200"
          >
            {{ group.projectName }}
          </h3>
          <div class="mt-2">
            <Divider />
          </div>
        </div>

        <ul>
          <template v-for="(item, itemIdx) in group.items" :key="item.id">
            <TodoItem :item="item" />
            <Divider v-if="itemIdx < group.items.length - 1" class="my-2" />
          </template>
        </ul>
      </div>
    </template>
  </div>
</template>
