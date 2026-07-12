// CartIcon.jsx
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link
      to="/cart"
      className="relative p-2.5 hover:bg-neutral-100 rounded-full transition-all duration-300 group"
    >
      <ShoppingBag className="w-5 h-5 text-neutral-700 group-hover:text-brand-700 transition-colors" />
      {cartCount > 0 && (
        <span className="absolute -top-0.5 -left-0.5 min-w-[20px] h-5 bg-gradient-to-br from-brand-600 to-brand-800 text-white text-[10px] rounded-full flex items-center justify-center font-bold px-1 shadow-lg animate-scale-in">
          {cartCount > 99 ? '99+' : cartCount}
        </span>
      )}
    </Link>
  );
}