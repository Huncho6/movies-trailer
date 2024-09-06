// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:45/api', // Replace with your API base URL
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
