import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import {
  Package,
  Star,
  Tag,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  getProducts,
  getFeaturedProducts,
  getLatestProducts,
  getProductsOnOffer,
} from '../../services/product.service';
export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    featuredProducts: 0,
    newProducts: 0,
    onOfferProducts: 0,
    totalStock: 0,
    averagePrice: 0,
    categories: 0,
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [allProducts, featured, latest, offers] = await Promise.all([
        getProducts({ limit: 1000 }),
        getFeaturedProducts(10),
        getLatestProducts(10),
        getProductsOnOffer(10),
      ]);

      const products = allProducts.data.data;
      const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);
      const totalPrice = products.reduce((sum, p) => sum + (p.price || 0), 0);
      const averagePrice = products.length > 0 ? totalPrice / products.length : 0;
      const categories = [...new Set(products.map(p => p.category))].length;

      setStats({
        totalProducts: products.length,
        featuredProducts: featured.data.length,
        newProducts: latest.data.filter(p => p.isNew).length,
        onOfferProducts: offers.data.length,
        totalStock,
        averagePrice: Math.round(averagePrice),
        categories,
      });

      setRecentProducts(latest.data.slice(0, 5));
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('حدث خطأ أثناء تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'إجمالي المنتجات',
      value: stats.totalProducts,
      icon: Package,
      color: 'amber',
      link: '/admin/products',
    },
    {
      label: 'المنتجات المميزة',
      value: stats.featuredProducts,
      icon: Star,
      color: 'rose',
      link: '/admin/products',
    },
    {
      label: 'المنتجات الجديدة',
      value: stats.newProducts,
      icon: Tag,
      color: 'emerald',
      link: '/admin/products',
    },
    {
      label: 'المنتجات المعروضة',
      value: stats.onOfferProducts,
      icon: DollarSign,
      color: 'blue',
      link: '/admin/products',
    },
    {
      label: 'إجمالي المخزون',
      value: stats.totalStock,
      icon: Package,
      color: 'purple',
      link: '/admin/products',
    },
    {
      label: 'متوسط السعر',
      value: `LE ${stats.averagePrice.toLocaleString()}`,
      icon: DollarSign,
      color: 'amber',
      link: '/admin/products',
    },
    {
      label: 'عدد الفئات',
      value: stats.categories,
      icon: Tag,
      color: 'teal',
      link: '/admin/categories',
    },
  ];

  const colorClasses = {
    amber: 'bg-amber-100 text-amber-600',
    rose: 'bg-rose-100 text-rose-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    teal: 'bg-teal-100 text-teal-600',
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">جاري تحميل البيانات...</p>
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">حدث خطأ</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="px-6 py-3 bg-amber-600 text-white rounded-xl hover:bg-amber-700 transition-all"
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
      <div className="space-y-6 p-4 md:p-6 lg:p-8">
        {/* Header - محسّن للجوال */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-display text-gray-900 mb-2">
            لوحة التحكم
          </h1>
          <p className="text-gray-600 text-sm md:text-base">نظرة عامة على أداء متجرك</p>
        </div>

        {/* Stats Grid - محسّن للجوال */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {statCards.map((stat, index) => (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all group border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[stat.color]}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                {stat.value}
              </p>
            </Link>
          ))}
        </div>

        {/* Quick Actions - محسّن للجوال */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Link
            to="/admin/products/new"
            className="bg-gradient-to-br from-amber-500 to-amber-600 text-white p-6 rounded-2xl hover:shadow-xl transition-all"
          >
            <Package className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">إضافة منتج جديد</h3>
            <p className="text-sm text-white/80">أضف منتجاً جديداً للمتجر</p>
          </Link>

          <Link
            to="/admin/products"
            className="bg-gradient-to-br from-rose-500 to-rose-600 text-white p-6 rounded-2xl hover:shadow-xl transition-all"
          >
            <Package className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">إدارة المنتجات</h3>
            <p className="text-sm text-white/80">عرض وتعديل جميع المنتجات</p>
          </Link>

          <Link
            to="/admin/categories"
            className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl hover:shadow-xl transition-all"
          >
            <Tag className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-1">إدارة الفئات</h3>
            <p className="text-sm text-white/80">تنظيم المنتجات في فئات</p>
          </Link>
        </div>

        {/* Recent Products - محسّن للجوال */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold font-display text-gray-900">
              أحدث المنتجات المضافة
            </h2>
            <Link
              to="/admin/products?sort=-createdAt"
              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              عرض الكل ←
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap">
                    المنتج
                  </th>
                  <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 hidden sm:table-cell">
                    الفئة
                  </th>
                  <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                    السعر
                  </th>
                  <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600 hidden md:table-cell">
                    المخزون
                  </th>
                  <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-600">
                    الحالة
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500 text-sm md:text-base">
                      لا توجد منتجات حتى الآن
                    </td>
                  </tr>
                ) : (
                  recentProducts.map((product) => (
                    <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <div className="flex items-center gap-2 md:gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {product.primImg ? (
                              <img src={product.primImg} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-900 text-xs md:text-sm truncate">{product.name}</p>
                            <p className="text-xs text-gray-500 hidden md:block">SKU: {product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 hidden sm:table-cell">
                        <span className="px-2 md:px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium whitespace-nowrap">
                          {product.category}
                        </span>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <span className="font-semibold text-gray-900 text-xs md:text-sm">
                          LE {product.price.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4 hidden md:table-cell">
                        <span className={`font-semibold text-xs md:text-sm ${
                          product.stock > 20 ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 md:py-4 px-2 md:px-4">
                        <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                          product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {product.status === 'active' ? 'نشط' : 'غير نشط'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}