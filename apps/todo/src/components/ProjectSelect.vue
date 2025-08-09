<script setup lang="ts">
  import { computed } from 'vue';
  import { Select, SelectChangeEvent } from '@cockpit-app/shared-vue-ui';
  import { useRouter } from 'vue-router';
  import { ALL_PROJECT_CODE, ALL_PROJECT_NAME } from '../utils/consts';
  import { useProjects } from '../composables/useProjects';

  const router = useRouter();
  const { projects, selectedProject } = useProjects();

  const projectOptions = computed(() => [
    { name: ALL_PROJECT_NAME, code: ALL_PROJECT_CODE },
    ...projects.value.map((p) => ({ name: p.name, code: p.id })),
  ]);

  const selectedProjectId = computed(() => {
    if (!selectedProject.value) {
      return ALL_PROJECT_CODE;
    }
    return selectedProject.value.id;
  });

  function handleSelectProjectChange(event: SelectChangeEvent) {
    const selectedCode = event.value;
    if (selectedCode === ALL_PROJECT_CODE) {
      router.push({ path: '/list', query: { project: undefined } });
      return;
    }
    router.push({ path: '/list', query: { project: selectedCode } });
  }
</script>

<template>
  <label class="pr-2 text-sm md:text-base">Project:</label>
  <Select
    id="project-select"
    v-model="selectedProjectId"
    :options="projectOptions"
    option-label="name"
    option-value="code"
    placeholder="Select a project"
    class="w-full md:w-56"
    label="Project"
    @change="handleSelectProjectChange"
  />
</template>
