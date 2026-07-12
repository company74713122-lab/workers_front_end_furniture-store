import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  AlertCircle,
  Package,
  Truck,
  Shield,
  Award,
  Star,
  MessageCircle,
  Phone,
  ChevronLeft,
  Crown,
  Armchair,
  Bed,
  Wine,
  Laptop,
} from 'lucide-react';
import {
  getHomePageData,
  getFeaturedProducts,
  getLatestProducts,
  getProductsOnOffer,
} from '../services/product.service';
import Container from '../components/UI/Container';
import ProductCard from '../components/Product/ProductCard';

import SEO from '../components/SEO/SEO';

export default function Home() {
  const [homeData, setHomeData] = useState({
    categories: [],
    offers: [],
  });
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    setLoading(true);
    setError(null);
    try {
      // ✅ جلب البيانات من endpoints منفصلة بالتوازي
      const [homeResponse, featuredResponse, latestResponse, offersResponse] = await Promise.all([
        getHomePageData(),
        getFeaturedProducts(8),
        getLatestProducts(8),
        getProductsOnOffer(8),
      ]);

      if (homeResponse.success) {
        setHomeData({
          categories: homeResponse.data.categories,
          offers: offersResponse.success ? offersResponse.data : [],
        });
      }

      if (featuredResponse.success) {
        setFeatured(featuredResponse.data);
      }

      if (latestResponse.success) {
        setLatest(latestResponse.data);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ أثناء تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  // ✅ أقسام الغرف
  const roomSections = [
    {
      id: 'living',
      title: 'غرف المعيشة',
      subtitle: 'أطقم كنب وصالونات',
      icon: Armchair,
      category: 'Living Room',
      color: 'from-rose-500 to-pink-600',
    },
    {
      id: 'bedroom',
      title: 'غرف النوم',
      subtitle: 'أسرة ودواليب',
      icon: Bed,
      category: 'Bedroom',
      color: 'from-violet-500 to-purple-600',
    },
    {
      id: 'dining',
      title: 'غرف السفرة',
      subtitle: 'طاولات وكراسي',
      icon: Wine,
      category: 'Dining Room',
      color: 'from-teal-500 to-cyan-600',
    },
    {
      id: 'office',
      title: 'المكاتب',
      subtitle: 'مكاتب وكراسي عمل',
      icon: Laptop,
      category: 'Office',
      color: 'from-orange-500 to-red-600',
    },
  ];

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

  if (error) {
    return (
      <div className="pt-20 min-h-[70vh] flex items-center justify-center">
        <Container>
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 bg-burgundy-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-burgundy-800" />
            </div>
            <h2 className="text-xl font-bold text-royal-950 mb-2">حدث خطأ</h2>
            <p className="text-royal-700 mb-4 font-medium">{error}</p>
            <button
              onClick={fetchHomeData}
              className="px-6 py-3 bg-gradient-to-r from-royal-950 to-burgundy-900 text-gold-300 rounded-xl hover:shadow-gold transition-all font-bold"
            >
              إعادة المحاولة
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
    <SEO
      title="BLAL - أثاث منزلي فاخر | معرض الأثاث الراقي في مصر"
      description="اكتشف أفخم قطع الأثاث المنزلي في BLAL. غرف معيشة، نوم، سفرة، ومكاتب بأعلى جودة وأفضل الأسعار. توصيل مجاني وضمان 5 سنوات."
      keywords="أثاث منزلي, أثاث فاخر, معرض أثاث, BLAL, غرف معيشة, غرف نوم"
      canonicalUrl="https://furniture-store-5d3.pages.dev"
      ogImage="https://furniture-store-5d3.pages.dev/home-og.jpg"
    />
    <div className="page-transition bg-neutral-50">
      {/* ══════════════════════════════════════════════════════
         HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-royal-950 via-burgundy-900 to-royal-950 text-white overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-burgundy-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6 border border-gold-400/30">
              <Crown className="w-4 h-4 text-gold-400" />
              <span className="text-gold-300 text-xs font-bold tracking-wide">
                مجموعة 2026 الملكية
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 leading-tight">
              <span className="block text-white">أثاث يليق</span>
              <span className="block gradient-gold">بذوقك الرفيع</span>
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-white leading-relaxed mb-8 px-4 font-medium">
              اكتشف مجموعتنا الفريدة من الأثاث المنزلي المصنوع بأجود الخامات
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 px-4 justify-center">
              <Link
                to="/products"
                className="btn-royal inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-royal-950 px-8 py-4 rounded-full font-bold shadow-gold transition-all"
              >
                تسوق الآن
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/products?category=Living Room"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur text-white px-8 py-4 rounded-full font-bold border-2 border-white/30 hover:bg-white/20 transition-all"
              >
                استكشف الصالات
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 mt-8 border-t border-white/10 justify-center">
              <div>
                <div className="text-2xl md:text-3xl font-black text-gold-400">
                  +{featured.length * 50}
                </div>
                <div className="text-xs text-white font-semibold mt-1">قطعة أثاث</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-gold-400">
                  {homeData.categories.length}
                </div>
                <div className="text-xs text-white font-semibold mt-1">فئات</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-gold-400">
                  100%
                </div>
                <div className="text-xs text-white font-semibold mt-1">جودة مضمونة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         FEATURES BAR
      ═══════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, title: 'توصيل مجاني', desc: 'فوق 5000 جنيه' },
              { icon: Shield, title: 'ضمان 5 سنوات', desc: 'على جميع المنتجات' },
              { icon: Award, title: 'خامات فاخرة', desc: 'مستوردة ومضمونة' },
              { icon: Phone, title: 'دعم 24/7', desc: 'فريق متخصص' },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-gold-700" />
                </div>
                <div>
                  <h3 className="font-bold text-royal-950 text-xs md:text-sm">{feature.title}</h3>
                  <p className="text-[10px] md:text-xs text-royal-700 font-medium">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
         ROOM SECTIONS
      ═══════════════════════════════════════════════════════ */}
      {roomSections.map((section) => {
        // ✅ فلترة المنتجات المميزة حسب الفئة
        const sectionProducts = featured.filter(
          (p) => p.category === section.category
        );

        if (sectionProducts.length === 0) return null;

        return (
          <section key={section.id} className="py-8 md:py-12 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}>
                    <section.icon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-2xl font-bold font-display text-royal-950">
                      {section.title}
                    </h2>
                    <p className="text-xs md:text-sm text-royal-700 font-medium">{section.subtitle}</p>
                  </div>
                </div>
                <Link
                  to={`/products?category=${section.category}`}
                  className="flex items-center gap-1 text-gold-700 font-bold text-sm hover:gap-2 transition-all"
                >
                  عرض الكل
                  <ChevronLeft className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                {sectionProducts.slice(0, 4).map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ═════════════════════════════════════════════════════
         ✅ FEATURED PRODUCTS - من endpoint منفصل
      ═══════════════════════════════════════════════════════ */}
      {featured.length > 0 && (
        <section className="py-8 md:py-12 bg-neutral-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-gold-500 to-gold-700 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display text-royal-950">
                    منتجات مميزة
                  </h2>
                  <p className="text-xs text-royal-700 font-medium">اختيارتنا من أفضل قطع الأثاث</p>
                </div>
              </div>
              <Link
                to="/products?isFeatured=true"
                className="flex items-center gap-1 text-gold-700 font-bold text-sm hover:gap-2 transition-all"
              >
                عرض الكل
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {featured.slice(0, 8).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
         ✅ LATEST PRODUCTS - من endpoint منفصل
      ═══════════════════════════════════════════════════════ */}
      {latest.length > 0 && (
        <section className="py-8 md:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-burgundy-700 to-burgundy-900 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display text-royal-950">
                    وصل حديثاً
                  </h2>
                  <p className="text-xs text-royal-700 font-medium">أحدث قطع الأثاث</p>
                </div>
              </div>
              <Link
                to="/products?sort=-createdAt"
                className="flex items-center gap-1 text-gold-700 font-bold text-sm hover:gap-2 transition-all"
              >
                عرض الكل
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {latest.slice(0, 8).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
         ✅ OFFERS - من endpoint منفصل
      ═══════════════════════════════════════════════════════ */}
      {homeData.offers.length > 0 && (
        <section className="py-8 md:py-12 bg-gradient-to-br from-burgundy-50 to-gold-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display text-royal-950">
                    عروض خاصة
                  </h2>
                  <p className="text-xs text-royal-700 font-medium">خصومات لا تُفوَّت</p>
                </div>
              </div>
              <Link
                to="/products?onOffer=true"
                className="flex items-center gap-1 text-gold-700 font-bold text-sm hover:gap-2 transition-all"
              >
                عرض الكل
                <ChevronLeft className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {homeData.offers.slice(0, 8).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
         CTA - واتساب
      ══════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-royal-950 via-burgundy-900 to-royal-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gold-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-burgundy-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-green-500/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
            <MessageCircle className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold font-display mb-3">
            تواصل معنا عبر واتساب
          </h2>
          <p className="text-base md:text-lg text-gold-200 mb-6 font-medium">
            احصل على استشارة مجانية من خبرائنا
          </p>
          <a
            href={`https://wa.me/201012345678?text=${encodeURIComponent('مرحباً، أريد الاستفسار عن منتجاتكم')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-royal inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 rounded-full font-bold shadow-luxury transition-all text-sm md:text-base"
          >
            <MessageCircle className="w-5 h-5" />
            تواصل عبر واتساب
          </a>
        </div>
      </section>
    </div>
    </>
  );
}