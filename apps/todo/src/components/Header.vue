<template>
  <Menubar :model="items">
    <template #item="{ item }">
      <RouterLink class="block p-2" :to="item['to']">
        {{ item.label }}
      </RouterLink>
    </template>
    <template #end>
      <LogoutButton />
    </template>
  </Menubar>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Menubar } from '@cockpit-app/shared-vue-ui';
  import LogoutButton from './LogoutButton.vue';

  type MenuItem = {
    label: string;
    to: string;
  };

  const items: MenuItem[] = [
    {
      label: 'List',
      to: '/list',
    },
    {
      label: 'Projects',
      to: '/projects',
    },
  ];
</script>
