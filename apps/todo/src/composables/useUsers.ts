import { SimpleUserResponse } from '@cockpit-app/api-types';
import { ref, onMounted } from 'vue';
import { usersService } from '@cockpit-app/todo-data-access';
import { logger } from '@cockpit-app/shared-utils';

// Shared state - singleton across all instances
const users = ref<SimpleUserResponse[]>([]);
const isLoading = ref(false);
let isInitialized = false;

async function fetchUsers() {
  if (isLoading.value) return; // Prevent concurrent requests
  
  try {
    isLoading.value = true;
    const response = await usersService.getUsers();
    users.value = response;
  } catch (error) {
    logger.error('Failed to fetch users:', error);
    users.value = [];
  } finally {
    isLoading.value = false;
    isInitialized = true;
  }
}

export function useUsers() {
  onMounted(() => {
    // Only fetch if not already initialized or loading
    if (!isInitialized && !isLoading.value) {
      fetchUsers();
    }
  });

  return {
    users,
    fetchUsers,
    isLoading,
  };
}
