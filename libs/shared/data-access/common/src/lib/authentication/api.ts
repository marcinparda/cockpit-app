import { baseApi } from '@cockpit-app/shared-utils';
import { AUTHENTICATION_ENDPOINTS } from './endpoints';
import {
  currentUserSchema,
  LogoutResponse,
  logoutResponseSchema,
  passwordChangeResponseSchema,
  simpleRefreshResponseSchema,
} from './schemas';
import {
  LoginResponse,
  PasswordChangeRequest,
  PasswordChangeResponse,
  SimpleRefreshResponse,
  UserInfoResponse,
} from '@cockpit-app/api-types';

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return await baseApi.postRequest(
    AUTHENTICATION_ENDPOINTS.LOGIN,
    simpleRefreshResponseSchema,
    {
      email,
      password,
    },
  );
}

export async function getCurrentUser(withRedirect = true) {
  return await baseApi.getRequest<UserInfoResponse>(
    AUTHENTICATION_ENDPOINTS.USER,
    currentUserSchema,
    withRedirect,
  );
}

export async function refreshAccessToken() {
  return await baseApi.postRequest<SimpleRefreshResponse, object>(
    AUTHENTICATION_ENDPOINTS.REFRESH,
    simpleRefreshResponseSchema,
    {},
  );
}

export async function logout() {
  return await baseApi.postRequest<LogoutResponse, object>(
    AUTHENTICATION_ENDPOINTS.LOGOUT,
    logoutResponseSchema,
    {},
  );
}

export async function changePassword(
  currentPassword: string,
  newPassword: string,
) {
  return baseApi.postRequest<PasswordChangeResponse, PasswordChangeRequest>(
    AUTHENTICATION_ENDPOINTS.CHANGE_PASSWORD,
    passwordChangeResponseSchema,
    {
      current_password: currentPassword,
      new_password: newPassword,
    },
  );
}
