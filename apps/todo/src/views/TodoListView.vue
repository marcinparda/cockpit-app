<script setup lang="ts">
  import { Button, Divider } from '@cockpit-app/shared-vue-ui';
  import { ref } from 'vue';
  import TodoList from '../components/TodoList.vue';
  import Sidebar from '../components/Sidebar.vue';
  import ProjectSelect from '../components/ProjectSelect.vue';
  import TodoItemCreateDialog from '../components/TodoItemCreateDialog.vue';
  import ProjectBar from '../components/ProjectBar.vue';

  const showAddDialog = ref(false);

  function openAddDialog() {
    showAddDialog.value = true;
  }
</script>

<template>
  <div class="flex h-screen flex-col px-4 py-6 md:flex-row md:px-0 md:py-0">
    <div class="hidden md:flex">
      <Sidebar />
    </div>
    <div class="flex flex-1 flex-col items-center">
      <div class="w-full">
        <ProjectBar />
      </div>
      <div class="w-full pb-4 md:hidden">
        <ProjectSelect />
      </div>
      <div class="w-full pb-5 md:hidden">
        <Divider />
      </div>
      <div class="w-full max-w-2xl">
        <div class="gap-2">
          <Button class="w-full" @click="openAddDialog">
            Add new item to list
          </Button>
        </div>
        <TodoList />
      </div>
    </div>
  </div>
  <TodoItemCreateDialog v-model="showAddDialog" />
</template>
