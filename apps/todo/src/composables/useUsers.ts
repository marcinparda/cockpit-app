import { SimpleUserResponse } from '@cockpit-app/api-types';
import { ref } from 'vue';
import { usersService } from '../services/usersService';
import { logger } from '@cockpit-app/shared-utils';

const users = ref<SimpleUserResponse[]>([]);

async function fetchUsers() {
  try {
    const response = await usersService.getUsers();
    users.value = response;
  } catch (error) {
    logger.error('Failed to fetch users:', error);
    users.value = [];
  }
}

fetchUsers();

export function useUsers() {
  return {
    users,
  };
}
