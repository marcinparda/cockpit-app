<script setup lang="ts">
  import { Button } from '@cockpit-app/shared-vue-ui';
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
  <div class="flex flex-col md:flex-row h-screen px-4 py-6 md:px-0 md:py-0">
    <div class="hidden md:flex">
      <Sidebar />
    </div>
    <div class="md:hidden">
      <ProjectSelect />
    </div>
    <div class="flex flex-col flex-1 items-center">
      <div class="w-full">
        <ProjectBar />
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
