import { UserInfoResponse } from '@cockpit-app/api-types';
import { currentUserService } from '@cockpit-app/todo-data-access';
import { ref, onMounted } from 'vue';

// Shared state - singleton across all instances
const currentUser = ref<UserInfoResponse | null>(null);
const isLoading = ref(false);
let isInitialized = false;

async function fetchCurrentUser() {
  if (isLoading.value) return; // Prevent concurrent requests
  
  try {
    isLoading.value = true;
    const response = await currentUserService.getCurrentUserInfo();
    currentUser.value = response;
  } catch (error) {
    console.error('Failed to fetch current user:', error);
    currentUser.value = null;
  } finally {
    isLoading.value = false;
    isInitialized = true;
  }
}

export function useCurrentUser() {
  onMounted(() => {
    // Only fetch if not already initialized or loading
    if (!isInitialized && !isLoading.value) {
      fetchCurrentUser();
    }
  });

  return {
    currentUser,
    fetchCurrentUser,
    isLoading,
  };
}
