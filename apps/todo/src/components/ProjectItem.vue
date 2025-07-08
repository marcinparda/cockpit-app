<script setup lang="ts">
import { Button, InputText } from '@cockpit-app/shared/vue-ui';
import { ref, defineEmits } from 'vue';
import { todoProjectsService } from '../services/todoProjectsService';

const props = defineProps<{
  id: number;
  name: string;
}>();

const emit = defineEmits(['update', 'delete', 'refresh']);

const isEditing = ref(false);
const newProjectName = ref('');

function handleStartEditing() {
  isEditing.value = true;
  newProjectName.value = props.name;
}

function handleCancelEdit() {
  isEditing.value = false;
  newProjectName.value = '';
}

async function handleSaveNewProjectName() {
  if (newProjectName.value.trim()) {
    emit('update', { id: props.id, name: newProjectName.value });
    await todoProjectsService.updateTodoProject(props.id, {
      name: newProjectName.value,
    });
    newProjectName.value = '';
    isEditing.value = false;
    emit('refresh');
  }
}

async function handleDeleteProject() {
  emit('delete', props.id);
  await todoProjectsService.deleteTodoProject(props.id);
  emit('refresh');
}
</script>

<template>
  <div v-if="isEditing" class="flex items-center gap-2 p-2">
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
    class="flex items-center gap-2 cursor-pointer hover:bg-neutral-800 rounded p-2"
    @click="handleStartEditing"
  >
    <label>
      <span class="cursor-pointer">
        {{ name }}
      </span>
    </label>
    <Button
      class="ml-auto"
      severity="danger"
      @click="handleDeleteProject"
      @click.stop
    >
      Delete
    </Button>
  </div>
</template>
