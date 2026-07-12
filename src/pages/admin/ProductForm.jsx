import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/Admin/AdminLayout';
import { Save, Upload, X, RefreshCw } from 'lucide-react';
import api from '../../config/axios';
import { CATEGORIES, MATERIALS, COLORS, SIZES } from '../../config/constants';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: '',
    hasOffer: false,
    stock: '',
    sku: '',
    material: '',
    color: '',
    size: '',
    dimensions: {
      width: '',
      height: '',
      depth: '',
      unit: 'cm',
    },
    weight: '',
    tags: '',
    status: 'active',
    isFeatured: false,
    isNew: false,
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // توليد SKU تلقائياً
  const generateSKU = () => {
    const categoryPrefix = formData.category ? formData.category.substring(0, 3).toUpperCase() : 'PRD';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${categoryPrefix}-${timestamp}${random}`;
  };

  useEffect(() => {
    if (isEdit) {
      fetchProduct();
    } else {
      setFormData(prev => ({ ...prev, sku: generateSKU() }));
    }
  }, [id]);

  useEffect(() => {
    if (!isEdit && formData.category) {
      setFormData(prev => ({ ...prev, sku: generateSKU() }));
    }
  }, [formData.category]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      if (response.data.success) {
        const product = response.data.data;
        setFormData({
          name: product.name || '',
          description: product.description || '',
          category: product.category || '',
          price: product.price || '',
          offerPrice: product.offerPrice || '',
          hasOffer: !!product.offerPrice,
          stock: product.stock || '',
          sku: product.sku || '',
          material: product.material || '',
          color: product.color || '',
          size: product.size || '',
          dimensions: product.dimensions || { width: '', height: '', depth: '', unit: 'cm' },
          weight: product.weight || '',
          tags: Array.isArray(product.tags) ? product.tags.join(',') : '',
          status: product.status || 'active',
          isFeatured: product.isFeatured || false,
          isNew: product.isNew || false,
        });
        setExistingImages(product.images || []);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('حدث خطأ أثناء جلب بيانات المنتج');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages].slice(0, 5));
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('sku', formData.sku);
      formDataToSend.append('material', formData.material);
      formDataToSend.append('color', formData.color);
      formDataToSend.append('status', formData.status);
      
      if (formData.size) formDataToSend.append('size', formData.size);
      if (formData.tags) formDataToSend.append('tags', formData.tags);
  
      formDataToSend.append('price', String(Number(formData.price)));
      formDataToSend.append('stock', String(Number(formData.stock)));
      
      if (formData.weight) {
        formDataToSend.append('weight', String(Number(formData.weight)));
      }
  
      if (formData.hasOffer && formData.offerPrice) {
        formDataToSend.append('offerPrice', String(Number(formData.offerPrice)));
      }
  
      formDataToSend.append('isFeatured', String(formData.isFeatured));
      formDataToSend.append('isNew', String(formData.isNew));
  
      const dimensionsObj = {
        width: Number(formData.dimensions.width) || 0,
        height: Number(formData.dimensions.height) || 0,
        depth: Number(formData.dimensions.depth) || 0,
        unit: formData.dimensions.unit || "cm"
      };
      formDataToSend.append('dimensions', JSON.stringify(dimensionsObj));
  
      images.forEach((img) => {
        formDataToSend.append('images', img.file);
      });
  
      let response;
      if (isEdit) {
        response = await api.put(`/products/${id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        response = await api.post('/products', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
  
      if (response.data.success) {
        alert(isEdit ? 'تم تحديث المنتج بنجاح' : 'تم إضافة المنتج بنجاح');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMsg = error.response?.data?.errors 
        ? error.response.data.errors.map(e => `${e.field}: ${e.message}`).join('\n')
        : error.response?.data?.message || 'حدث خطأ أثناء الحفظ';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* ✅ إضافة padding و overflow للمحتوى */}
      <div className="space-y-4 md:space-y-6 p-3 md:p-6">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold font-display text-gray-900 mb-2">
            {isEdit ? 'تعديل المنتج' : 'إضافة منتج جديد'}
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {isEdit ? 'تعديل بيانات المنتج' : 'إضافة منتج جديد للمتجر'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* ✅ Grid محسّن للجوال - عمود واحد على الجوال، عمودين على الديسكتوب */}
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            
            {/* المعلومات الأساسية */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold font-display text-gray-900 mb-4 md:mb-6">
                المعلومات الأساسية
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    اسم المنتج *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm md:text-base"
                    placeholder="أدخل اسم المنتج"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    الوصف *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none text-sm md:text-base"
                    placeholder="أدخل وصف المنتج"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      الفئة *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                    >
                      <option value="">اختر الفئة</option>
                      {CATEGORIES.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      SKU (تلقائي)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        readOnly
                        className="flex-1 px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none text-xs md:text-sm"
                      />
                      {!isEdit && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, sku: generateSKU() }))}
                          className="p-2 md:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg md:rounded-xl transition-all"
                          title="إعادة توليد"
                        >
                          <RefreshCw className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* التسعير والمخزون */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold font-display text-gray-900 mb-4 md:mb-6">
                التسعير والمخزون
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    السعر *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                    placeholder="1500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 md:gap-3 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      name="hasOffer"
                      checked={formData.hasOffer}
                      onChange={handleChange}
                      className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-xs md:text-sm font-semibold text-gray-700">تفعيل سعر العرض (خصم)</span>
                  </label>
                  {formData.hasOffer && (
                    <input
                      type="number"
                      name="offerPrice"
                      value={formData.offerPrice}
                      onChange={handleChange}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-red-50 border border-red-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
                      placeholder="1200"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      المخزون *
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                      placeholder="50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      الوزن (كجم)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      step="0.1"
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                      placeholder="0.5"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* المواصفات */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold font-display text-gray-900 mb-4 md:mb-6">
                المواصفات
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      المادة *
                    </label>
                    <select
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                    >
                      <option value="">اختر المادة</option>
                      {MATERIALS.map((mat) => (
                        <option key={mat.value} value={mat.value}>
                          {mat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                      اللون *
                    </label>
                    <select
                      name="color"
                      value={formData.color}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                    >
                      <option value="">اختر اللون</option>
                      {COLORS.map((col) => (
                        <option key={col.value} value={col.value}>
                          {col.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    الحجم
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                  >
                    <option value="">اختر الحجم</option>
                    {SIZES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    الأبعاد
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <input
                      type="number"
                      name="dimensions.width"
                      value={formData.dimensions.width}
                      onChange={handleChange}
                      placeholder="العرض"
                      className="px-2 md:px-3 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs md:text-sm"
                    />
                    <input
                      type="number"
                      name="dimensions.height"
                      value={formData.dimensions.height}
                      onChange={handleChange}
                      placeholder="الارتفاع"
                      className="px-2 md:px-3 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs md:text-sm"
                    />
                    <input
                      type="number"
                      name="dimensions.depth"
                      value={formData.dimensions.depth}
                      onChange={handleChange}
                      placeholder="العمق"
                      className="px-2 md:px-3 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs md:text-sm"
                    />
                    <select
                      name="dimensions.unit"
                      value={formData.dimensions.unit}
                      onChange={handleChange}
                      className="px-2 md:px-3 py-2 md:py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs md:text-sm"
                    >
                      <option value="cm">سم</option>
                      <option value="inch">إنش</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    الوسوم
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                    placeholder="Modern,Handmade (مفصولة بفاصلة)"
                  />
                </div>
              </div>
            </div>

            {/* الصور */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold font-display text-gray-900 mb-4 md:mb-6">
                الصور
              </h2>

              <div className="space-y-3 md:space-y-4">
                {existingImages.length > 0 && (
                  <div>
                    <p className="text-xs md:text-sm text-gray-600 mb-2">الصور الحالية:</p>
                    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4">
                      {existingImages.map((img, index) => (
                        <div key={index} className="relative aspect-square rounded-lg md:rounded-xl overflow-hidden group">
                          <img
                            src={img.url}
                            alt={`Existing ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(index)}
                            className="absolute top-1 right-1 md:top-2 md:right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg md:rounded-xl overflow-hidden group">
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 md:top-2 md:right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 md:w-4 md:h-4" />
                      </button>
                    </div>
                  ))}
                  {images.length < 5 && (
                    <label className="aspect-square rounded-lg md:rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 transition-colors p-2 md:p-4">
                      <Upload className="w-6 h-6 md:w-8 md:h-8 text-gray-400 mb-1 md:mb-2" />
                      <span className="text-xs md:text-sm text-gray-600 text-center">إضافة صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-xs text-gray-500">
                  يمكنك رفع حتى 5 صور. الصورة الأولى ستكون الصورة الرئيسية.
                </p>
              </div>
            </div>

            {/* الخيارات */}
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
              <h2 className="text-lg md:text-xl font-bold font-display text-gray-900 mb-4 md:mb-6">
                الخيارات
              </h2>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">
                    الحالة
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm md:text-base"
                  >
                    <option value="active">نشط</option>
                    <option value="inactive">غير نشط</option>
                    <option value="out_of_stock">نفذ من المخزون</option>
                  </select>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <label className="flex items-center gap-2 md:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleChange}
                      className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-xs md:text-sm font-semibold text-gray-700">منتج مميز</span>
                  </label>

                  <label className="flex items-center gap-2 md:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleChange}
                      className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="text-xs md:text-sm font-semibold text-gray-700">منتج جديد</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button - ثابت في الأسفل */}
          <div className="sticky bottom-0 bg-white p-3 md:p-4 border-t border-gray-200 flex items-center justify-end gap-2 md:gap-4 z-10">
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="px-4 md:px-6 py-2.5 md:py-3 bg-gray-100 text-gray-700 rounded-lg md:rounded-xl hover:bg-gray-200 transition-all font-semibold text-sm md:text-base"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-1.5 md:gap-2 px-4 md:px-8 py-2.5 md:py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg md:rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg disabled:opacity-50 font-semibold text-sm md:text-base flex-1 md:flex-none justify-center"
            >
              <Save className="w-4 h-4 md:w-5 md:h-5" />
              {loading ? 'جاري الحفظ...' : isEdit ? 'تحديث المنتج' : 'إضافة المنتج'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}