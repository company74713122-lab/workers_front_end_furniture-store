import { createContext, useState, useEffect, useCallback } from 'react';
import { getCart, saveCart } from '../utils/localStorage';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);

  // تحميل السلة من localStorage عند البدء
  useEffect(() => {
    setCart(getCart());
  }, []);

  // حفظ السلة في localStorage عند كل تغيير
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // إضافة منتج للسلة
  const addToCart = useCallback((product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item._id === product._id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [
        ...prevCart,
        {
          _id: product._id,
          name: product.name,
          slug: product.slug,
          price: product.offerPrice || product.price,
          originalPrice: product.price,
          primImg: product.primImg || product.images[0]?.url,
          category: product.category,
          material: product.material,
          color: product.color,
          quantity,
        },
      ];
    });

    showToast(`تمت إضافة "${product.name}" للسلة`, 'success');
  }, []);

  // تحديث كمية منتج
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  // حذف منتج من السلة
  const removeFromCart = useCallback((productId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== productId));
    showToast('تم حذف المنتج من السلة', 'info');
  }, []);

  // إفراغ السلة
  const clearCart = useCallback(() => {
    setCart([]);
    showToast('تم إفراغ السلة', 'info');
  }, []);

  // حساب المجموع
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // إظهار إشعار
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        toast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}