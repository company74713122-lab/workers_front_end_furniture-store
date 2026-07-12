import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar - ثابت على اليمين */}
        <Sidebar />
        
        {/* المحتوى الرئيسي */}
        <main className="flex-1 lg:mr-64 w-full">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}