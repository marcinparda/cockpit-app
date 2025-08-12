<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import {
    Divider,
    AvatarGroup,
    Avatar,
    Button,
  } from '@cockpit-app/shared-vue-ui';
  import { getAvatarLabelFromEmail } from '../utils/utils';
  import { useProjects } from '../composables/useProjects';
  import { useCurrentUser } from '../composables/useCurrentUser';
  import { useCollaborators } from '../composables/useCollaborators';
  import ManageCollaboratorsDialog from './ManageCollaboratorsDialog.vue';
  import { useRoute } from 'vue-router';
  import ProjectSelect from './ProjectSelect.vue';
  import { cn } from '@cockpit-app/shared-react-ui';

  const route = useRoute();
  const { selectedProject } = useProjects();
  const { currentUser } = useCurrentUser();
  const { isCurrentUserOwner, collaborators, fetchCollaborators } =
    useCollaborators();
  const showManageCollaboratorsDialog = ref(false);

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
    },
  );
</script>
cn('', readOnly ? '' : 'cursor-pointer')
<template>
  <div
    :class="
      cn('pb-4 md:pb-8', !Boolean(selectedProject) ? 'hidden md:block' : '')
    "
  >
    <div class="flex h-20 items-center justify-between pb-6 md:px-6 md:py-4">
      <div class="hidden md:block">
        <ProjectSelect />
      </div>
      <div
        class="flex flex-1 items-center justify-between gap-2 md:justify-end"
      >
        <div
          v-if="selectedProject"
          class="flex flex-col gap-2 md:flex-row md:items-center"
        >
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
        <Button
          v-if="isCurrentUserOwner"
          variant="text"
          @click="handleShareClick"
          >Share</Button
        >
      </div>
    </div>
    <Divider />
  </div>

  <ManageCollaboratorsDialog v-model:visible="showManageCollaboratorsDialog" />
</template>
