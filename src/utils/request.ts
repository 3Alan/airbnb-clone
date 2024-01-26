import axios from 'axios';
import { Toast } from 'react-native-toast-notifications';

import { useUserStore } from '@/store/user';

const isDev = process.env.NODE_ENV === 'development';

const request = axios.create({
  baseURL: isDev ? 'http://localhost:8081/api' : `${process.env.EXPO_PUBLIC_API_URL || ''}/api`
});

request.interceptors.request.use(
  config => {
    const token = useUserStore.getState().user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
    }

    Toast.show('something went wrong');
    return Promise.reject(error);
  }
);

export default request;
