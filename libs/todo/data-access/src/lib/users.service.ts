import { SimpleUserResponse } from '@cockpit-app/api-types';
import { baseApi, USER_MANAGEMENT_ENDPOINTS } from '@cockpit-app/common-shared-data-access';
import { usersSchema } from './schemas';

export const usersService = {
  async getUsers() {
    return await baseApi.getRequest<SimpleUserResponse[]>(
      USER_MANAGEMENT_ENDPOINTS.users(),
      usersSchema,
    );
  },
};
