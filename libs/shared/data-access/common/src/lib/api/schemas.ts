import { z } from 'zod';
import { SimpleRefreshResponse } from '@cockpit-app/api-types';

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
