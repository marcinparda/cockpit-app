import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { UserInfoResponse } from '@cockpit-app/api-types';
import { currentUserService } from '@cockpit-app/todo-data-access';
import { logger } from '@cockpit-app/shared-utils';

export const useCurrentUserStore = defineStore('currentUser', () => {
  const currentUser = ref<UserInfoResponse | null>(null);
  const isLoading = ref(false);

  async function fetchCurrentUser() {
    try {
      isLoading.value = true;
      currentUser.value = await currentUserService.getCurrentUserInfo();
    } catch (error) {
      logger.error('Failed to fetch current user:', error);
      currentUser.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  return { currentUser, isLoading, fetchCurrentUser };
});
