<template>
  <Menubar :model="items">
    <template #item="{ item }">
      <RouterLink :to="item['to']">
        {{ item.label }}
      </RouterLink>
    </template>
    <template #end>
      <span class="p-menubar-title">Shopping App</span>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Menubar from 'primevue/menubar';

type MenuItem = {
  label: string;
  to: string;
};

const items: MenuItem[] = [
  {
    label: 'Shopping List',
    to: '/shopping-list',
  },
];
</script>
