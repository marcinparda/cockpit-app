<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { todoProjectsService } from '../services/todoProjectsService';
import type { TodoProject } from '../types/TodoProject';
import { InputText, Button } from '@cockpit-app/shared/vue-ui';
import ProjectItem from '../components/ProjectItem.vue';

const projects = ref<TodoProject[]>([]);
const newProjectName = ref('');

const fetchProjects = async () => {
  projects.value = await todoProjectsService.getTodoProjects();
};

const handleAddProject = async () => {
  if (!newProjectName.value.trim()) return;
  await todoProjectsService.addTodoProject({ name: newProjectName.value });
  newProjectName.value = '';
  fetchProjects();
};

onMounted(fetchProjects);
</script>

<template>
  <div class="flex flex-col md:flex-row h-screen">
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
        <ProjectItem :id="project.id" :name="project.name" />
        <Divider v-if="idx < projects.length - 1" class="my-2" />
      </template>
    </div>
  </div>
</template>
