import axios from "axios";

// Create an Axios instance
export const myApi = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to the instance
myApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }, (error) => {
  return Promise.reject(error);
  }
);

export default myApi;