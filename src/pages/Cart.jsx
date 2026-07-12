import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { generateCartMessage, openWhatsApp } from '../utils/whatsapp';
import Container from '../components/UI/Container';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  MessageCircle,
  ShoppingCart,
} from 'lucide-react';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();

  const handleWhatsAppOrder = () => {
    const url = generateCartMessage(cart, cartTotal);
    openWhatsApp(url);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-12 h-12 text-sage-600" />
            </div>
            <h1 className="text-3xl font-bold font-display text-charcoal mb-3">
              السلة فارغة
            </h1>
            <p className="text-charcoal/60 mb-8">
              لم تضف أي منتجات للسلة بعد. ابدأ التسوق واكتشف منتجاتنا المميزة!
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
    <div className="pt-20 pb-32">
      <Container className="py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-charcoal mb-2">
              سلة التسوق
            </h1>
            <p className="text-charcoal/60">
              {cart.length} منتج في السلة
            </p>
          </div>
          <button
            onClick={clearCart}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">إفراغ السلة</span>
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl p-4 md:p-6 shadow-soft hover:shadow-medium transition-all flex gap-4"
              >
                {/* Image */}
                <Link
                  to={`/products/${item.slug}`}
                  className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden"
                >
                  <img
                    src={item.primImg}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-xs text-sage-600 font-medium mb-1">
                        {item.category}
                      </p>
                      <Link
                        to={`/products/${item.slug}`}
                        className="font-bold text-charcoal hover:text-sage-600 transition-colors line-clamp-2"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      title="حذف"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-charcoal/60">
                      {item.material} • {item.color}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    {/* Quantity */}
                    <div className="flex items-center gap-2 bg-sage-50 rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all"
                      >
                        <Minus className="w-4 h-4 text-charcoal" />
                      </button>
                      <span className="w-8 text-center font-bold text-charcoal">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-all"
                      >
                        <Plus className="w-4 h-4 text-charcoal" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-left">
                      <div className="text-lg font-bold text-sage-600">
                        LE {(item.price * item.quantity).toLocaleString()}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-charcoal/60">
                          LE {item.price.toLocaleString()} × {item.quantity}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-28">
              <h2 className="text-xl font-bold font-display text-charcoal mb-6">
                ملخص الطلب
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">عدد المنتجات</span>
                  <span className="font-semibold text-charcoal">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} قطعة
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-charcoal/60">التوصيل</span>
                  <span className="font-semibold text-sage-600">يُحسب لاحقاً</span>
                </div>
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-bold text-charcoal">المجموع الكلي</span>
                  <span className="text-2xl font-bold text-sage-600">
                    LE {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] shadow-lg mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                اطلب عبر واتساب
              </button>

              <Link
                to="/products"
                className="w-full flex items-center justify-center gap-2 bg-sage-100 hover:bg-sage-200 text-sage-700 py-3 rounded-2xl font-medium transition-all"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                متابعة التسوق
              </Link>

              {/* Note */}
              <div className="mt-6 p-4 bg-cream rounded-xl">
                <p className="text-xs text-charcoal/70 leading-relaxed">
                  💡 عند الضغط على "اطلب عبر واتساب"، سيتم إرسال تفاصيل طلبك كاملة ليقوم فريقنا بالتواصل معك لتأكيد الطلب وترتيب التوصيل.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}