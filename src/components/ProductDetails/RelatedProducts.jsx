import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

export default function RelatedProducts({ products, currentProductId }) {
  const { addToCart } = useCart();

  const relatedProducts = products.filter((p) => p._id !== currentProductId).slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold font-display text-charcoal mb-2">منتجات قد تعجبك</h2>
          <p className="text-charcoal/60">منتجات مشابهة من نفس الفئة</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all group"
          >
            <Link to={`/products/${product.slug}`} className="block aspect-square overflow-hidden">
              <img
                src={product.primImg || product.images[0]?.url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </Link>
            <div className="p-4">
              <p className="text-xs text-sage-600 font-medium mb-1">{product.category}</p>
              <Link
                to={`/products/${product.slug}`}
                className="font-bold text-charcoal hover:text-sage-600 transition-colors line-clamp-2 text-sm mb-2 block"
              >
                {product.name}
              </Link>
              <div className="flex items-center justify-between mt-3">
                <span className="text-lg font-bold text-sage-600">
                  LE {(product.offerPrice || product.price).toLocaleString()}
                </span>
                <button
                  onClick={() => addToCart(product)}
                  className="p-2 bg-sage-100 hover:bg-sage-500 text-sage-600 hover:text-white rounded-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}