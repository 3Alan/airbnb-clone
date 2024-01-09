import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';

const request = axios.create({
  baseURL: isDev ? 'http://localhost:8081/api' : '/api'
});

export default request;
