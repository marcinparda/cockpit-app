<script setup lang="ts">
  import { ref } from 'vue';
  import { InputText, Button, Divider } from '@cockpit-app/shared-vue-ui';
  import ProjectItem from '../components/ProjectItem.vue';
  import { useProjects } from '../composables/useProjects';

  const newProjectName = ref('');

  const { projects, addProject } = useProjects();

  async function handleAddProject() {
    if (newProjectName.value.trim()) {
      await addProject(newProjectName.value);
      newProjectName.value = '';
    }
  }
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen justify-center">
    <div class="max-w-2xl flex-1 py-6 px-4">
      <div class="flex items-center gap-2 mb-4">
        <InputText
          v-model="newProjectName"
          class="flex-1"
          placeholder="Add a new project"
          @keyup.enter="handleAddProject"
        />
        <Button @click="handleAddProject">Add Project</Button>
      </div>

      <template v-for="(project, idx) in projects" :key="project.id">
        <ProjectItem :project="project" />
        <Divider v-if="idx < projects.length - 1" class="my-2" />
      </template>
    </div>
  </div>
</template>
