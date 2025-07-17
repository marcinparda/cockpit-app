<script setup lang="ts">
import { ref, watch } from 'vue';
import { InputText, Button, Dialog, Select } from '@cockpit-app/shared/vue-ui';
import type { TodoProject } from '../types/TodoProject';

/**
 * Props for TodoItemCreateDialog
 */
interface TodoItemCreateDialogProps {
  modelValue: boolean;
  loading: boolean;
  allProjects: TodoProject[];
  projectParam: string | null;
}

const props = defineProps<TodoItemCreateDialogProps>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'submit', payload: { name: string; project: TodoProject | null }): void;
  (e: 'cancel'): void;
}>();

const addForm = ref<{ name: string; project: TodoProject | null }>({
  name: '',
  project: null,
});

watch(
  () => [addForm.value.name, addForm.value.project],
  () => {}
);

function handleDialogHide() {
  addForm.value = { name: '', project: null };
  emit('update:modelValue', false);
  emit('cancel');
}

function handleSubmit() {
  if (!addForm.value.name.trim()) return;
  emit('submit', { ...addForm.value });
}

function preselectProject(
  projects: TodoProject[],
  projectParam: string | null
) {
  if (projectParam !== null) {
    return projects.find((p) => p.name === projectParam) || null;
  }
  return null;
}

watch(
  [() => props.modelValue, () => props.allProjects, () => props.projectParam],
  ([visible, projects, projectParam]: [
    boolean,
    TodoProject[],
    string | null
  ]) => {
    if (visible) {
      addForm.value = {
        name: '',
        project: preselectProject(projects, projectParam),
      };
    }
  },
  { immediate: true }
);
</script>

<template>
  <Dialog
    :visible="modelValue"
    header="Add New Todo Item"
    :modal="true"
    :closable="false"
    @hide="handleDialogHide"
  >
    <form @submit.prevent="handleSubmit">
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
          <Select
            id="project-select"
            v-model="addForm.project"
            :options="allProjects"
            option-label="name"
            placeholder="Select a project"
            class="w-full"
          />
        </div>
        <div class="flex gap-2 justify-end">
          <Button type="button" severity="secondary" @click="handleDialogHide"
            >Cancel</Button
          >
          <Button type="submit" :loading="loading">Create</Button>
        </div>
      </div>
    </form>
  </Dialog>
</template>
