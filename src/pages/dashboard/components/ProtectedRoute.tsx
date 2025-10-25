import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// TODO: Replace with actual MongoDB authentication check
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // TODO: Check MongoDB session/token
    // For now, check localStorage for demo purposes
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  return isAuthenticated;
};

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/access?p=login" replace />;
  }

  return <>{children}</>;
};
