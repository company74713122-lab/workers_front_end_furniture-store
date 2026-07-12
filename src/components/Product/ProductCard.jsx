import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, MessageCircle } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { generateSingleProductMessage, openWhatsApp } from '../../utils/whatsapp';
import { getCategoryLabel } from '../../config/constants';

export default function ProductCard({ product, variant = 'default' }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const hasDiscount = product.offerPrice && product.offerPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  const isWishlisted = isInWishlist(product._id);
  const currentPrice = product.offerPrice || product.price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openWhatsApp(generateSingleProductMessage(product));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // ✅ Compact variant - للصورة المرفقة
  if (variant === 'compact') {
    return (
      <div className="product-card group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-neutral-100">
        {/* Image - Landscape 4:3 */}
        <Link
          to={`/products/${product.slug}`}
          className="block relative aspect-[4/3] overflow-hidden bg-neutral-100"
        >
          <img
            src={product.primImg || product.images[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Discount Badge - Top Left */}
          {hasDiscount && (
            <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
              {discountPercent}%
            </span>
          )}

          {/* Wishlist - Top Right */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`absolute top-2 right-2 p-1.5 rounded-full shadow-sm transition-all ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/90 text-neutral-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </Link>

        {/* Content - Compact */}
        <div className="p-3">
          {/* Name */}
          <h3 className="font-semibold text-neutral-900 text-base md:text-lg mb-1 line-clamp-2 leading-tight min-h-[1.6rem]">            <Link to={`/products/${product.slug}`} className="hover:text-gold-700 transition-colors">
              {product.name}
            </Link>
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            {hasDiscount ? (
              <>
                <span className="text-base font-bold text-red-600">
                  LE {product.offerPrice.toLocaleString()}
                </span>
                <span className="text-xs text-neutral-400 line-through">
                  LE {product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-base font-bold text-neutral-900">
                LE {product.price.toLocaleString()}
              </span>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white py-2 rounded-lg text-[10px] font-semibold active:scale-95 transition-transform"
            >
              <MessageCircle className="w-3 h-3" />
              واتساب
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-1 bg-neutral-900 text-white py-2 rounded-lg text-[10px] font-semibold active:scale-95 transition-transform"
            >
              <ShoppingBag className="w-3 h-3" />
              أضف
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Default variant - للصفحة الرئيسية
  return (
    <div className="product-card group bg-white rounded-2xl overflow-hidden shadow-royal hover:shadow-luxury transition-all border border-gold-100">
      {/* Image - Landscape 4:3 */}
      <Link
        to={`/products/${product.slug}`}
        className="block relative aspect-[4/3] overflow-hidden bg-royal-50"
      >
        <img
          src={product.primImg || product.images[0]?.url}
          alt={product.name}
          className="product-image w-full h-full object-cover"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {hasDiscount && (
            <span className="badge-gold text-royal-950 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              -{discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-burgundy-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              جديد
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={`absolute top-3 left-3 p-2.5 rounded-full shadow-lg transition-all duration-300 z-10 ${
            isWishlisted
              ? 'bg-burgundy-800 text-white scale-110'
              : 'bg-white/95 backdrop-blur text-royal-800 hover:bg-white hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Actions */}
        <div className="product-actions absolute bottom-3 left-3 right-3 flex gap-2 z-10">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl shadow-lg transition-all text-xs font-semibold"
          >
            <MessageCircle className="w-4 h-4" />
            واتساب
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1.5 bg-royal-950 hover:bg-burgundy-800 text-white py-2.5 rounded-xl shadow-lg transition-all text-xs font-semibold"
          >
            <ShoppingBag className="w-4 h-4" />
            أضف للسلة
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-gold-700 font-semibold tracking-wide uppercase">
            {getCategoryLabel(product.category)}
          </span>
          {product.stock > 0 && product.stock < 5 && (
            <span className="text-[10px] text-burgundy-800 font-semibold">
              باقي {product.stock} فقط
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="font-bold text-royal-950 text-sm md:text-base mb-3 line-clamp-2 min-h-[2.5rem] leading-snug">
          <Link
            to={`/products/${product.slug}`}
            className="hover:text-gold-700 transition-colors"
          >
            {product.name}
          </Link>
        </h3>

        {/* Price */}
        <div className="flex items-end justify-between mb-3">
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-burgundy-800">
                  {product.offerPrice.toLocaleString()}
                </span>
                <span className="text-xs text-royal-400 line-through">
                  {product.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-royal-950">
                {product.price.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] text-royal-500 font-medium">جنيه</span>
        </div>

        {/* Mobile Buttons */}
        <div className="flex gap-2 md:hidden">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white py-2.5 rounded-xl text-xs font-semibold active:scale-95 transition-transform"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            واتساب
          </button>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1 bg-royal-950 text-white py-2.5 rounded-xl text-xs font-semibold active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            أضف للسلة
          </button>
        </div>
      </div>
    </div>
  );
}