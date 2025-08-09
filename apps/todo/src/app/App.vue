<script setup lang="ts">
  import Header from '../components/Header.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex h-screen flex-col">
    <Header />
    <RouterView />
  </div>
</template>
