// src/axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // .env me define karo
  withCredentials: true // only if using cookies/auth
});

export default instance;
