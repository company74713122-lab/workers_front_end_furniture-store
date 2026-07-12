// WishlistIcon.jsx
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';

export default function WishlistIcon() {
  const { wishlistCount } = useWishlist();

  return (
    <Link
      to="/wishlist"
      className="relative p-2.5 hover:bg-neutral-100 rounded-full transition-all duration-300 group hidden sm:flex"
    >
      <Heart className="w-5 h-5 text-neutral-700 group-hover:text-red-500 transition-colors" />
      {wishlistCount > 0 && (
        <span className="absolute -top-0.5 -left-0.5 min-w-[20px] h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold px-1 shadow-lg animate-scale-in">
          {wishlistCount}
        </span>
      )}
    </Link>
  );
}