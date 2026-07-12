import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon';
import WishlistIcon from '../Wishlist/WishlistIcon';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { path: '/', label: 'الرئيسية' },
    { path: '/products', label: 'المنتجات' },
    { path: '/products?category=Living Room', label: 'غرفة المعيشة' },
    { path: '/products?category=Bedroom', label: 'غرفة النوم' },
    { path: '/about', label: 'من نحن' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-royal-950 via-burgundy-900 to-royal-950 text-gold-300 text-xs py-2.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
              +20 101 234 5678
            </span>
            <span className="text-gold-400/60">|</span>
            <span>info@alfein.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✨</span>
            <span>توصيل مجاني للطلبات فوق 5,000 جنيه</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-royal border-b border-gold-100'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 via-gold-600 to-burgundy-800 rounded-2xl flex items-center justify-center shadow-gold group-hover:shadow-glow transition-all duration-500 group-hover:scale-105">
                  <span className="text-royal-950 font-bold text-2xl font-display">A</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-br from-gold-400 to-burgundy-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500 -z-10" />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold font-display text-royal-950 tracking-tight">
                  ALFEIN
                </span>
                <p className="text-[10px] text-gold-700 font-medium tracking-widest -mt-1">
                  ROYAL FURNITURE
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg group ${
                      isActive
                        ? 'text-gold-700'
                        : 'text-royal-800 hover:text-gold-700'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute bottom-0 right-1/2 translate-x-1/2 h-0.5 bg-gradient-to-r from-gold-500 to-burgundy-600 transition-all duration-300 rounded-full ${
                        isActive ? 'w-8' : 'w-0 group-hover:w-8'
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold-600 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button className="md:hidden p-2.5 hover:bg-gold-50 rounded-full transition-all">
                <Search className="w-5 h-5 text-royal-800" />
              </button>
              
              <WishlistIcon />
              <CartIcon />

              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="hidden sm:flex items-center gap-2 p-1.5 hover:bg-gold-50 rounded-full transition-all"
                  title="لوحة التحكم"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-gold-500 to-burgundy-800 rounded-full flex items-center justify-center shadow-gold">
                    <span className="text-royal-950 text-sm font-bold">
                      {user?.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </Link>
              )}

              <button
                className="lg:hidden p-2.5 hover:bg-gold-50 rounded-full transition-all"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-royal-950" />
                ) : (
                  <Menu className="w-6 h-6 text-royal-950" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden animate-slide-down">
          <div className="flex flex-col h-full pt-24 px-6 pb-8">
            {/* Mobile Search */}
            <div className="mb-6">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث عن منتج..."
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
                <button
                  type="submit"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            <nav className="flex-1 space-y-1">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="flex items-center justify-between py-4 px-4 text-lg font-medium text-royal-950 hover:bg-gold-50 rounded-xl transition-all border-b border-gold-100"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <span>{link.label}</span>
                  <span className="text-gold-600">←</span>
                </Link>
              ))}
            </nav>

            {isAuthenticated && isAdmin && (
              <div className="border-t border-gold-200 pt-6 space-y-3">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-royal-950 to-burgundy-900 text-gold-300 rounded-xl font-bold"
                >
                  ⚙️ لوحة التحكم
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}