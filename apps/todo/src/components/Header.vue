<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Menubar } from '@cockpit-app/shared-vue-ui';
  import LogoutButton from './LogoutButton.vue';
  import { Avatar } from '@cockpit-app/shared-vue-ui';
  import { computed } from 'vue';
  import { getAvatarLabelFromEmail } from '../utils/utils';
  import { useCurrentUser } from '../composables/useCurrentUser';

  type MenuItem = {
    label: string;
    to: string;
  };

  const { currentUser } = useCurrentUser();
  const tooltipText = computed(() => {
    return currentUser.value
      ? `Logged in as: ${currentUser.value.email}`
      : 'Fetching user info...';
  });
  const items: MenuItem[] = [
    {
      label: 'List',
      to: '/list',
    },
    {
      label: 'Projects',
      to: '/projects',
    },
  ];
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <Avatar
        v-if="currentUser"
        v-tooltip="tooltipText"
        :label="getAvatarLabelFromEmail(currentUser.email)"
        shape="circle"
      />
    </template>
    <template #item="{ item }">
      <RouterLink class="block p-2" :to="item['to']">
        {{ item.label }}
      </RouterLink>
    </template>
    <template #end>
      <LogoutButton />
    </template>
  </Menubar>
</template>
