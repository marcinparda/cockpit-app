<script setup lang="ts">
import { Button, Dialog, Select } from '@cockpit-app/shared/vue-ui';
import { ref, computed } from 'vue';
import { useTodoList } from '../composables/useTodoList';
import TodoList from '../components/TodoList.vue';
import type { TodoItem } from '../types/TodoItem';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import ProjectSelect from '../components/ProjectSelect.vue';
import { todoProjectsService } from '../services/todoProjectsService';
import type { TodoProject } from '../types/TodoProject';
import TodoItemCreateDialog from '../components/TodoItemCreateDialog.vue';

const editingItemNewTitle = ref('');
const route = useRoute();

const {
  todoItems,
  editingItemId,
  startEditing,
  saveEditedItem,
  cancelEditedItem,
  toggleTodoItem,
  deleteTodoItem,
  addTodoItem,
  loadTodoItems,
} = useTodoList();

const showAddDialog = ref(false);
const addDialogLoading = ref(false);
const allProjects = ref<TodoProject[]>([]);
const projectParam = computed(() => route.query['project'] || 'All');

const fetchProjects = async () => {
  const projects = await todoProjectsService.getTodoProjects();
  allProjects.value = projects.filter((p) => p.name !== 'All');
};

function openAddDialog() {
  fetchProjects();
  showAddDialog.value = true;
}

function handleDialogCancel() {
  showAddDialog.value = false;
}

async function handleDialogSubmit({
  name,
  project,
}: {
  name: string;
  project: TodoProject | null;
}) {
  if (!name.trim()) return;
  addDialogLoading.value = true;
  showAddDialog.value = false;
  const projectId = project?.id || null;
  try {
    await addTodoItem(name, projectId);
    await loadTodoItems();
  } finally {
    addDialogLoading.value = false;
  }
}

const handleStartEditing = (item: TodoItem) => {
  startEditing(item);
  editingItemNewTitle.value = item.name;
};

const handleSaveEditedItem = async () => {
  await saveEditedItem(editingItemNewTitle.value);
  editingItemNewTitle.value = '';
};

const filteredItems = computed(() => {
  if (projectParam.value === 'All' || !projectParam.value)
    return todoItems.value;
  return todoItems.value.filter(
    (item) => item.project && item.project.name === projectParam.value
  );
});
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen px-4 py-6">
    <div class="hidden md:flex">
      <Sidebar />
    </div>
    <div class="md:hidden">
      <ProjectSelect />
    </div>
    <div class="max-w-2xl flex-1 py-6">
      <div class="flex items-center gap-2">
        <Button class="w-full" @click="openAddDialog">
          Add new item to list
        </Button>
      </div>
      <TodoItemCreateDialog
        v-model="showAddDialog"
        :loading="addDialogLoading"
        :all-projects="allProjects"
        :project-param="projectParam"
        @submit="handleDialogSubmit"
        @cancel="handleDialogCancel"
      />
      <TodoList
        v-model:editing-item-new-title="editingItemNewTitle"
        :items="filteredItems"
        :editing-item-id="editingItemId"
        :start-editing="handleStartEditing"
        :cancel-edited-item="cancelEditedItem"
        :save-edited-item="handleSaveEditedItem"
        :toggle-todo-item="toggleTodoItem"
        :delete-todo-item="deleteTodoItem"
      />
    </div>
  </div>
</template>
