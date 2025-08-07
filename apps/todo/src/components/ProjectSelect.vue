<script setup lang="ts">
  import { ref, onMounted, watch, computed } from 'vue';
  import { Select } from '@cockpit-app/shared-vue-ui';
  import { useRoute, useRouter } from 'vue-router';
  import { todoProjectsService } from '../services/todoProjectsService';
  import type { TodoProject } from '../types/TodoProject';
  import { isMeaningfulString } from '@cockpit-app/shared-utils';

  const projects = ref<TodoProject[]>([]);
  const selectedProject = ref<string | null>(null);
  const route = useRoute();
  const router = useRouter();

  const ALL_PROJECT_CODE = 'All';

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
    const projectParam = route.query['project'];
    const selected = isMeaningfulString(projectParam) ? projectParam : null;
    selectedProject.value = selected;
  });

  watch(
    () => route.query['project'],
    (val) => {
      const selected = isMeaningfulString(val) ? val : null;
      selectedProject.value = selected;
    }
  );

  watch(selectedProject, (val) => {
    if (val) {
      if (val === ALL_PROJECT_CODE) {
        router.push({ path: '/list', query: { project: undefined } });
      } else {
        router.push({ path: '/list', query: { project: val } });
      }
    }
  });

  const projectOptions = computed(() => [
    { name: 'All', code: ALL_PROJECT_CODE },
    ...projects.value.map((p) => ({ name: p.name, code: p.name })),
  ]);
</script>

<template>
  <label class="block mb-2 text-sm" html-for="project-select"
    >Selected project</label
  >
  <Select
    id="project-select"
    v-model="selectedProject"
    :options="projectOptions"
    option-label="name"
    option-value="code"
    placeholder="Select a project"
    class="w-full md:w-56"
    label="Project"
  />
</template>
