<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import {
    InputText,
    Button,
    Dialog,
    Select,
  } from '@cockpit-app/shared-vue-ui';
  import { isMeaningfulString } from '@cockpit-app/shared-utils';
  import { useRoute } from 'vue-router';
  import { useTodoItems } from '../composables/useTodoItems';
  import { useProjects } from '../composables/useProjects';
  import { TodoProject } from '@cockpit-app/api-types';

  interface TodoItemCreateDialogProps {
    modelValue: boolean;
  }
  const props = defineProps<TodoItemCreateDialogProps>();
  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
  }>();

  const route = useRoute();
  const { addTodoItem } = useTodoItems();
  const {
    projects,
    isLoading: isProjectsLoading,
    selectedProject,
  } = useProjects();
  const isLoading = ref(false);
  const addTodoItemFormValues = ref<{
    name: string;
    project: TodoProject | null;
  }>({
    name: '',
    project: null,
  });
  const projectId = computed(() => {
    const projectParam = route.query['project'];
    return isMeaningfulString(projectParam) ? Number(projectParam) : null;
  });
  const isCreateButtonLoading = computed(() => {
    return isLoading.value || isProjectsLoading.value;
  });
  const isCreateButtonDisabled = computed(() => {
    return (
      !addTodoItemFormValues.value.name.trim() ||
      addTodoItemFormValues.value.project === null
    );
  });
  const createButtonTooltipText = computed(() => {
    if (isCreateButtonDisabled.value) {
      return 'Please enter a name and select a project';
    }
    return '';
  });

  function handleCloseButtonClick() {
    addTodoItemFormValues.value = { name: '', project: null };
    emit('update:modelValue', false);
  }

  async function handleCreateButtonClick() {
    if (!isMeaningfulString(addTodoItemFormValues.value.name)) return;
    if (!addTodoItemFormValues.value.project) return;
    isLoading.value = true;
    try {
      await addTodoItem(
        addTodoItemFormValues.value.name,
        addTodoItemFormValues.value.project.id
      );
      addTodoItemFormValues.value.name = '';
    } finally {
      isLoading.value = false;
    }
  }

  async function handleCreateAndCloseButtonClick() {
    await handleCreateButtonClick();
    handleCloseButtonClick();
  }

  watch(
    () => props.modelValue,
    (_visible) => {
      addTodoItemFormValues.value = {
        name: '',
        project: selectedProject.value,
      };
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
    @hide="handleCloseButtonClick"
  >
    <form @submit.prevent="handleCreateButtonClick">
      <div class="flex flex-col gap-4">
        <div>
          <label for="item-name" class="block mb-1">Item Name</label>
          <InputText
            id="item-name"
            v-model="addTodoItemFormValues.name"
            class="w-full"
            required
          />
        </div>
        <div>
          <label for="project-select" class="block mb-1">Project</label>
          <Select
            id="project-select"
            v-model="addTodoItemFormValues.project"
            :options="projects"
            option-label="name"
            placeholder="Select a project"
            class="w-full"
          />
        </div>
        <div class="flex gap-2 justify-end">
          <Button
            type="button"
            severity="secondary"
            @click="handleCloseButtonClick"
            >Close</Button
          >
          <Button
            v-tooltip="createButtonTooltipText"
            :loading="isCreateButtonLoading"
            :disabled="isCreateButtonDisabled"
            severity="secondary"
            @click="handleCreateAndCloseButtonClick"
            >Create & close</Button
          >
          <Button
            v-tooltip="createButtonTooltipText"
            type="submit"
            :loading="isCreateButtonLoading"
            :disabled="isCreateButtonDisabled"
            >Create</Button
          >
        </div>
      </div>
    </form>
  </Dialog>
</template>
