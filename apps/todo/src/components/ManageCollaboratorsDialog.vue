<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import { Dialog, Button, MultiSelect } from '@cockpit-app/shared-vue-ui';
  import { useCollaborators } from '../composables/useCollaborators';
  import { useProjects } from '../composables/useProjects';
  import CollaboratorItem from './CollaboratorItem.vue';
  import { useUsers } from '../composables/useUsers';
  import { SimpleUserResponse } from '@cockpit-app/api-types';
  import { useCurrentUser } from '../composables/useCurrentUser';
  import { logger } from '@cockpit-app/shared-utils';

  const props = defineProps<{
    visible: boolean;
  }>();

  const emit = defineEmits<{
    (e: 'update:visible', value: boolean): void;
  }>();

  const { collaborators, isLoading, addCollaborators, fetchCollaborators } =
    useCollaborators();
  const { selectedProject } = useProjects();
  const { users } = useUsers();
  const { currentUser } = useCurrentUser();

  const selectedUsers = ref<SimpleUserResponse[]>([]);

  const isAddingCollaborator = ref(false);

  const usersForSelection = computed(() => {
    if (!users.value) {
      return [];
    }
    if (!currentUser.value) {
      return [];
    }
    const usersWithoutCurrentUser = users.value?.filter(
      (user) => user.email !== currentUser.value?.email
    );
    if (collaborators.value.length === 0) {
      return usersWithoutCurrentUser;
    }
    const usersWithoutCollaborators = usersWithoutCurrentUser?.filter(
      (user) =>
        !collaborators.value.some(
          (collaborator) => collaborator.email === user.email
        )
    );
    return usersWithoutCollaborators;
  });

  async function handleAddCollaborators() {
    if (selectedUsers.value.length === 0) {
      return;
    }

    isAddingCollaborator.value = true;

    const selectedUserIds = selectedUsers.value.map((user) => user.id);

    try {
      const result = await addCollaborators(selectedUserIds);
      if (result) {
        selectedUsers.value = [];
      }
    } catch (err) {
      logger.error('Failed to add collaborators:', err);
    } finally {
      isAddingCollaborator.value = false;
    }
  }

  function onDialogHide() {
    emit('update:visible', false);
  }

  watch(
    () => props.visible,
    (visible) => {
      if (visible) {
        fetchCollaborators();
      }
    }
  );
</script>

<template>
  <Dialog
    :visible="visible"
    header="Manage Collaborators"
    :modal="true"
    @update:visible="emit('update:visible', $event)"
    @hide="onDialogHide"
  >
    <div class="flex flex-col gap-4">
      <h3 v-if="selectedProject" class="text-lg font-semibold">
        Project: {{ selectedProject.name }}
      </h3>

      <div class="flex flex-col gap-2">
        <h4 class="text-md font-medium">Add collaborators</h4>
        <div class="flex gap-2">
          <MultiSelect
            v-model="selectedUsers"
            :options="usersForSelection"
            option-label="email"
            filter
            placeholder="Select Users"
            :max-selected-labels="3"
            class="w-full md:w-80"
          />
          <Button
            label="Add"
            :disabled="isAddingCollaborator || selectedUsers.length === 0"
            @click="handleAddCollaborators"
          />
        </div>
      </div>

      <div class="mt-4">
        <h4 class="text-md font-medium mb-2">Project collaborators</h4>
        <div v-if="isLoading" class="flex justify-center p-4">
          <i class="pi pi-spin pi-spinner text-2xl"></i>
        </div>
        <div
          v-else-if="collaborators.length === 0"
          class="p-4 text-center text-gray-500"
        >
          No collaborators found
        </div>
        <div v-else class="flex flex-col gap-2">
          <CollaboratorItem
            v-for="collaborator in collaborators"
            :id="collaborator.id"
            :key="collaborator.email"
            :email="collaborator.email"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <Button label="Close" @click="onDialogHide" />
    </template>
  </Dialog>
</template>
