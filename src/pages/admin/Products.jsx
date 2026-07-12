import { useState, useEffect } from 'react';
import AdminLayout from '../../components/Admin/AdminLayout';
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Package,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/product.service';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, categoryFilter, statusFilter]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = {
        page: currentPage,
        limit: 10,
      };
      
      if (categoryFilter) params.category = categoryFilter;
      if (statusFilter) params.status = statusFilter;
      if (searchTerm) params.search = searchTerm;

      const response = await getProducts(params);
      
      if (response.success) {
        setProducts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalCount(response.data.pagination.totalCount);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('حدث خطأ أثناء جلب المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا المنتج؟ لا يمكن التراجع عن هذه العملية.')) return;

    try {
      const response = await deleteProduct(id);
      if (response.success) {
        alert('تم حذف المنتج بنجاح');
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert(err.response?.data?.message || 'حدث خطأ أثناء الحذف');
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-display text-charcoal mb-2">
              إدارة المنتجات
            </h1>
            <p className="text-charcoal/60">
              {totalCount} منتج متاح
            </p>
          </div>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-6 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-all shadow-lg"
          >
            <Plus className="w-5 h-5" />
            إضافة منتج جديد
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-soft">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
              <input
                type="text"
                placeholder="ابحث عن منتج..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pr-12 pl-4 py-3 bg-sage-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-sage-500 transition-all"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 bg-sage-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-sage-500 transition-all"
            >
              <option value="">جميع الفئات</option>
              <option value="Frames">الإطارات</option>
              <option value="Wall Art">لوحات الحائط</option>
              <option value="Art Prints">مطبوعات فنية</option>
              <option value="Decor">ديكور</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 bg-sage-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-sage-500 transition-all"
            >
              <option value="">جميع الحالات</option>
              <option value="active">نشط</option>
              <option value="inactive">غير نشط</option>
              <option value="out_of_stock">نفذ من المخزون</option>
            </select>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-all"
            >
              بحث
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-sage-200 border-t-sage-600 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-charcoal/60">جاري التحميل...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-charcoal/60 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="px-6 py-3 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-all"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-sage-50">
                    <tr>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-charcoal">
                        المنتج
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-charcoal">
                        الفئة
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-charcoal">
                        السعر
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-charcoal">
                        المخزون
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-charcoal">
                        الحالة
                      </th>
                      <th className="text-right py-4 px-6 text-sm font-semibold text-charcoal">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-b border-sage-50 hover:bg-sage-50/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-sage-100 rounded-lg overflow-hidden">
                              {product.primImg ? (
                                <img src={product.primImg} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Package className="w-6 h-6 text-sage-600" />
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-charcoal">{product.name}</p>
                              <p className="text-xs text-charcoal/60">SKU: {product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-xs font-medium">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <span className="font-semibold text-charcoal">
                              LE {product.price.toLocaleString()}
                            </span>
                            {product.offerPrice && (
                              <p className="text-xs text-green-600">
                                عرض: LE {product.offerPrice.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`font-semibold ${
                            product.stock > 20 ? 'text-green-600' : product.stock > 0 ? 'text-orange-600' : 'text-red-600'
                          }`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            product.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : product.status === 'out_of_stock'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {product.status === 'active' ? 'نشط' : product.status === 'out_of_stock' ? 'نفذ' : 'غير نشط'}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <Link
                              to={`/products/${product.slug}`}
                              className="p-2 hover:bg-sage-100 rounded-lg transition-colors"
                              title="عرض"
                            >
                              <Eye className="w-4 h-4 text-charcoal" />
                            </Link>
                            <Link
                              to={`/admin/products/${product._id}/edit`}
                              className="p-2 hover:bg-sage-100 rounded-lg transition-colors"
                              title="تعديل"
                            >
                              <Edit2 className="w-4 h-4 text-sage-600" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between p-6 border-t border-sage-100">
                <p className="text-sm text-charcoal/60">
                  صفحة {currentPage} من {totalPages} ({totalCount} منتج)
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-sage-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-2 hover:bg-sage-100 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}