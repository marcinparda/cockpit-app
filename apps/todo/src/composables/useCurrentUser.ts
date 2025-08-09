import { UserInfoResponse } from '@cockpit-app/api-types';
import { currnetUserService } from '../services/currnetUserService';
import { ref, onMounted } from 'vue';

const currentUser = ref<UserInfoResponse | null>(null);

async function fetchCurrentUser() {
  try {
    const response = await currnetUserService.getCurrentUserInfo();
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
