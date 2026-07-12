import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ;

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// ✅ Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor - محسّن
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ استثناء مسارات المصادقة والطلبات العامة
    const isAuthRoute = 
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh-token');

    // ✅ عدم محاولة refresh إذا لم يكن هناك token أصلاً
    const hasToken = localStorage.getItem('accessToken');

    // ✅ فقط نحاول refresh إذا:
    // 1. الخطأ 401
    // 2. ليس طلب مصادقة
    // 3. لم نretry من قبل
    // 4. لدينا token أصلاً
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !isAuthRoute &&
      hasToken
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await api.post('/auth/refresh-token');
        const newAccessToken = response.data.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        // ✅ فقط نوجه لـ login إذا كنا في صفحة محمية
        if (
          !window.location.pathname.includes('/admin/login') &&
          window.location.pathname.includes('/admin')
        ) {
          window.location.href = '/admin/login';
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;