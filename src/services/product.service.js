import api from '../config/axios';

/* ═══════════════════════════════════════════════════════════
   CRUD OPERATIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * جلب جميع المنتجات مع الفلاتر والـ pagination
 * @param {Object} params - { page, limit, category, material, color, size, status, sort, search, isFeatured, isNew }
 */
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

/**
 * جلب منتج واحد بالـ ID
 * @param {string} id - MongoDB ObjectId
 */
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

/**
 * جلب منتج بالـ slug
 * @param {string} slug - Product slug
 */
export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/slug/${slug}`);
  return response.data;
};

/**
 * إنشاء منتج جديد
 * @param {FormData} formData - Product data with images
 */
export const createProduct = async (formData) => {
  const response = await api.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * تحديث منتج موجود
 * @param {string} id - Product ID
 * @param {FormData} formData - Updated product data
 */
export const updateProduct = async (id, formData) => {
  const response = await api.put(`/products/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

/**
 * حذف منتج نهائياً
 * @param {string} id - Product ID
 */
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

/* ═══════════════════════════════════════════════════════════
   PUBLIC PAGES ENDPOINTS
   ═══════════════════════════════════════════════════════════ */

/**
 * جلب بيانات الصفحة الرئيسية
 * Returns: { categories, featured, latest, mostViewed, offers }
 */
export const getHomePageData = async () => {
  const response = await api.get('/products/home');
  return response.data;
};

/**
 * جلب المنتجات المميزة
 * @param {number} limit - عدد المنتجات (افتراضي 10)
 */
export const getFeaturedProducts = async (limit = 10) => {
  const response = await api.get(`/products/featured?limit=${limit}`);
  return response.data;
};

/**
 * جلب أحدث المنتجات
 * @param {number} limit - عدد المنتجات (افتراضي 10)
 */
export const getLatestProducts = async (limit = 10) => {
  const response = await api.get(`/products/latest?limit=${limit}`);
  return response.data;
};

/**
 * جلب المنتجات المعروضة (لها خصم)
 * @param {number} limit - عدد المنتجات (افتراضي 10)
 */
export const getProductsOnOffer = async (limit = 10) => {
  const response = await api.get(`/products/offers?limit=${limit}`);
  return response.data;
};

/**
 * جلب المنتجات الأكثر مشاهدة
 * @param {number} limit - عدد المنتجات (افتراضي 10)
 */
export const getMostViewedProducts = async (limit = 10) => {
  const response = await api.get(`/products/most-viewed?limit=${limit}`);
  return response.data;
};

/* ═══════════════════════════════════════════════════════════
   FILTERING & SEARCH
   ═══════════════════════════════════════════════════════════ */

/**
 * جلب المنتجات حسب الفئة
 * @param {string} category - اسم الفئة (Frames, Wall Art, Art Prints, Decor)
 * @param {Object} params - فلاتر إضافية { page, limit, minPrice, maxPrice, material, ... }
 */
export const getProductsByCategory = async (category, params = {}) => {
  const response = await api.get(`/products/category/${category}`, { params });
  return response.data;
};

/**
 * البحث المتقدم في المنتجات
 * @param {Object} params - { category, material, color, size, status, tags, minPrice, maxPrice, minStock, maxStock, isFeatured, isNew, search, page, limit }
 */
export const searchProducts = async (params = {}) => {
  const response = await api.get('/products/search', { params });
  return response.data;
};

/* ═══════════════════════════════════════════════════════════
   INTERACTIONS
   ═══════════════════════════════════════════════════════════ */

/**
 * زيادة عدد المشاهدات لمنتج
 * @param {string} id - Product ID
 */
export const incrementViewCount = async (id) => {
  const response = await api.post(`/products/${id}/view`);
  return response.data;
};