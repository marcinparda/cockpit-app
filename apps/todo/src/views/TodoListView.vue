<script setup lang="ts">
import { InputText, Button } from '@cockpit-app/shared/vue-ui';
import { ref, computed } from 'vue';
import { useTodoList } from '../composables/useTodoList';
import TodoList from '../components/TodoList.vue';
import type { TodoItem } from '../types/TodoItem';
import { useRoute } from 'vue-router';
import Sidebar from '../components/Sidebar.vue';
import ProjectSelect from '../components/ProjectSelect.vue';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import { todoProjectsService } from '../services/todoProjectsService';
import type { TodoProject } from '../types/TodoProject';

const newItemTitle = ref('');
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
const addForm = ref<{
  name: string;
  project: TodoProject | null;
}>({
  name: '',
  project: null,
});
const allProjects = ref<TodoProject[]>([]);
const addDialogLoading = ref(false);

const fetchProjects = async () => {
  const projects = await todoProjectsService.getTodoProjects();
  allProjects.value = projects.filter((p) => p.name !== 'All');
};

const openAddDialog = async () => {
  await fetchProjects();
  // Preselect project if query param is set and not 'All'
  const projectName = projectParam.value;
  let preselected = null;
  if (projectName && projectName !== 'All') {
    preselected = allProjects.value.find((p) => p.name === projectName) || null;
  }
  addForm.value = { name: '', project: preselected };
  showAddDialog.value = true;
};

const resetAddForm = () => {
  addForm.value = { name: '', project: null };
};

const handleAddDialogHide = () => {
  showAddDialog.value = false;
  resetAddForm();
};

const handleStartEditing = (item: TodoItem) => {
  startEditing(item);
  editingItemNewTitle.value = item.name;
};

const handleSaveEditedItem = async () => {
  await saveEditedItem(editingItemNewTitle.value);
  editingItemNewTitle.value = '';
};

const projectParam = computed(() => route.query['project'] || 'All');
const filteredItems = computed(() => {
  if (projectParam.value === 'All' || !projectParam.value)
    return todoItems.value;
  return todoItems.value.filter(
    (item) => item.project && item.project.name === projectParam.value
  );
});

const handleAddItem = async () => {
  if (!addForm.value.name.trim()) return;
  addDialogLoading.value = true;
  showAddDialog.value = false;
  const projectId = addForm.value.project?.id || null;
  try {
    await addTodoItem(addForm.value.name, projectId);
    await loadTodoItems();
  } finally {
    addDialogLoading.value = false;
    resetAddForm();
  }
};
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
    <div class="hidden md:flex">
      <Sidebar />
    </div>
    <div class="md:hidden">
      <ProjectSelect />
    </div>
    <div class="max-w-2xl flex-1 mx-auto py-6">
      <div class="flex items-center gap-2">
        <Button class="w-full" @click="openAddDialog">
          Add new item to list
        </Button>
      </div>
      <Dialog
        v-model:visible="showAddDialog"
        header="Add New Todo Item"
        :modal="true"
        :closable="false"
        @hide="handleAddDialogHide"
      >
        <form @submit.prevent="handleAddItem">
          <div class="flex flex-col gap-4">
            <div>
              <label for="item-name" class="block mb-1">Item Name</label>
              <InputText
                id="item-name"
                v-model="addForm.name"
                class="w-full"
                required
              />
            </div>
            <div>
              <label for="project-select" class="block mb-1">Project</label>
              <Dropdown
                id="project-select"
                v-model="addForm.project"
                :options="allProjects"
                option-label="name"
                placeholder="Select a project"
                class="w-full"
              />
            </div>
            <div class="flex gap-2 justify-end">
              <Button
                type="button"
                severity="secondary"
                @click="handleAddDialogHide"
                >Cancel</Button
              >
              <Button type="submit" :loading="addDialogLoading">Create</Button>
            </div>
          </div>
        </form>
      </Dialog>
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
