import { UserInfoResponse } from '@cockpit-app/types-shared-auth';
import { baseApi } from '@cockpit-app/shared/utils';
import { z } from 'zod';
import { endpoints } from './endpoints';

const userSchema = z.object({
  user_id: z.string().describe('User id'),
  email: z.email().describe('Email'),
  is_active: z.boolean().describe('Is user account active'),
  password_changed: z.boolean().describe('Is user changed password'),
  created_at: z.string().describe('User creation date'),
});

export async function getUser(): Promise<UserInfoResponse> {
  return await baseApi.getRequest(endpoints.getUser, userSchema);
}
