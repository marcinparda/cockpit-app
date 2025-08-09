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
  import { ALL_PROJECT_NAME } from '../utils/consts';
  import { useProjects } from '../composables/useProjects';
  import { useCurrentUser } from '../composables/useCurrentUser';
  import { useCollaborators } from '../composables/useCollaborators';
  import ManageCollaboratorsDialog from './ManageCollaboratorsDialog.vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const { selectedProject } = useProjects();
  const { currentUser } = useCurrentUser();
  const { isCurrentUserOwner, collaborators, fetchCollaborators } =
    useCollaborators();
  const isLoading = ref(false);
  const showManageCollaboratorsDialog = ref(false);

  const projectNameText = computed(() => {
    if (selectedProject.value === null) {
      return ALL_PROJECT_NAME;
    }
    return selectedProject.value.name;
  });

  const areThereAnyCollaborators = computed(() => {
    return Boolean(collaborators.value.length);
  });

  function getAvatarTooltip(email: string) {
    if (email === currentUser.value?.email) {
      return `(You) ${email}`;
    }
    return email;
  }

  function handleShareClick() {
    showManageCollaboratorsDialog.value = true;
  }

  watch(
    () => route.query['project'],
    (newProject) => {
      if (newProject) {
        fetchCollaborators();
      }
    }
  );
</script>

<template>
  <div v-if="isLoading" class="pb-8">
    <Skeleton class="py-10" />
  </div>
  <div v-if="!isLoading" class="pb-8">
    <div class="px-6 py-4 flex items-center justify-between h-20">
      <div class="flex items-center gap-2">
        <i class="pi pi-folder"></i>
        <span>{{ projectNameText }}</span>
      </div>
      <div class="flex items-center gap-2">
        <Button
          v-if="isCurrentUserOwner"
          variant="text"
          @click="handleShareClick"
          >Share</Button
        >
        <div v-if="selectedProject" class="flex items-center gap-2">
          <div class="flex items-center gap-2">
            <span class="text-sm">Owner:</span>
            <AvatarGroup>
              <Avatar
                v-tooltip="getAvatarTooltip(selectedProject.owner.email)"
                :label="getAvatarLabelFromEmail(selectedProject.owner.email)"
                shape="circle"
                size="#footer"
              />
            </AvatarGroup>
          </div>
          <div v-if="areThereAnyCollaborators" class="flex items-center gap-2">
            <span class="text-sm">Collaborators:</span>
            <AvatarGroup>
              <Avatar
                v-for="collaborator in collaborators"
                :key="collaborator.id"
                v-tooltip="getAvatarTooltip(collaborator.email)"
                :label="getAvatarLabelFromEmail(collaborator.email)"
                shape="circle"
              />
            </AvatarGroup>
          </div>
        </div>
      </div>
    </div>
    <Divider />
  </div>

  <ManageCollaboratorsDialog v-model:visible="showManageCollaboratorsDialog" />
</template>
