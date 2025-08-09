<script setup lang="ts">
  import { Button, InputText } from '@cockpit-app/shared-vue-ui';
  import { ref } from 'vue';
  import { TodoProject } from '@cockpit-app/api-types';
  import { useProjects } from '../composables/useProjects';
  import { useItems } from '../composables/useTodoItems';

  const props = defineProps<{
    project: TodoProject;
    shared?: boolean;
  }>();

  const { name, id } = props.project;
  const { shared } = props;
  const { deleteProject, updateProject } = useProjects();
  const { fetchTodoItems } = useItems();

  const isEditing = ref(false);
  const newProjectName = ref('');

  function handleStartEditing() {
    isEditing.value = true;
    newProjectName.value = name;
  }

  function handleCancelEdit() {
    isEditing.value = false;
    newProjectName.value = '';
  }

  async function handleSaveNewProjectName() {
    if (newProjectName.value.trim()) {
      await updateProject(id, {
        name: newProjectName.value,
      });
      newProjectName.value = '';
      isEditing.value = false;
    }
  }

  async function handleDeleteButtonClick() {
    await deleteProject(id);
    fetchTodoItems();
  }
</script>

<template>
  <div v-if="isEditing" class="flex items-center gap-2 p-2 min-h-14">
    <InputText
      v-model="newProjectName"
      class="flex-1"
      type="text"
      placeholder="Enter new project name"
      @keyup.enter="handleSaveNewProjectName"
    />
    <Button @click="handleSaveNewProjectName" @click.stop> Save </Button>
    <Button severity="secondary" @click="handleCancelEdit" @click.stop>
      Cancel
    </Button>
  </div>
  <div
    v-else
    class="flex items-center gap-2 cursor-pointer hover:bg-neutral-800 rounded p-2 min-h-14"
    @click="handleStartEditing"
  >
    <label>
      <span class="cursor-pointer">
        {{ name }}
      </span>
    </label>
    <Button
      v-if="!shared"
      class="ml-auto"
      severity="danger"
      @click="handleDeleteButtonClick"
      @click.stop
    >
      Delete
    </Button>
  </div>
</template>
