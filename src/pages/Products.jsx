import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Container from '../components/UI/Container';
import ProductCard from '../components/Product/ProductCard';
import { getProducts } from '../services/product.service';
import {
  CATEGORIES,
  MATERIALS,
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
} from 'lucide-react';

import SEO from '../components/SEO/SEO';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    totalPages: 1,
    totalCount: 0,
  });

  // ✅ قراءة معاملات البحث من URL
  const category = searchParams.get('category') || '';
  const material = searchParams.get('material') || '';
  const color = searchParams.get('color') || '';
  const size = searchParams.get('size') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const sort = searchParams.get('sort') || '-createdAt';
  const search = searchParams.get('search') || ''; // ✅ معامل البحث
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = { page, limit: 12 };
      if (category) params.category = category;
      if (material) params.material = material;
      if (color) params.color = color;
      if (size) params.size = size;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sort) params.sort = sort;
      if (search) params.search = search; // ✅ إضافة معامل البحث

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

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== 'page') newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const clearSearch = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('search');
    setSearchParams(newParams);
  };

  const hasActiveFilters = category || material || color || size || minPrice || maxPrice;
  const hasActiveSearch = search.length > 0;

  return (
    <>
    <SEO
      title="جميع المنتجات | أثاث منزلي فاخر - BLAL"
      description="تصفح مجموعتنا الكاملة من الأثاث المنزلي الفاخر. فلترة حسب الفئة، المادة، اللون، والسعر. توصيل مجاني وضمان 5 سنوات."
      keywords="أثاث منزلي, شراء أثاث, أثاث أونلاين, معرض أثاث, BLAL"
      canonicalUrl="https://furniture-store-5d3.pages.dev/products"
      ogImage="https://furniture-store-5d3.pages.dev//products-og.jpg"
    />
    <div className="bg-neutral-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-royal-50 via-gold-50 to-burgundy-50 py-8 md:py-12 border-b border-gold-100">
        <Container>
          {/* ✅ عرض نص البحث إذا كان موجوداً */}
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
        {/* Filter Bar - Mobile */}
        <div className="flex items-center justify-between mb-4 bg-white p-3 rounded-xl shadow-sm md:hidden">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-royal-950 text-gold-300 rounded-lg text-sm font-medium"
          >
            <Filter className="w-4 h-4" />
            الفلاتر
            {hasActiveFilters && (
              <span className="w-5 h-5 bg-gold-500 text-royal-950 rounded-full text-xs flex items-center justify-center font-bold">
                !
              </span>
            )}
          </button>

          <select
            value={sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="bg-royal-50 border border-royal-200 rounded-lg px-3 py-2 text-sm text-royal-900"
          >
            <option value="-createdAt">الأحدث</option>
            <option value="price">السعر: الأقل</option>
            <option value="-price">السعر: الأعلى</option>
            <option value="name">الاسم</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Desktop Filters */}
          <aside className="hidden md:block md:w-72 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl shadow-sm sticky top-28 border border-gold-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-royal-950">الفلاتر</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-burgundy-800 hover:text-burgundy-900 font-medium"
                  >
                    مسح الكل
                  </button>
                )}
              </div>

              {/* Category */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-royal-950 text-sm">الفئة</h4>
                <ul className="space-y-1">
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

              {/* Material */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-royal-950 text-sm">المادة</h4>
                <ul className="space-y-1">
                  {MATERIALS.map((mat) => (
                    <li key={mat.value}>
                      <button
                        onClick={() =>
                          updateFilter('material', material === mat.value ? '' : mat.value)
                        }
                        className={`w-full text-right px-3 py-2 rounded-lg transition text-sm ${
                          material === mat.value
                            ? 'bg-royal-950 text-gold-300'
                            : 'hover:bg-royal-50 text-royal-800'
                        }`}
                      >
                        {mat.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-royal-950 text-sm">اللون</h4>
                <div className="flex flex-wrap gap-2">
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

              {/* Size */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-royal-950 text-sm">الحجم</h4>
                <div className="flex flex-wrap gap-2">
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

              {/* Price */}
              <div>
                <h4 className="font-semibold mb-3 text-royal-950 text-sm">نطاق السعر</h4>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="من"
                    value={minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="flex-1 px-3 py-2 bg-royal-50 border border-royal-200 rounded-lg text-sm"
                  />
                  <input
                    type="number"
                    placeholder="إلى"
                    value={maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="flex-1 px-3 py-2 bg-royal-50 border border-royal-200 rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Products */}
          <main className="flex-1">
            {/* Sort Bar - Desktop */}
            <div className="hidden md:flex justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-gold-100">
              <span className="text-sm text-royal-600">
                {pagination.totalCount} منتج
              </span>
              <select
                value={sort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="bg-royal-50 border border-royal-200 rounded-lg px-4 py-2 text-sm"
              >
                <option value="-createdAt">الأحدث</option>
                <option value="price">السعر: الأقل أولاً</option>
                <option value="-price">السعر: الأعلى أولاً</option>
                <option value="name">الاسم (أ-ي)</option>
              </select>
            </div>

            {/* Content */}
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
                {/* Grid - 2 cols mobile, 3 tablet, 4 desktop */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      variant="compact"
                    />
                  ))}
                </div>

                {/* Pagination */}
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

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-royal-950">الفلاتر</h3>
              <button
                className="p-2 hover:bg-royal-50 rounded-full"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-royal-950">الفئة</h4>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => {
                      updateFilter('category', category === cat.value ? '' : cat.value);
                    }}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition flex items-center gap-2 ${
                      category === cat.value
                        ? 'bg-royal-950 text-gold-300'
                        : 'bg-royal-50 text-royal-800'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-royal-950">المادة</h4>
              <div className="flex flex-wrap gap-2">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.value}
                    onClick={() => {
                      updateFilter('material', material === mat.value ? '' : mat.value);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      material === mat.value
                        ? 'bg-royal-950 text-gold-300'
                        : 'bg-royal-50 text-royal-800'
                    }`}
                  >
                    {mat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-royal-950">اللون</h4>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((col) => (
                  <button
                    key={col.value}
                    onClick={() => {
                      updateFilter('color', color === col.value ? '' : col.value);
                    }}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      color === col.value
                        ? 'border-gold-500 ring-2 ring-gold-300 scale-110'
                        : 'border-neutral-200'
                    }`}
                    style={{ backgroundColor: col.hex }}
                    title={col.label}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-royal-950">نطاق السعر</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="من"
                  value={minPrice}
                  onChange={(e) => updateFilter('minPrice', e.target.value)}
                  className="flex-1 px-4 py-3 bg-royal-50 border border-royal-200 rounded-xl"
                />
                <input
                  type="number"
                  placeholder="إلى"
                  value={maxPrice}
                  onChange={(e) => updateFilter('maxPrice', e.target.value)}
                  className="flex-1 px-4 py-3 bg-royal-50 border border-royal-200 rounded-xl"
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-4 bg-royal-950 text-gold-300 rounded-xl font-bold"
            >
              تطبيق الفلاتر
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
}