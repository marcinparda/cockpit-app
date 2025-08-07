<script setup lang="ts">
  import { Divider } from '@cockpit-app/shared-vue-ui';

  const props = defineProps<{
    collaborators: {
      email: string;
      imageUrl?: string;
    }[];
    projectName: string;
    projectIcon?: string;
  }>();
</script>

<template>
  <div class="pb-8">
    <div class="flex items-center justify-between p-4">
      <img
        v-if="props.projectIcon"
        :src="props.projectIcon"
        alt="Project Icon"
      />
      {{ props.projectName }}
    </div>
    <Divider />
  </div>
</template>
