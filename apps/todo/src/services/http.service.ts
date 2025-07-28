import axios from 'axios';
import {
  logout,
  refreshAccessToken,
} from '@cockpit-app/common-shared-data-access';
import { environments } from '../environments/environments';

const httpClient = axios.create({
  withCredentials: true,
});

httpClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized responses
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        await refreshAccessToken();
        const config = error.config;
        return httpClient(config);
      } catch {
        const redirectUrl = new URL(environments.loginUrl);
        redirectUrl.searchParams.set('redirect_uri', window.location.href);
        window.location.href = redirectUrl.toString();
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
