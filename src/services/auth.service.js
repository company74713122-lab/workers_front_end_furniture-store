import api from '../config/axios';

/**
 * تسجيل الدخول
 * POST /api/v1/auth/login
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    console.log(' Service: Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('💥 Service: Login error:', error.response?.data);
    // إعادة رمي الخطأ ليتم التعامل معه في الـ Context
    throw error;
  }
};

/**
 * تسجيل الخروج
 * POST /api/v1/auth/logout
 */
export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }
};

/**
 * تحديث التوكن
 * POST /api/v1/auth/refresh-token
 */
export const refreshToken = async () => {
  const response = await api.post('/auth/refresh-token');
  return response.data;
};