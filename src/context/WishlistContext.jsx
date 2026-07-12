import { createContext, useState, useEffect, useCallback } from 'react';
import { getWishlist, saveWishlist } from '../utils/localStorage';

export const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState(null);

  // تحميل المفضلة من localStorage عند البدء
  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  // حفظ المفضلة في localStorage عند كل تغيير
  useEffect(() => {
    saveWishlist(wishlist);
  }, [wishlist]);

  // إضافة/إزالة منتج من المفضلة
  const toggleWishlist = useCallback((product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.some(item => item._id === product._id);
      
      if (exists) {
        showToast(`تمت إزالة "${product.name}" من المفضلة`, 'info');
        return prevWishlist.filter(item => item._id !== product._id);
      } else {
        showToast(`تمت إضافة "${product.name}" للمفضلة`, 'success');
        return [
          ...prevWishlist,
          {
            _id: product._id,
            name: product.name,
            slug: product.slug,
            price: product.offerPrice || product.price,
            primImg: product.primImg || product.images[0]?.url,
            category: product.category,
          },
        ];
      }
    });
  }, []);

  // إزالة منتج من المفضلة
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item._id !== productId));
    showToast('تم حذف المنتج من المفضلة', 'info');
  }, []);

  // إفراغ المفضلة
  const clearWishlist = useCallback(() => {
    setWishlist([]);
    showToast('تم إفراغ المفضلة', 'info');
  }, []);

  // التحقق من وجود منتج في المفضلة
  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item._id === productId);
  }, [wishlist]);

  // إظهار إشعار
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        toast,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}