<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/shopping-list"> Shopping List </RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
