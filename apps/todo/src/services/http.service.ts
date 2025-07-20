import axios from 'axios';
import { authService } from './auth.service';
import router from '../router';

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
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.logout();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default httpClient;
