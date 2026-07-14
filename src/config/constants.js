// ✅ رقم واتساب المتجر - غيّره إلى رقمك الحقيقي
export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '201010127090';

// ✅ معلومات المتجر
export const STORE_INFO = {
  name: 'Amir',
  tagline: 'أثاث منزلي فاخر',
  description: 'معرض متخصص في الأثاث المنزلي الراقي - نقدم لك أفضل القطع المصنوعة بعناية لتناسب ذوقك الرفيع',
  email: 'info@Amir.com',
  phone: '+20 10 10127090',
  address:"مصر , دمياط",
  whatsapp: '+20 10 10127090',
};

// ✅ الفئات - محدثة للأثاث المنزلي
export const CATEGORIES = [
  { value: 'Living Room', label: 'غرفة المعيشة', icon: '🛋️' },
  { value: 'Bedroom', label: 'غرفة النوم', icon: '🛏️' },
  { value: 'Dining Room', label: 'غرفة الطعام', icon: '🍽️' },
  { value: 'Kitchen', label: 'المطبخ', icon: '🍳' },
  { value: 'Office', label: 'المكتب', icon: '💼' },
  { value: 'Outdoor', label: 'الخارجية', icon: '🌳' },
  { value: 'Storage', label: 'التخزين', icon: '📦' },
  { value: 'Bathroom', label: 'الحمام', icon: '🚿' },
];

// ✅ المواد
export const MATERIALS = [
  { value: 'Wood', label: 'خشب' },
  { value: 'Metal', label: 'معدن' },
  { value: 'Glass', label: 'زجاج' },
  { value: 'Leather', label: 'جلد' },
  { value: 'Fabric', label: 'قماش' },
  { value: 'Plastic', label: 'بلاستيك' },
  { value: 'Marble', label: 'رخام' },
  { value: 'MDF', label: 'MDF' },
  { value: 'Upholstered', label: 'منجد' },
  { value: 'Rattan', label: 'اخري لا يظهر اسم المادة للسمتخدم' },
];

// ✅ الأحجام
export const SIZES = [
  { value: 'Small', label: 'صغير' },
  { value: 'Medium', label: 'متوسط' },
  { value: 'Large', label: 'كبير' },
  { value: 'Extra Large', label: 'كبير جداً' },
  { value: 'Custom', label: 'مخصص' },
];

// ✅ الألوان
export const COLORS = [
  { value: 'White', label: 'أبيض', hex: '#FFFFFF' },
  { value: 'Black', label: 'أسود', hex: '#000000' },
  { value: 'Brown', label: 'بني', hex: '#8B4513' },
  { value: 'Natural Wood', label: 'خشب طبيعي', hex: '#DEB887' },
  { value: 'Gray', label: 'رمادي', hex: '#808080' },
  { value: 'Beige', label: 'بيج', hex: '#F5F5DC' },
  { value: 'Oak', label: 'بلوط', hex: '#C19A6B' },
  { value: 'Cream', label: 'كريمي', hex: '#FFFDD0' },
  { value: 'Navy', label: 'كحلي', hex: '#000080' },
  { value: 'Walnut', label: 'اخري لا يظهر اسم اللون للسمتخدم', hex: '#5C4033' },
];

// ✅ الحالة
export const STATUS = [
  { value: 'active', label: 'نشط' },
  { value: 'inactive', label: 'غير نشط' },
  { value: 'out_of_stock', label: 'نفذ من المخزون' },
];

// ✅ روابط التواصل الاجتماعي
export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/Amir',
  instagram: 'https://instagram.com/Amir',
  twitter: 'https://twitter.com/Amir',
  whatsapp: 'https://wa.me/201012345678',
};

// ✅ Helper functions
export const getCategoryLabel = (value) => {
  const category = CATEGORIES.find(c => c.value === value);
  return category ? category.label : value;
};

export const getCategoryIcon = (value) => {
  const category = CATEGORIES.find(c => c.value === value);
  return category ? category.icon : '🪑';
};

export const getMaterialLabel = (value) => {
  const material = MATERIALS.find(m => m.value === value);
  return material ? material.label : value;
};

export const getColorHex = (value) => {
  const color = COLORS.find(c => c.value === value);
  return color ? color.hex : '#000000';
};

export const getSizeLabel = (value) => {
  const size = SIZES.find(s => s.value === value);
  return size ? size.label : value;
};