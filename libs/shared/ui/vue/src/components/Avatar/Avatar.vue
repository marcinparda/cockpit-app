<script setup lang="ts">
  import Avatar from 'primevue/avatar';
</script>

<template>
  <Avatar v-bind="$attrs">
    <slot />
  </Avatar>
</template>

<style scoped>
  .p-avatar-image {
    background-color: var(--p-avatar-background);
    color: var(--p-avatar-text-color);
  }
</style>
