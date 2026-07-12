import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // أثناء التحميل
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage-200 border-t-sage-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-charcoal/60">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // غير مسجل الدخول
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // يتطلب admin والمستخدم ليس admin
  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream pt-20">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-terracotta-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-terracotta-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold font-display text-charcoal mb-3">
            صلاحيات غير كافية
          </h1>
          <p className="text-charcoal/60 mb-8">
            هذه الصفحة متاحة للمدراء فقط
          </p>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-sage-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-sage-700 transition-all"
          >
            العودة للخلف
          </button>
        </div>
      </div>
    );
  }

  return children;
}