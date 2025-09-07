<script setup lang="ts">
  import { Button, Divider } from '@cockpit-app/shared-vue-ui';
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import ProjectTodoList from '../components/ProjectTodoList.vue';
  import InboxTodoList from '../components/InboxTodoList.vue';
  import Sidebar from '../components/Sidebar.vue';
  import ProjectSelect from '../components/ProjectSelect.vue';
  import TodoItemCreateDialog from '../components/TodoItemCreateDialog.vue';
  import ProjectBar from '../components/ProjectBar.vue';
  import { cn } from '@cockpit-app/shared-utils';

  const route = useRoute();
  const showAddDialog = ref(false);

  const isProjectView = computed(() => {
    return !!route.query['project'];
  });

  function openAddDialog() {
    showAddDialog.value = true;
  }
</script>

<template>
  <div class="flex min-h-full flex-col px-4 py-6 md:flex-row md:px-0 md:py-0">
    <div class="hidden md:flex">
      <Sidebar />
    </div>
    <div class="flex flex-1 flex-col items-center">
      <div class="w-full pb-4 md:hidden">
        <ProjectSelect />
      </div>
      <div class="w-full pb-5 md:hidden">
        <Divider />
      </div>
      <div v-if="isProjectView" class="w-full">
        <ProjectBar />
      </div>
      <div class="w-full max-w-2xl">
        <div :class="cn('gap-2', isProjectView ? '' : 'pt-6')">
          <Button class="w-full" @click="openAddDialog">
            Add new item to list
          </Button>
        </div>
        <ProjectTodoList v-if="isProjectView" />
        <InboxTodoList v-else />
      </div>
    </div>
  </div>
  <TodoItemCreateDialog v-model="showAddDialog" />
</template>
