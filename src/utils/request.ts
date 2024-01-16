import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const request = axios.create({
  baseURL: isDev ? 'http://localhost:8081/api' : '/api'
});

request.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
    }

    return Promise.reject(error);
  }
);

export default request;
