<template>
  <div class="card flex justify-center">
    <Menu :model="items" />
  </div>
</template>

<script setup lang="ts">
  import { Menu } from '@cockpit-app/shared-vue-ui';
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { todoProjectsService } from '../services/todoProjectsService';
  import { ALL_PROJECT_NAME } from '../utils/consts';

  const router = useRouter();
  const items = ref<any[]>([]);

  const fetchProjects = async () => {
    try {
      const projects = await todoProjectsService.getAllTodoProjects();
      items.value = [
        {
          label: 'My projects',
          items: [
            {
              label: ALL_PROJECT_NAME,
              command: () => router.push({ path: '/list' }),
            },
            ...projects.map((p) => ({
              label: p.name,
              command: () =>
                router.push({ path: '/list', query: { project: p.id } }),
            })),
          ],
        },
      ];
    } catch (e) {
      items.value = [
        {
          label: 'My projects',
          items: [
            {
              label: ALL_PROJECT_NAME,
              command: () => router.push({ path: '/list' }),
            },
          ],
        },
      ];
    }
  };

  onMounted(fetchProjects);
</script>
