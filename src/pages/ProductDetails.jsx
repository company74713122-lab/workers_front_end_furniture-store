import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
  Truck,
  Shield,
  Package,
  AlertCircle,
  Star,
  ChevronLeft,
} from 'lucide-react';
import Container from '../components/UI/Container';
import ImageGallery from '../components/ProductDetails/ImageGallery';
import QuantitySelector from '../components/ProductDetails/QuantitySelector';
import RelatedProducts from '../components/ProductDetails/RelatedProducts';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { getProductBySlug, getProductsByCategory } from '../services/product.service';
import { generateSingleProductMessage, openWhatsApp } from '../utils/whatsapp';


import ProductSchema from '../components/SEO/Schema/ProductSchema';
import BreadcrumbSchema from '../components/SEO/Schema/BreadcrumbSchema';

import SEO from '../components/SEO/SEO';

export default function ProductDetails() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const fetchProduct = async () => {
    setLoading(true);
    setError(null);

    try {
      // ✅ جلب المنتج فقط (بدون incrementViewCount)
      const response = await getProductBySlug(slug);

      if (response.success) {
        const productData = response.data;
        setProduct(productData);

        // ❌ إزالة استدعاء incrementViewCount لأنه endpoint غير موجود
        // await incrementViewCount(productData._id);

        // ✅ جلب منتجات مشابهة من نفس الفئة
        try {
          const relatedResponse = await getProductsByCategory(productData.category, { limit: 4 });
          if (relatedResponse.success) {
            setRelatedProducts(
              relatedResponse.data.data.filter((p) => p._id !== productData._id).slice(0, 4)
            );
          }
        } catch (err) {
          console.error('Error fetching related products:', err);
        }
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      if (err.response?.status === 404) {
        setError('المنتج غير موجود');
      } else {
        setError('حدث خطأ أثناء تحميل المنتج');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-royal-700 text-sm font-semibold">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-burgundy-100 rounded-full flex items-center justify-center mx-auto mb-6">
              {error === 'المنتج غير موجود' ? (
                <Package className="w-12 h-12 text-burgundy-800" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-500" />
              )}
            </div>
            <h1 className="text-3xl font-bold font-display text-royal-950 mb-3">
              {error || 'المنتج غير موجود'}
            </h1>
            <p className="text-royal-700 mb-8">
              {error === 'المنتج غير موجود'
                ? 'عذراً، لم نتمكن من العثور على هذا المنتج'
                : 'حدث خطأ أثناء تحميل بيانات المنتج'}
            </p>
            <div className="flex gap-3 justify-center">
              {error !== 'المنتج غير موجود' && (
                <button
                  onClick={fetchProduct}
                  className="inline-flex items-center gap-2 bg-royal-950 text-gold-300 px-6 py-3 rounded-xl hover:bg-burgundy-900 transition-all font-semibold"
                >
                  إعادة المحاولة
                </button>
              )}
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-neutral-100 text-royal-900 px-6 py-3 rounded-xl hover:bg-neutral-200 transition-all font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                العودة للمنتجات
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  const hasDiscount = product.offerPrice && product.offerPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;
  const isWishlisted = isInWishlist(product._id);
  const currentPrice = product.offerPrice || product.price;
  const totalPrice = currentPrice * quantity;

    // ✅ عرّف المتغيرات المفقودة
  const productUrl = `/products/${product.slug}`;
  const productImage = product.primImg || product.images?.[0]?.url || '';

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWhatsApp = () => {
    const url = generateSingleProductMessage({
      ...product,
      price: currentPrice,
    });
    openWhatsApp(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: `شاهد هذا المنتج الرائع من BLAL: ${product.name}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ الرابط!');
    }
  };

  return (
    <>
    <SEO
      title={`${product.name} | BLAL - أثاث فاخر`}
      description={`${product.name} بسعر ${product.offerPrice || product.price} جنيه. ${product.material} ${product.color}. ${product.description.substring(0, 150)}...`}
      keywords={`${product.name}, ${product.category}, ${product.material}, ${product.color}, أثاث, BLAL`}
      canonicalUrl={productUrl}
      ogImage={productImage}
      ogType="product"
    />
    
    <ProductSchema product={product} />
    
    <BreadcrumbSchema
      items={[
        { name: 'الرئيسية', url: 'https://furniture-store-5d3.pages.dev/' },
        { name: 'المنتجات', url: 'https://furniture-store-5d3.pages.dev/products' },
        { name: product.category, url: `https://furniture-store-5d3.pages.dev/products?category=${product.category}` },
        { name: product.name, url: productUrl },
      ]}
    />

    <div className="pt-20 pb-16 bg-neutral-50">
      <Container className="py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-royal-600 mb-6 overflow-x-auto">
          <Link to="/" className="hover:text-gold-700 transition-colors whitespace-nowrap font-medium">
            الرئيسية
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-gold-700 transition-colors whitespace-nowrap font-medium">
            المنتجات
          </Link>
          <span>/</span>
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-gold-700 transition-colors whitespace-nowrap font-medium"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-royal-950 font-bold truncate">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gold-700 font-bold tracking-wide uppercase mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-display text-royal-950 mb-4 leading-tight">
                {product.name}
              </h1>
              <div className="flex flex-wrap gap-2">
                {hasDiscount && (
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    خصم {discountPercent}%
                  </span>
                )}
                {product.isNew && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    جديد
                  </span>
                )}
                {product.isFeatured && (
                  <span className="bg-gold-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    مميز
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            {/* <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= 4 ? 'text-gold-500 fill-gold-500' : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-royal-600 font-medium">(4.0) • 128 تقييم</span>
            </div> */}

            {/* Price */}
            <div className="bg-gradient-to-br from-gold-50 to-cream-100 rounded-2xl p-6 border border-gold-200">
              <div className="flex items-end gap-3 mb-2 flex-wrap">
                {hasDiscount ? (
                  <>
                    <span className="text-4xl font-black text-burgundy-800">
                      LE {currentPrice.toLocaleString()}
                    </span>
                    <span className="text-xl text-royal-400 line-through mb-1">
                      LE {product.price.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-green-700 mb-2">
                      وفر LE {(product.price - currentPrice).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-black text-royal-950">
                    LE {currentPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-royal-600 font-medium">شامل ضريبة القيمة المضافة</p>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-bold text-royal-950 text-lg mb-2">الوصف</h3>
              <p className="text-royal-700 leading-relaxed">{product.description}</p>
            </div>

{/* Specifications */}
<div className="bg-white border border-neutral-200 rounded-2xl p-6">
  <h3 className="font-bold text-royal-950 mb-4 text-lg">المواصفات</h3>
  <div className="grid grid-cols-2 gap-4">
    
    {/* ✅ إخفاء المادة إذا كانت Rattan */}
    {product.material !== 'Rattan' && (
      <div>
        <p className="text-xs text-royal-600 mb-1 font-medium">المادة</p>
        <p className="font-bold text-royal-950">{product.material}</p>
      </div>
    )}
    
    {/* ✅ إخفاء اللون إذا كان Walnut */}
    {product.color !== 'Walnut' && (
      <div>
        <p className="text-xs text-royal-600 mb-1 font-medium">اللون</p>
        <p className="font-bold text-royal-950">{product.color}</p>
      </div>
    )}
    
    <div>
      <p className="text-xs text-royal-600 mb-1 font-medium">الحجم</p>
      <p className="font-bold text-royal-950">{product.size || 'متوسط'}</p>
    </div>
    <div>
      <p className="text-xs text-royal-600 mb-1 font-medium">الوزن</p>
      <p className="font-bold text-royal-950">{product.weight} كجم</p>
    </div>
    {product.dimensions && (
      <div className="col-span-2">
        <p className="text-xs text-royal-600 mb-1 font-medium">الأبعاد</p>
        <p className="font-bold text-royal-950">
          {product.dimensions.width} × {product.dimensions.height} ×{' '}
          {product.dimensions.depth} {product.dimensions.unit}
        </p>
      </div>
    )}
    <div className="col-span-2">
      <p className="text-xs text-royal-600 mb-1 font-medium">الحالة</p>
      <p className={`font-bold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
        {product.stock > 0 ? `متوفر (${product.stock} قطعة)` : 'غير متوفر'}
      </p>
    </div>
  </div>
</div>
            {/* Quantity */}
            {product.stock > 0 && (
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                maxStock={Math.min(product.stock, 99)}
              />
            )}

            {/* Total Price */}
            {quantity > 1 && (
              <div className="flex items-center justify-between p-4 bg-cream-100 rounded-xl border border-gold-200">
                <span className="text-royal-700 font-medium">الإجمالي:</span>
                <span className="text-2xl font-black text-royal-950">
                  LE {totalPrice.toLocaleString()}
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full py-4 bg-royal-950 text-gold-300 rounded-2xl font-bold hover:bg-burgundy-900 transition-all flex items-center justify-center gap-3 shadow-luxury disabled:bg-neutral-400 disabled:cursor-not-allowed active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                {product.stock === 0 ? 'غير متوفر' : 'أضف للسلة'}
              </button>

              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    isWishlisted
                      ? 'bg-red-50 text-red-600 border-2 border-red-200'
                      : 'bg-neutral-100 text-royal-900 hover:bg-neutral-200'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  <span className="text-sm">المفضلة</span>
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">واتساب</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-3 bg-neutral-100 text-royal-900 rounded-2xl font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm">مشاركة</span>
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-200">
              <div className="text-center">
                <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-5 h-5 text-gold-700" />
                </div>
                <p className="text-xs text-royal-700 font-medium">توصيل سريع</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-5 h-5 text-gold-700" />
                </div>
                <p className="text-xs text-royal-700 font-medium">ضمان الجودة</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-gold-700" />
                </div>
                <p className="text-xs text-royal-700 font-medium">منتج أصلي</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <RelatedProducts products={relatedProducts} currentProductId={product._id} />
        )}
      </Container>
    </div>
    </>
  );
}