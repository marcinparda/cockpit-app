<template>
  <Menubar>
    <template #end>
      <LogoutButton />
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import Menubar from 'primevue/menubar';
import LogoutButton from './LogoutButton.vue';
</script>
