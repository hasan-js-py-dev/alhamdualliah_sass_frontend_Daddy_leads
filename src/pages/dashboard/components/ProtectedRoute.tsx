import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf8f0' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#14F195] via-[#00D4FF] to-[#9945FF] flex items-center justify-center text-white font-bold text-2xl shadow-lg mx-auto mb-4 animate-pulse">
            DL
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/access?p=login" replace />;
  }

  return <>{children}</>;
};
