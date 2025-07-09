<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { Select } from '@cockpit-app/shared/vue-ui';
import { useRoute, useRouter } from 'vue-router';
import { todoProjectsService } from '../services/todoProjectsService';
import type { TodoProject } from '../types/TodoProject';

const projects = ref<TodoProject[]>([]);
const selectedProject = ref<string | null>(null);
const route = useRoute();
const router = useRouter();

const fetchProjects = async () => {
  try {
    const result = await todoProjectsService.getTodoProjects();
    projects.value = result;
  } catch (e) {
    projects.value = [];
  }
};

onMounted(() => {
  fetchProjects();
  // Set initial selected project from route
  selectedProject.value = (route.query['project'] as string) || 'All';
});

watch(
  () => route.query['project'],
  (val) => {
    selectedProject.value = (val as string) || 'All';
  }
);

watch(selectedProject, (val) => {
  if (val) {
    router.push({ path: '/list', query: { ...route.query, project: val } });
  }
});

const projectOptions = computed(() => [
  { name: 'All', code: 'All' },
  ...projects.value.map((p) => ({ name: p.name, code: p.name })),
]);
</script>

<template>
  <Select
    v-model="selectedProject"
    :options="projectOptions"
    option-label="name"
    option-value="code"
    placeholder="Select a project"
    class="w-full md:w-56"
  />
</template>
