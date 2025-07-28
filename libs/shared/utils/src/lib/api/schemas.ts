import { z } from 'zod';
import { SimpleRefreshResponse } from '@cockpit-app/types-shared-auth';

export type LogoutResponse = {
  detail: string;
};

export const simpleRefreshResponseSchema = z
  .object({
    message: z.string().describe('Message'),
  })
  .transform((data) => data as SimpleRefreshResponse);

export const logoutResponseSchema = z
  .object({
    detail: z.string().describe('Detail'),
  })
  .transform((data) => data as LogoutResponse);
