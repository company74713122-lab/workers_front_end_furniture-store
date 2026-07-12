import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tag,
  TrendingUp,
  LogOut,
  X,
  Menu,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const { logout, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'الرئيسية' },
    { path: '/admin/products', icon: Package, label: 'المنتجات' },
    { path: '/admin/categories', icon: Tag, label: 'الفئات' },
    // { path: '/admin/analytics', icon: TrendingUp, label: 'التقارير' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button - يظهر فقط على الجوال */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar - ثابت على اليمين */}
      <aside
        className={`
          fixed top-0 right-0 h-full bg-white shadow-xl transition-transform duration-300 z-50
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0 lg:fixed lg:right-0 lg:top-0 lg:h-screen lg:w-64 w-72        `}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Logo & User Info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl font-display">A</span>
            </div>
            <div>
              <h2 className="font-bold text-gray-900 font-display">ALFEIN</h2>
              <p className="text-xs text-gray-500">لوحة التحكم</p>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">
                {user?.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-sm">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}