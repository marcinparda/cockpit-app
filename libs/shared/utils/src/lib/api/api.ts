import { SimpleRefreshResponse } from '@cockpit-app/api-types';
import { AUTHENTICATION_ENDPOINTS } from './endpoints';
import { baseApi } from './baseApi';
import {
  LogoutResponse,
  logoutResponseSchema,
  simpleRefreshResponseSchema,
} from './schemas';

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
