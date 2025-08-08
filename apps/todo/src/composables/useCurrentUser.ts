import { UserInfoResponse } from '@cockpit-app/api-types';
import { userService } from '../services/userService';
import { ref } from 'vue';

const currentUser = ref<UserInfoResponse | null>(null);

async function fetchCurrentUser() {
  try {
    const response = await userService.getCurrentUserInfo();
    currentUser.value = response;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    currentUser.value = null;
  }
}

fetchCurrentUser();

export function useCurrentUser() {
  return {
    currentUser,
  };
}
