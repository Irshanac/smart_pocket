import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import endPoint from './endPoint';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_API_BASE_URL,
  withCredentials: true, // Ensures cookies are sent with requests
});

let isRefreshing = false;
let failedQueue: { resolve: () => void; reject: (error: any) => void }[] = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // Skip refresh logic for non-auth-related requests
    if (originalRequest.skipAuthRefresh) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.post(endPoint.AUTH.REFRESH_TOKEN);

        isRefreshing = false;
        processQueue(null);

        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError: AxiosError) {
        isRefreshing = false;
        processQueue(refreshError);

        // Redirect to login if refresh fails
        if (refreshError.response?.status === 401 && typeof window !== 'undefined') {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;



// export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL,
//     withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//     failedQueue.forEach((prom) => {
//         if (error) {
//             prom.reject(error);
//         } else {
//             prom.resolve(token);
//         }
//     });
//     failedQueue = [];
// };

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         // Skip refresh logic if the flag is set
//         if (originalRequest.skipAuthRefresh) {
//             return Promise.reject(error);
//         }

//         // Handle 401 errors for expired tokens
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise((resolve, reject) => {
//                     failedQueue.push({ resolve, reject });
//                 });
//             }

//             originalRequest._retry = true;
//             isRefreshing = true;

//             try {
//                 await axiosInstance.post("/refresh-token");

//                 // Retry the original request after refreshing the token
//                 isRefreshing = false;
//                 return axiosInstance(originalRequest);
//             } catch (refreshError) {
//                 isRefreshing = false;
//                 processQueue(refreshError, null);

//                 // Redirect to login if refresh fails
//                 if (refreshError.response?.status === 401) {
//                     window.location.href = "/login";
//                 }
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;