<template>
  <Menubar :model="items">
    <template #item="{ item }">
      <RouterLink :to="item['to']">
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
import Menubar from 'primevue/menubar';
import LogoutButton from './LogoutButton.vue';

type MenuItem = {
  label: string;
  to: string;
};

const items: MenuItem[] = [
  {
    label: 'Todo List',
    to: '/todo-list',
  },
];
</script>
