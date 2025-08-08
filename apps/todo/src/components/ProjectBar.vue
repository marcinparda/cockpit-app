<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import {
    Divider,
    AvatarGroup,
    Avatar,
    Skeleton,
    Button,
  } from '@cockpit-app/shared-vue-ui';
  import { getAvatarLabelFromEmail } from '../utils/utils';
  import {
    TodoProject,
    TodoProjectCollaboratorResponse,
    UserInfoResponse,
  } from '@cockpit-app/api-types';
  import { ALL_PROJECT_NAME } from '../utils/consts';
  import { useRoute } from 'vue-router';
  import { isMeaningfulString } from '@cockpit-app/shared-utils';
  import { todoProjectsService } from '../services/todoProjectsService';

  const route = useRoute();

  const currentUser = ref<UserInfoResponse | null>(null);
  const collaborators = ref<TodoProjectCollaboratorResponse[]>([]);
  const project = ref<TodoProject | null>(null);
  const isLoading = ref(false);

  const projectId = computed(() => {
    const projectParam = route.query['project'];
    return isMeaningfulString(projectParam) ? Number(projectParam) : null;
  });

  const projectOwnershipText = computed(() => {
    if (!projectId.value) {
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

  async function getProjectFromAPI() {
    if (!projectId.value) {
      project.value = null;
      return;
    }
    isLoading.value = true;
    project.value = await todoProjectsService.getTodoProjectById(
      projectId.value
    );
    isLoading.value = false;
  }

  async function getCollaboratorsFromAPI() {
    if (!projectId.value) {
      collaborators.value = [];
      return;
    }
    isLoading.value = true;
    collaborators.value = await todoProjectsService.getTodoProjectCollaborators(
      projectId.value
    );
    isLoading.value = false;
  }

  watch(projectId, getProjectFromAPI, { immediate: true });
  watch(projectId, getCollaboratorsFromAPI, { immediate: true });
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
          <span>{{ project?.name || ALL_PROJECT_NAME }}</span>
          <i class="pi pi-angle-down"></i>
        </div>
        <div>
          <span class="text-sm">{{ projectOwnershipText }}</span>
        </div>
      </div>
      <div v-if="!!projectId" class="flex items-center gap-2">
        <AvatarGroup>
          <Avatar
            v-for="collaborator in collaborators"
            :key="collaborator.user_id"
            v-tooltip="getCollaboratorAvatarTooltip(collaborator.user_id)"
            :image="collaborator.user_id"
            :label="getAvatarLabelFromEmail(collaborator.user_id)"
            shape="circle"
          />
        </AvatarGroup>
      </div>
    </div>
    <Divider />
  </div>
</template>
