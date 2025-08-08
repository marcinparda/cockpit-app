<script setup lang="ts">
  import { computed, ref } from 'vue';
  import {
    Divider,
    AvatarGroup,
    Avatar,
    Skeleton,
  } from '@cockpit-app/shared-vue-ui';
  import { getAvatarLabelFromEmail } from '../utils/utils';
  import { ALL_PROJECT_NAME } from '../utils/consts';
  import { useProjects } from '../composables/useProjects';
  import { useCurrentUser } from '../composables/useCurrentUser';

  const { selectedProject } = useProjects();
  const { currentUser } = useCurrentUser();
  const isLoading = ref(false);

  const projectNameText = computed(() => {
    if (selectedProject.value === null) {
      return ALL_PROJECT_NAME;
    }
    return selectedProject.value.name;
  });

  const projectOwnershipText = computed(() => {
    if (selectedProject.value === null) {
      return `Items from all projects`;
    }
    return `You are the owner of this project`;
  });

  function getCollaboratorAvatarTooltip(email: string) {
    if (email === currentUser.value?.email) {
      return `(You) ${email}`;
    }
    return email;
  }
</script>

<template>
  <div v-if="isLoading" class="pb-8">
    <Skeleton class="px-6 py-10" />
  </div>
  <div v-if="!isLoading" class="pb-8">
    <div class="px-6 py-4 flex items-center justify-between">
      <div>
        <div class="flex items-center gap-2">
          <i class="pi pi-folder"></i>
          <span>{{ projectNameText }}</span>
          <i class="pi pi-angle-down"></i>
        </div>
        <div>
          <span class="text-sm">{{ projectOwnershipText }}</span>
        </div>
      </div>
      <div
        v-if="selectedProject?.collaborators"
        class="flex items-center gap-2"
      >
        <AvatarGroup>
          <Avatar
            v-for="collaborator in selectedProject.collaborators"
            :key="collaborator"
            v-tooltip="getCollaboratorAvatarTooltip(collaborator)"
            :image="collaborator"
            :label="getAvatarLabelFromEmail(collaborator)"
            shape="circle"
          />
        </AvatarGroup>
      </div>
    </div>
    <Divider />
  </div>
</template>
