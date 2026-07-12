import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircle, Info, XCircle, X } from 'lucide-react';

export default function Toast() {
  const { toast: cartToast } = useCart();
  const { toast: authToast } = useAuth();

  // نستخدم آخر toast
  const toast = authToast || cartToast;

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 flex-shrink-0" />;
      case 'error':
        return <XCircle className="w-5 h-5 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 flex-shrink-0" />;
    }
  };

  const getBgColor = () => {
    switch (toast.type) {
      case 'success':
        return 'bg-sage-600/95';
      case 'error':
        return 'bg-red-500/95';
      default:
        return 'bg-charcoal/95';
    }
  };

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg text-white ${getBgColor()}`}>
        {getIcon()}
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}