import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/UI/ScrollToTop';
import Toast from './components/UI/Toast';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import ProductForm from './pages/admin/ProductForm';
import Categories from './pages/admin/Categories';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-cream-50">
              <Header />
              <main className="flex-1">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:slug" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/about" element={<About />} />

                  {/* Auth Routes */}
                  <Route path="/admin/login" element={<Login />} />

                  {/* Protected Admin Routes */}
                  <Route
                    path="/admin/dashboard"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <AdminProducts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/new"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <ProductForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/products/:id/edit"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <ProductForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/categories"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Categories />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect /admin to dashboard */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireAdmin={true}>
                        <Navigate to="/admin/dashboard" replace />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 */}
                  <Route
                    path="*"
                    element={
                      <div className="pt-20 text-center text-2xl min-h-[50vh] flex items-center justify-center">
                        404 - الصفحة غير موجودة
                      </div>
                    }
                  />
                </Routes>
              </main>
              <Footer />
              <Toast />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;