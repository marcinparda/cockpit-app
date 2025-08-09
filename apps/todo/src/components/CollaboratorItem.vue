<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { Avatar, Button } from '@cockpit-app/shared-vue-ui';
  import { getAvatarLabelFromEmail } from '../utils/utils';
  import { useCollaborators } from '../composables/useCollaborators';
  import { useCurrentUser } from '../composables/useCurrentUser';

  const props = defineProps<{
    email: string;
    id: string;
  }>();

  const emit = defineEmits<{
    (e: 'remove'): void;
  }>();

  const { removeCollaborator } = useCollaborators();
  const { currentUser } = useCurrentUser();

  const isRemoving = ref(false);
  const error = ref('');

  const isCurrentUser = computed(() => {
    return props.email === currentUser.value?.email;
  });

  async function handleRemoveCollaborator() {
    isRemoving.value = true;
    error.value = '';

    try {
      const success = await removeCollaborator(props.id);
      if (success) {
        emit('remove');
      } else {
        error.value = 'Failed to remove collaborator';
      }
    } catch (err) {
      error.value = 'An error occurred while removing the collaborator';
    } finally {
      isRemoving.value = false;
    }
  }
</script>

<template>
  <div
    class="collaborator-item flex items-center justify-between rounded-md p-2"
  >
    <div class="flex items-center gap-2">
      <Avatar :label="getAvatarLabelFromEmail(email)" shape="circle" />
      <div class="flex flex-col">
        <span>{{ email }}</span>
        <span v-if="isCurrentUser" class="text-xs">(You)</span>
      </div>
    </div>
    <div>
      <Button
        v-if="!isCurrentUser"
        icon="pi pi-trash"
        severity="danger"
        text
        rounded
        :disabled="isRemoving"
        @click="handleRemoveCollaborator"
      />
      <div v-if="error" class="mt-1 text-xs text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<style scoped>
  .collaborator-item {
    border: 1px solid var(--p-dialog-border-color);
  }
</style>
