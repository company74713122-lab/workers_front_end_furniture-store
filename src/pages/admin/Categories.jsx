import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import { Tag, Package, AlertCircle } from 'lucide-react';
import { getProducts } from '../../services/product.service';
import { CATEGORIES } from '../../config/constants';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getProducts({ limit: 1000 });

      if (response.success) {
        const products = response.data.data;

        const categoriesWithCount = CATEGORIES.map((cat) => {
          const categoryProducts = products.filter(
            (p) => p.category === cat.value
          );
          const count = categoryProducts.length;
          const totalStock = categoryProducts.reduce(
            (sum, p) => sum + (p.stock || 0),
            0
          );
          const avgPrice =
            count > 0
              ? categoryProducts.reduce((sum, p) => sum + p.price, 0) / count
              : 0;

          return {
            ...cat,
            count,
            totalStock,
            avgPrice: Math.round(avgPrice),
          };
        });

        setCategories(categoriesWithCount);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('حدث خطأ أثناء تحميل الفئات');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-wood-200 border-t-wood-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-charcoal/60">جاري التحميل...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-charcoal mb-2">حدث خطأ</h2>
            <p className="text-charcoal/60 mb-4">{error}</p>
            <button
              onClick={fetchCategories}
              className="px-6 py-3 bg-wood-700 text-white rounded-xl hover:bg-wood-800"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-charcoal mb-2">
            إدارة الفئات
          </h1>
          <p className="text-charcoal/60">
            {categories.length} فئة متاحة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.value}
              className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-wood-100 rounded-xl flex items-center justify-center text-2xl">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-charcoal">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-charcoal/60">{cat.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-wood-700">{cat.count}</p>
                  <p className="text-xs text-charcoal/60">منتج</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-wood-100">
                <div>
                  <p className="text-xs text-charcoal/60 mb-1">إجمالي المخزون</p>
                  <p className="font-semibold text-charcoal">{cat.totalStock}</p>
                </div>
                <div>
                  <p className="text-xs text-charcoal/60 mb-1">متوسط السعر</p>
                  <p className="font-semibold text-charcoal">
                    LE {cat.avgPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <a
                href={`/admin/products?category=${cat.value}`}
                className="mt-4 flex items-center justify-center gap-2 w-full py-3 bg-wood-50 text-wood-700 rounded-xl hover:bg-wood-100 transition-all font-medium"
              >
                <Package className="w-4 h-4" />
                عرض المنتجات
              </a>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}