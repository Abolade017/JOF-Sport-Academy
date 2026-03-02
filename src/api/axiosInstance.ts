import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: '/api/', // base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // optional: 10s timeout
});

export default axiosInstance;
