import axios from 'axios';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.baseURL = 'http://localhost:3001';
  if (token) {
    config.headers['token'] = JSON.parse(token);
  }

  return config;
});

export default axios;