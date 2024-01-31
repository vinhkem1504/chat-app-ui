import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

export interface axiosInstanceOptions {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
}

async function refreshAccessToken(refreshToken: string) {
  const options = {
    method: 'post',
    url: '/api/auth/refresh',
    data: {
      refreshToken: refreshToken,
    },
  };

  const res = await axios(options);
  await AsyncStorage.setItem('accessToken', res.data.accessToken);
  await AsyncStorage.setItem('refreshToken', res.data.refreshToken);

  return res.data.accessToken;
}

export const createAxiosInstance = (
  options: axiosInstanceOptions,
): AxiosInstance => {
  const instance = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeout || 10000,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  instance.interceptors.request.use(
    async config => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
          return config;
        }
      } catch (error) {
        return Promise.reject(error);
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    response => {
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & {
        _retry: boolean;
      };
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          if (refreshToken) {
            const newAccessToken = await refreshAccessToken(refreshToken);
            if (newAccessToken && originalRequest._retry) {
              originalRequest.headers!.Authorization = `Bearer ${newAccessToken}`;
            }
            return instance(originalRequest);
          }
          return instance(originalRequest);
        } catch {
          return Promise.reject(error);
        }
      }
    },
  );

  return instance;
};
