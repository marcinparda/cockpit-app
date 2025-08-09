<script setup lang="ts">
  import { Menu } from '@cockpit-app/shared-vue-ui';
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { ALL_PROJECT_NAME } from '../utils/consts';
  import { useProjects } from '../composables/useProjects';

  const router = useRouter();
  const { myProjects, sharedProjects } = useProjects();

  const items = computed(() => {
    const myProjectsItems = {
      label: 'My projects',
      items: myProjects.value.map((p) => ({
        label: p.name,
        command: () => router.push({ path: '/list', query: { project: p.id } }),
      })),
    };
    const sharedProjectsItems = {
      label: 'Shared projects',
      items: sharedProjects.value.map((p) => ({
        label: p.name,
        command: () => router.push({ path: '/list', query: { project: p.id } }),
      })),
    };
    myProjectsItems.items.unshift({
      label: ALL_PROJECT_NAME,
      command: () => router.push({ path: '/list' }),
    });
    const items = [];
    items.push(myProjectsItems);
    if (sharedProjectsItems.items.length) {
      items.push(sharedProjectsItems);
    }
    return items;
  });
</script>

<template>
  <div class="card flex justify-center">
    <Menu :model="items" />
  </div>
</template>
