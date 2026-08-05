import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/UI/Container';
import ProductCard from '../components/Product/ProductCard';
import { getProducts } from '../services/product.service';
import {
  CATEGORIES,
  COLORS,
  SIZES,
  getCategoryLabel,
} from '../config/constants';
import {
  Filter,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Check,
  ArrowDown,
} from 'lucide-react';

import SEO from '../components/SEO/SEO';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPages: 1,
    totalCount: 0,
  });

  const [currentStep, setCurrentStep] = useState('category');
  const [toast, setToast] = useState({ show: false, message: '', icon: null });

  const categoryRef = useRef(null);
  const colorRef = useRef(null);
  const sizeRef = useRef(null);
  const priceRef = useRef(null);
  const productsRef = useRef(null);

  const category = searchParams.get('category') || '';
  const color = searchParams.get('color') || '';
  const size = searchParams.get('size') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || '-createdAt';
  const search = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    if (searchParams.get('material')) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('material');
      setSearchParams(newParams, { replace: true });
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  useEffect(() => {
    if (!category) setCurrentStep('category');
    else if (!color) setCurrentStep('color');
    else if (!size) setCurrentStep('size');
    else setCurrentStep('done');
  }, [category, color, size]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = { page, limit: 12 };
      if (category) params.category = category;
      if (color) params.color = color;
      if (size) params.size = size;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sort) params.sort = sort;
      if (search) params.search = search;

      const response = await getProducts(params);

      if (response.success) {
        setProducts(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('حدث خطأ أثناء تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, icon = "⭐") => {
    setToast({ show: true, message, icon });
    setTimeout(() => setToast({ show: false, message: '', icon: null }), 3000);
  };

  const clearPriceFilter = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('minPrice');
    newParams.delete('maxPrice');
    newParams.set('page', '1');
    setSearchParams(newParams);
    showToast(' عرض جميع الأسعار', '⭐');
  };

  // ✅ تخطي الفلاتر والانتقال مباشرة للمنتجات
  const skipToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      showToast('👇 تخطي الفلاتر - استمتع بالتسوق!', '⭐');
    }
  };

  const guideToNextStep = (changedKey) => {
    if (changedKey === 'page') return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let nextStep = { step: 'done', ref: productsRef, message: '🎉 رائع! شاهد المنتجات المتاحة', icon: '⭐' };

    if (!category) {
      nextStep = { step: 'category', ref: categoryRef, message: '📂 اختر الفئة المناسبة أولاً', icon: Filter };
    } else if (!color) {
      nextStep = { step: 'color', ref: colorRef, message: '🎨 اختر اللون المفضل لديك', icon: '⭐' };
    } else if (!size) {
      nextStep = { step: 'size', ref: sizeRef, message: '📏 حدد الحجم المناسب', icon: '⭐' };
    }

    setCurrentStep(nextStep.step);

    if (isMobile && nextStep.ref?.current) {
      setTimeout(() => {
        nextStep.ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }, 200);
    }

    if (changedKey !== 'page' && changedKey !== 'sort') {
      setTimeout(() => showToast(nextStep.message, nextStep.icon), 300);
    }
  };

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'page') newParams.set('page', '1');
    setSearchParams(newParams);

    guideToNextStep(key);
  };

  const clearFilters = () => {
    setSearchParams({});
    setCurrentStep('category');
    showToast('🔄 تم مسح جميع الفلاتر', X);
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const hasActiveFilters = category || color || size || minPrice || maxPrice;
  const hasActiveSearch = search.length > 0;

  const progressPercent = !category ? '25%' : !color ? '50%' : !size ? '75%' : '100%';
  const stepNumber = !category ? '1' : !color ? '2' : !size ? '3' : '4';

  const getStepClass = (stepName) => {
    if (currentStep === stepName) {
      return 'ring-2 ring-gold-400 bg-gradient-to-br from-gold-50/50 to-royal-50/50 rounded-xl p-3 -m-3 transition-all duration-500 shadow-sm';
    }
    return 'transition-all duration-500';
  };

  const StepBadge = ({ isActive, number }) => (
    isActive ? (
      <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold-500 text-royal-950 rounded-full text-xs font-bold flex items-center justify-center shadow-lg animate-bounce z-10">
        {number}
      </span>
    ) : (
      <span className="absolute -top-2 -right-2 w-6 h-6 bg-royal-100 text-royal-400 rounded-full text-xs font-bold flex items-center justify-center z-10">
        {number}
      </span>
    )
  );

  return (
    <>
      <SEO
        title="جميع المنتجات | أثاث منزلي فاخر - العباسي"
        description="تصفح مجموعتنا الكاملة من الأثاث المنزلي الفاخر. فلترة حسب الفئة، اللون، الحجم، والسعر."
        keywords="أثاث منزلي, شراء أثاث, أثاث أونلاين, معرض أثاث, العباسي"
        canonicalUrl="https://furniture-store-5d3.pages.dev/products"
        ogImage="https://furniture-store-5d3.pages.dev//products-og.jpg"
      />

      {toast.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-slide-down">
          <div className="bg-gradient-to-r from-royal-950 to-burgundy-900 text-gold-100 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gold-500/30">
            {toast.icon && <toast.icon className="w-5 h-5 text-gold-400" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="bg-neutral-50 min-h-screen">
        {/* Header */}
        <div className="bg-gradient-to-r from-royal-50 via-gold-50 to-burgundy-50 py-8 md:py-12 border-b border-gold-100">
          <Container>
            {hasActiveSearch && (
              <div className="mb-4 flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-gold-200">
                  <Search className="w-4 h-4 text-gold-600" />
                  <span className="text-sm text-royal-700">
                    نتائج البحث عن: <span className="font-bold text-gold-700">"{search}"</span>
                  </span>
                </div>
                <button
                  onClick={clearSearch}
                  className="flex items-center gap-1 px-3 py-2 bg-white/80 backdrop-blur text-red-600 rounded-full text-xs font-medium hover:bg-red-50 transition-all border border-red-200"
                >
                  <X className="w-3 h-3" />
                  مسح البحث
                </button>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold font-display text-royal-950 mb-2">
              {category 
                ? getCategoryLabel(category) 
                : hasActiveSearch 
                  ? 'نتائج البحث' 
                  : 'جميع المنتجات'}
            </h1>
            <p className="text-royal-600">
              {pagination.totalCount} منتج متاح
            </p>
          </Container>
        </div>

        <Container className="py-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* الفلاتر */}
            <aside className="w-full md:w-72 flex-shrink-0">
              <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm md:sticky md:top-28 border border-gold-100">
                {/* ✅ القسم المعدل: عنوان + زر تخطي */}
                <div className="flex justify-between items-start mb-6 gap-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-royal-950 flex items-center gap-2 mb-1">
                      <Filter className="w-5 h-5" />
                      الفلاتر
                    </h3>
                    <p className="text-xs text-royal-500 hidden md:block">
                      اختر تفضيلاتك للعثور على المنتج المثالي
                    </p>
                    {/* ✅ زر التخطي - يظهر فقط على الهاتف */}
                    <button
                      onClick={skipToProducts}
                      className="mt-3 md:hidden w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-royal-950 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <ArrowDown className="w-4 h-4 animate-bounce" />
                      تخطي الفلاتر ورؤية كل المنتجات
                    </button>
                  </div>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-burgundy-800 hover:text-burgundy-900 font-medium whitespace-nowrap"
                    >
                      مسح الكل
                    </button>
                  )}
                </div>

                {/* مؤشر التقدم */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2 text-xs text-royal-600">
                    <span>الخطوة {stepNumber} من 4</span>
                    <span>{progressPercent}</span>
                  </div>
                  <div className="h-1.5 bg-royal-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-gold-500 to-burgundy-600 rounded-full transition-all duration-500"
                      style={{ width: progressPercent }}
                    />
                  </div>
                </div>

                {/* ترتيب */}
                <div className="mb-6 pb-6 border-b border-gold-100">
                  <h4 className="font-semibold mb-3 text-royal-950 text-sm">الترتيب</h4>
                  <select
                    value={sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="w-full bg-royal-50 border border-royal-200 rounded-lg px-3 py-2 text-sm text-royal-900"
                  >
                    <option value="-createdAt">الأحدث</option>
                    <option value="price">السعر: الأقل</option>
                    <option value="-price">السعر: الأعلى</option>
                    <option value="name">الاسم</option>
                  </select>
                </div>

                {/* الخطوة 1: الفئة */}
                <div ref={categoryRef} className={`mb-6 relative scroll-mt-4 ${getStepClass('category')}`}>
                  <StepBadge isActive={currentStep === 'category'} number="1" />
                  <h4 className="font-semibold mb-3 text-royal-950 text-sm">الفئة</h4>
                  <ul className="grid grid-cols-2 md:grid-cols-1 gap-1">
                    <li>
                      <button
                        onClick={() => updateFilter('category', '')}
                        className={`w-full text-right px-3 py-2 rounded-lg transition text-sm flex items-center gap-2 ${
                          !category
                            ? 'bg-royal-950 text-gold-300'
                            : 'hover:bg-royal-50 text-royal-800'
                        }`}
                      >
                        <span></span>
                        <span>الكل</span>
                      </button>
                    </li>
                    {CATEGORIES.map((cat) => (
                      <li key={cat.value}>
                        <button
                          onClick={() =>
                            updateFilter('category', category === cat.value ? '' : cat.value)
                          }
                          className={`w-full text-right px-3 py-2 rounded-lg transition text-sm flex items-center gap-2 ${
                            category === cat.value
                              ? 'bg-royal-950 text-gold-300'
                              : 'hover:bg-royal-50 text-royal-800'
                          }`}
                        >
                          <span>{cat.icon}</span>
                          <span>{cat.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* الخطوة 2: اللون */}
                <div ref={colorRef} className={`mb-6 relative scroll-mt-4 ${getStepClass('color')}`}>
                  <StepBadge isActive={currentStep === 'color'} number="2" />
                  <h4 className="font-semibold mb-3 text-royal-950 text-sm">اللون</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateFilter('color', '')}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        !color
                          ? 'border-gold-500 ring-2 ring-gold-300 scale-110'
                          : 'border-neutral-200 hover:border-gold-400'
                      }`}
                      style={{
                        background: 'conic-gradient(#ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ef4444)'
                      }}
                      title="كل الألوان"
                    >
                      {!color && (
                        <span className="w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3 h-3 text-gold-600" />
                        </span>
                      )}
                    </button>
                    {COLORS.map((col) => (
                      <button
                        key={col.value}
                        onClick={() =>
                          updateFilter('color', color === col.value ? '' : col.value)
                        }
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          color === col.value
                            ? 'border-gold-500 ring-2 ring-gold-300 scale-110'
                            : 'border-neutral-200 hover:border-gold-400'
                        }`}
                        style={{ backgroundColor: col.hex }}
                        title={col.label}
                      />
                    ))}
                  </div>
                </div>

                {/* الخطوة 3: الحجم */}
                <div ref={sizeRef} className={`mb-6 relative scroll-mt-4 ${getStepClass('size')}`}>
                  <StepBadge isActive={currentStep === 'size'} number="3" />
                  <h4 className="font-semibold mb-3 text-royal-950 text-sm">الحجم</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateFilter('size', '')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center gap-1 ${
                        !size
                          ? 'bg-royal-950 text-gold-300'
                          : 'bg-royal-50 text-royal-800 hover:bg-royal-100'
                      }`}
                    >
                      <span></span>
                      الكل
                    </button>
                    {SIZES.map((s) => (
                      <button
                        key={s.value}
                        onClick={() =>
                          updateFilter('size', size === s.value ? '' : s.value)
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                          size === s.value
                            ? 'bg-royal-950 text-gold-300'
                            : 'bg-royal-50 text-royal-800 hover:bg-royal-100'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* الخطوة 4: السعر */}
                <div ref={priceRef} className="relative">
                  <StepBadge isActive={false} number="4" />
                  <h4 className="font-semibold mb-3 text-royal-950 text-sm">نطاق السعر (اختياري)</h4>

                  <button
                    onClick={clearPriceFilter}
                    className={`w-full mb-3 px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                      !minPrice && !maxPrice
                        ? 'bg-royal-950 text-gold-300 shadow-sm'
                        : 'bg-royal-50 text-royal-800 hover:bg-royal-100'
                    }`}
                  >
                    <span>💰</span>
                    كل الأسعار
                  </button>

                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-px bg-royal-100"></div>
                    <span className="text-xs text-royal-400">أو حدد نطاق</span>
                    <div className="flex-1 h-px bg-royal-100"></div>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="من"
                      value={minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      className={`flex-1 px-3 py-2 border rounded-lg text-sm transition ${
                        minPrice
                          ? 'bg-gold-50 border-gold-300'
                          : 'bg-royal-50 border-royal-200'
                      }`}
                    />
                    <input
                      type="number"
                      placeholder="إلى"
                      value={maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      className={`flex-1 px-3 py-2 border rounded-lg text-sm transition ${
                        maxPrice
                          ? 'bg-gold-50 border-gold-300'
                          : 'bg-royal-50 border-royal-200'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* المنتجات */}
            <main ref={productsRef} className="flex-1 scroll-mt-4">
              <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gold-100">
                <span className="text-sm text-royal-600">
                  {pagination.totalCount} منتج
                </span>
              </div>

              {loading ? (
                <div className="py-20 text-center">
                  <div className="w-12 h-12 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-royal-600 text-sm">جاري التحميل...</p>
                </div>
              ) : error ? (
                <div className="py-20 text-center">
                  <div className="w-16 h-16 bg-burgundy-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-burgundy-800" />
                  </div>
                  <p className="text-royal-600 mb-4">{error}</p>
                  <button
                    onClick={fetchProducts}
                    className="px-6 py-3 bg-royal-950 text-gold-300 rounded-xl hover:bg-burgundy-900"
                  >
                    إعادة المحاولة
                  </button>
                </div>
              ) : products.length === 0 ? (
                <div className="py-20 text-center">
                  <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-neutral-400" />
                  </div>
                  <p className="text-royal-600 text-lg mb-4">
                    {hasActiveSearch
                      ? `لا توجد نتائج للبحث عن "${search}"`
                      : 'لا توجد منتجات مطابقة'}
                  </p>
                  <p className="text-royal-500 text-sm mb-6">
                    جرب تغيير كلمات البحث أو مسح الفلاتر
                  </p>
                  <div className="flex gap-3 justify-center">
                    {hasActiveSearch && (
                      <button
                        onClick={clearSearch}
                        className="px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                      >
                        مسح البحث
                      </button>
                    )}
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="px-6 py-3 bg-royal-950 text-gold-300 rounded-xl hover:bg-burgundy-900 transition-all"
                      >
                        مسح الفلاتر
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {products.map((product) => (
                      <ProductCard
                        key={product._id}
                        product={product}
                        variant="compact"
                      />
                    ))}
                  </div>

                  {pagination.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                      <button
                        onClick={() => updateFilter('page', Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="p-2 bg-white rounded-lg hover:bg-royal-50 disabled:opacity-50 shadow-sm"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                        .filter(
                          (p) =>
                            p === 1 ||
                            p === pagination.totalPages ||
                            Math.abs(p - page) <= 1
                        )
                        .map((p, idx, arr) => (
                          <span key={p} className="flex items-center">
                            {idx > 0 && arr[idx - 1] !== p - 1 && (
                              <span className="px-2 text-royal-400">...</span>
                            )}
                            <button
                              onClick={() => updateFilter('page', p)}
                              className={`w-10 h-10 rounded-lg font-medium transition ${
                                page === p
                                  ? 'bg-royal-950 text-gold-300 shadow-sm'
                                  : 'bg-white hover:bg-royal-50 text-royal-900 shadow-sm'
                              }`}
                            >
                              {p}
                            </button>
                          </span>
                        ))}
                      <button
                        onClick={() =>
                          updateFilter('page', Math.min(pagination.totalPages, page + 1))
                        }
                        disabled={page === pagination.totalPages}
                        className="p-2 bg-white rounded-lg hover:bg-royal-50 disabled:opacity-50 shadow-sm"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </Container>
      </div>
    </>
  );
}