import axios from 'axios';
import { logout, refreshAccessToken } from '@cockpit-app/shared/auth';

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

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        const config = error.config;
        return httpClient(config);
      } else {
        await logout();
        const redirectUrl = new URL('https://login.parda.me');
        redirectUrl.searchParams.set('redirect_uri', window.location.href);
        window.location.href = redirectUrl.toString();
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
