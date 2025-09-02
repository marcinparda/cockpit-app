import {
  LoginResponse,
  PasswordChangeResponse,
  SimpleRefreshResponse,
  UserInfoResponse,
} from '@cockpit-app/api-types';
import { z } from 'zod';

export type LogoutResponse = {
  detail: string;
};

// create shema basing on the UserInfoResponse type
export const currentUserSchema = z
  .object({
    user_id: z.string().describe('User Id'),
    email: z.email().describe('Email'),
    is_active: z.boolean().describe('Is Active'),
    password_changed: z.boolean().describe('Password Changed'),
    created_at: z.string().describe('Created At'),
  })
  .transform((data) => data as UserInfoResponse);

export const simpleRefreshResponseSchema = z
  .object({
    detail: z.string().describe('Detail'),
  })
  .transform((data) => data as SimpleRefreshResponse);

export const loginResponseSchema = z
  .object({
    detail: z.string().describe('Detail'),
  })
  .transform((data) => data as LoginResponse);

export const logoutResponseSchema = z
  .object({
    detail: z.string().describe('Detail'),
  })
  .transform((data) => data as LogoutResponse);

export const passwordChangeResponseSchema = z
  .object({
    detail: z.string().describe('Detail'),
  })
  .transform((data) => data as PasswordChangeResponse);
