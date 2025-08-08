<script setup lang="ts">
  import { ref } from 'vue';
  import { InputText, Button, Divider } from '@cockpit-app/shared-vue-ui';
  import ProjectItem from '../components/ProjectItem.vue';
  import { useProjects } from '../composables/useProjects';

  const newProjectName = ref('');

  const { myProjects, sharedProjects, addProject } = useProjects();

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

      <div v-if="myProjects.length" class="pb-6">
        <div class="text-lg font-semibold pb-2">My projects</div>
        <Divider class="py-2" />
        <template v-for="(project, idx) in myProjects" :key="project.id">
          <ProjectItem :project="project" />
          <Divider v-if="idx < myProjects.length - 1" class="py-2" />
        </template>
      </div>
      <div v-if="sharedProjects.length > 0">
        <div class="text-lg font-semibold pb-2">Shared projects</div>
        <Divider class="py-2" />
        <template v-for="(project, idx) in sharedProjects" :key="project.id">
          <ProjectItem :project="project" :shared="true" />
          <Divider v-if="idx < sharedProjects.length - 1" class="py-2" />
        </template>
      </div>
    </div>
  </div>
</template>
