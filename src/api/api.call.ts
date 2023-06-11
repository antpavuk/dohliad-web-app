import axios from 'axios';
import AuthService from './services/auth.service';
import { TokenName } from '../types/token/token-name.enum';

const BASE_URL = process.env.REACT_APP_BASE_API_URL;

const apiCall = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiCall.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TokenName.Access);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

apiCall.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const accessToken = localStorage.getItem(TokenName.Access);
        const refreshToken = localStorage.getItem(TokenName.Refresh);

        if (accessToken && refreshToken) {
          const res = await AuthService.refreshToken({ accessToken, refreshToken });
          if (res.status === 201) {
            localStorage.setItem(TokenName.Access, res.data.accessToken);
            localStorage.setItem(TokenName.Refresh, res.data.refreshToken);

            apiCall.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(
              TokenName.Access
            )}`;

            return apiCall(originalRequest);
          }
        }

        localStorage.removeItem(TokenName.Access);
        localStorage.removeItem(TokenName.Refresh);

        return Promise.reject(error);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default apiCall;
