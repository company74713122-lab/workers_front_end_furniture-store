import { createContext, useState, useEffect, useCallback } from 'react';
import { login as loginService, logout as logoutService } from '../services/auth.service';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // تحميل بيانات المستخدم من localStorage عند البدء
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
    setLoading(false);
  }, []);

  // تسجيل الدخول
  const login = useCallback(async (email, password) => {
    try {
      console.log('🔑 AuthContext: Starting login for', email);
      
      const response = await loginService(email, password);
      
      console.log('📥 AuthContext: Login response:', response);
      
      // ✅ التحقق من نجاح العملية
      if (response && response.success && response.data) {
        const { user, accessToken } = response.data;
        
        console.log('✅ AuthContext: Login successful, user:', user);
        
        // حفظ البيانات
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        
        setUser(user);
        showToast('تم تسجيل الدخول بنجاح', 'success');
        
        return { success: true, user };
      } else {
        // ❌ فشل تسجيل الدخول (401 Unauthorized)
        console.error('❌ AuthContext: Login failed - invalid credentials');
        const message = response?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        showToast(message, 'error');
        return { success: false, message };
      }
    } catch (error) {
      console.error('💥 AuthContext: Login error:', error);
      
      // استخراج رسالة الخطأ
      const message = 
        error?.response?.data?.message || 
        error?.message || 
        'حدث خطأ أثناء تسجيل الدخول';
      
      showToast(message, 'error');
      return { success: false, message };
    }
  }, []);

  // تسجيل الخروج
  const logout = useCallback(async () => {
    await logoutService();
    setUser(null);
    showToast('تم تسجيل الخروج', 'info');
  }, []);

  // التحقق من الصلاحيات
  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  // إظهار إشعار
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isAuthenticated,
        toast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}