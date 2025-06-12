
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  role: 'مدير المخزن' | 'عضو فريق';
  storeroom: string;
  committee?: string;
  team?: string;
}

interface AuthContextType {
  user: User | null;
  userRole: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    const storedUser = localStorage.getItem('inventory_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    setIsLoading(true);
    
    // Demo users for testing
    const demoUsers: User[] = [
      {
        email: 'manager@inventory.com',
        name: 'أحمد محمد',
        role: 'مدير المخزن',
        storeroom: 'STR001'
      },
      {
        email: 'team@inventory.com',
        name: 'فاطمة أحمد',
        role: 'عضو فريق',
        storeroom: 'STR001',
        committee: 'عيني',
        team: 'عيني'
      }
    ];

    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('inventory_user', JSON.stringify(foundUser));
    } else {
      throw new Error('بيانات تسجيل الدخول غير صحيحة');
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inventory_user');
  };

  const value = {
    user,
    userRole: user?.role || null,
    login,
    logout,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
