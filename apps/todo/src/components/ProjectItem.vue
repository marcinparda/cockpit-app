<script setup lang="ts">
  import { Button, InputText } from '@cockpit-app/shared-vue-ui';
  import { ref } from 'vue';
  import { TodoProject } from '@cockpit-app/api-types';
  import { useProjects } from '../composables/useProjects';
  import { useTodoItems } from '../composables/useTodoItems';
  import { cn } from '@cockpit-app/shared-react-ui';

  const props = defineProps<{
    project: TodoProject;
    readOnly?: boolean;
  }>();

  const { name, id } = props.project;
  const { readOnly } = props;
  const { deleteProject, updateProject } = useProjects();
  const { fetchTodoItems } = useTodoItems();

  const isEditing = ref(false);
  const newProjectName = ref('');

  function handleStartEditing() {
    if (readOnly) return;
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
  <div v-if="isEditing" class="flex min-h-14 items-center gap-2 p-2">
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
    :class="
      cn(
        'flex min-h-14 items-center gap-2 rounded p-2',
        readOnly ? '' : 'cursor-pointer hover:bg-neutral-800',
      )
    "
    @click="handleStartEditing"
  >
    <label>
      <span :class="cn('', readOnly ? '' : 'cursor-pointer')">
        {{ name }} {{ readOnly && `(${project.owner.email})` }}
      </span>
    </label>
    <Button
      v-if="!readOnly"
      class="ml-auto"
      severity="danger"
      @click="handleDeleteButtonClick"
      @click.stop
    >
      Delete
    </Button>
  </div>
</template>
