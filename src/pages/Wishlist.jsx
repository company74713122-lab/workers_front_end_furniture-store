import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import Container from '../components/UI/Container';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-sage-600" />
            </div>
            <h1 className="text-3xl font-bold font-display text-charcoal mb-3">
              المفضلة فارغة
            </h1>
            <p className="text-charcoal/60 mb-8">
              لم تضف أي منتجات للمفضلة بعد. ابدأ التسوق واحفظ منتجاتك المفضلة!
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-sage-600 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-sage-700 transition-all shadow-lg"
            >
              تسوق الآن
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <Container className="py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-charcoal mb-2">
              المفضلة
            </h1>
            <p className="text-charcoal/60">
              {wishlist.length} منتج في المفضلة
            </p>
          </div>
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">إفراغ الكل</span>
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all"
            >
              {/* Image */}
              <Link
                to={`/products/${item.slug}`}
                className="block relative aspect-[4/5] overflow-hidden"
              >
                <img
                  src={item.primImg}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </Link>

              {/* Content */}
              <div className="p-4">
                <p className="text-xs text-sage-600 font-medium mb-1">{item.category}</p>
                <Link
                  to={`/products/${item.slug}`}
                  className="font-bold text-charcoal hover:text-sage-600 transition-colors line-clamp-2 mb-2 block"
                >
                  {item.name}
                </Link>

                <div className="text-lg font-bold text-sage-600 mb-3">
                  LE {item.price.toLocaleString()}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-sage-600 hover:bg-sage-700 text-white py-2.5 rounded-xl transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm font-medium">أضف للسلة</span>
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}