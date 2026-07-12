const CART_KEY = 'alfein_cart';
const WISHLIST_KEY = 'alfein_wishlist';

// Cart Functions
export const getCart = () => {
  try {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const clearCart = () => {
  try {
    localStorage.removeItem(CART_KEY);
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

// Wishlist Functions
export const getWishlist = () => {
  try {
    const wishlist = localStorage.getItem(WISHLIST_KEY);
    return wishlist ? JSON.parse(wishlist) : [];
  } catch {
    return [];
  }
};

export const saveWishlist = (wishlist) => {
  try {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

export const clearWishlist = () => {
  try {
    localStorage.removeItem(WISHLIST_KEY);
  } catch (error) {
    console.error('Error clearing wishlist:', error);
  }
};