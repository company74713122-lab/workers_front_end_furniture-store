import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // تحديد الصفحة المقصودة
  const from = location.state?.from?.pathname || '/admin/dashboard';

  // إذا كان مسجل الدخول بالفعل، حول للـ dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    if (!formData.password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      console.log('🔐 Attempting login with:', formData.email);
      
      const result = await login(formData.email, formData.password);
      
      console.log('📊 Login result:', result);

      if (result && result.success) {
        console.log('✅ Login successful, redirecting to:', from);
        await new Promise(resolve => setTimeout(resolve, 500));
        navigate(from, { replace: true });
      } else {
        const errorMessage = result?.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        console.error('❌ Login failed:', errorMessage);
        setErrors({ submit: errorMessage });
      }
    } catch (error) {
      console.error('💥 Login error:', error);
      
      const errorMessage = 
        error?.response?.data?.message || 
        error?.message || 
        'حدث خطأ أثناء تسجيل الدخول. تأكد من اتصالك بالإنترنت.';
      
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name] || errors.submit) {
      setErrors((prev) => ({ ...prev, [name]: undefined, submit: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* الشعار */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl font-display">A</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ALFEIN</h1>
          <p className="text-gray-600 text-sm">تسجيل الدخول إلى لوحة التحكم</p>
        </div>

        {/* رسالة الخطأ العامة */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm text-center font-medium">{errors.submit}</p>
          </div>
        )}

        {/* النموذج */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* حقل البريد الإلكتروني */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full pr-12 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="admin@alfein.com"
                required
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span>⚠</span> {errors.email}
              </p>
            )}
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full pr-12 pl-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-900 placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                <span>⚠</span> {errors.password}
              </p>
            )}
          </div>

          {/* زر الدخول */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold py-3.5 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                جاري الدخول...
              </>
            ) : (
              <>
                دخول
                <ArrowRight className="w-5 h-5 rotate-180" />
              </>
            )}
          </button>
        </form>

        {/* رابط العودة */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 transition-colors font-medium"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للصفحة الرئيسية
          </Link>
        </div>

        {/* معلومات للتجربة */}
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs text-amber-800 text-center">
            💡 <strong>للتجربة:</strong> استخدم بيانات حسابك في الباك إند
            <br />
            (يجب أن يكون دورك admin)
          </p>
        </div>
      </div>
    </div>
  );
}