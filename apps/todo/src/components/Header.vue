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

<script setup lang="ts">
  import { RouterLink } from 'vue-router';
  import { Menubar } from '@cockpit-app/shared-vue-ui';
  import LogoutButton from './LogoutButton.vue';
  import { Avatar } from '@cockpit-app/shared-vue-ui';
  import { userService } from '../services/userService';
  import { ref, onMounted } from 'vue';
  import { getAvatarLabelFromEmail } from '../utils/utils';
  import type { UserInfoResponse } from '@cockpit-app/api-types';

  type MenuItem = {
    label: string;
    to: string;
  };

  const currentUser = ref<UserInfoResponse | null>(null);
  const tooltipText = ref('Fetched user info...');
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
  onMounted(async function () {
    currentUser.value = await userService.getCurrentUserInfo();
    if (!currentUser.value) {
      tooltipText.value = 'Fetched user info failed';
      return;
    }
    tooltipText.value = `Logged in as: ${currentUser.value.email}`;
  });
</script>
