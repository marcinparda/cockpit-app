import { UserInfoResponse } from '@cockpit-app/api-types';
import { currentUserService } from '@cockpit-app/todo-data-access';
import { ref, onMounted } from 'vue';

const currentUser = ref<UserInfoResponse | null>(null);

async function fetchCurrentUser() {
  try {
    const response = await currentUserService.getCurrentUserInfo();
    currentUser.value = response;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    currentUser.value = null;
  }
}

export function useCurrentUser() {
  onMounted(() => {
    fetchCurrentUser();
  });

  return {
    currentUser,
    fetchCurrentUser,
  };
}
