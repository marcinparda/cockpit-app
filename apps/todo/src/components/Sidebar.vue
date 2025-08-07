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

  const router = useRouter();
  const items = ref<any[]>([]);

  const fetchProjects = async () => {
    try {
      const projects = await todoProjectsService.getTodoProjects();
      items.value = [
        {
          label: 'Projects',
          items: [
            {
              label: 'All',
              command: () => router.push({ path: '/list' }),
            },
            ...projects.map((p: any) => ({
              label: p.name,
              command: () =>
                router.push({ path: '/list', query: { project: p.name } }),
            })),
          ],
        },
      ];
    } catch (e) {
      items.value = [
        {
          label: 'Projects',
          items: [
            {
              label: 'All',
              command: () => router.push({ path: '/list' }),
            },
          ],
        },
      ];
    }
  };

  onMounted(fetchProjects);
</script>
