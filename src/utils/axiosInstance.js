// src/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://movies-server-hxc0.onrender.com/api", 
  timeout: 100000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
