<template>
  <Button v-bind="$attrs">
    <slot />
  </Button>
</template>

<script setup lang="ts">
  import Button from 'primevue/button';
</script>
