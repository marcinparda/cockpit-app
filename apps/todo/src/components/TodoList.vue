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

  const groupedTodoItems = computed(() => {
    const items = projectTodoItems.value;
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
    <template
      v-for="(group, groupIdx) in groupedTodoItems"
      :key="`group-${groupIdx}`"
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
