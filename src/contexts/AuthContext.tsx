import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, VerifyResponse } from '@/services/authService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  credits?: {
    leadsFinderCredits: number;
    dataScraperCredits: number;
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const verifySession = async () => {
    const token = authService.getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const result: VerifyResponse = await authService.verify();
    if (result.success && result.data?.user) {
      setUser(result.data.user);
    } else {
      localStorage.removeItem('authToken');
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    if (result.success && result.data?.user) {
      setUser(result.data.user);
      return { success: true };
    }
    return { success: false, message: result.message };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    await verifySession();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
