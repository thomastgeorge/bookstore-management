import axios from 'axios';

const Axios = axios.create({
  baseURL: 'http://localhost:8083',
});

// Set default headers
Axios.defaults.headers.post["Content-Type"] = "application/json";
Axios.defaults.headers.get["Content-Type"] = "application/json";
Axios.defaults.headers.delete["Content-Type"] = "application/json";
Axios.defaults.headers.put["Content-Type"] = "application/json";

// Interceptor to manage Authorization header conditionally
Axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  // Disable Authorization header for login and signup requests
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Add Authorization header for other requests
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default Axios;
