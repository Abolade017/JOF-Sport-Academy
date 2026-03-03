import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || '/api/'

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // optional: 10s timeout
})

export default axiosInstance
