'use client'

import * as React from 'react';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('adminUser');
      const cookieUser = Cookies.get('adminUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else if (cookieUser) {
        setUser(JSON.parse(cookieUser));
        localStorage.setItem('adminUser', cookieUser);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        return false;
      }

      const adminUser = await response.json();
      setUser(adminUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem("adminUser", JSON.stringify(adminUser));
        Cookies.set("adminUser", JSON.stringify(adminUser), { 
          expires: 7, // 7 days
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
      }
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminUser');
      Cookies.remove('adminUser');
    }
    router.push('/auth/signin');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
