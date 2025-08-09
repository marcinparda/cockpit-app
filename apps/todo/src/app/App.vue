<script setup lang="ts">
  import Header from '../components/Header.vue';
  import { RouterView } from 'vue-router';
</script>

<template>
  <div class="flex flex-col h-screen">
    <Header />
    <RouterView />
  </div>
</template>
