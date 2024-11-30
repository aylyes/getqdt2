import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useAuth as useAuthHook } from '../hooks/useAuth';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const { login: loginMutation } = useAuthHook();

  useEffect(() => {
    const authCookie = Cookies.get('isAuthenticated');
    const userCookie = Cookies.get('user');
    if (authCookie === 'true' && userCookie) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userData = await loginMutation.mutateAsync({ email, password });
      setIsAuthenticated(true);
      setUser(userData);
      Cookies.set('isAuthenticated', 'true', { expires: 7 });
      Cookies.set('user', JSON.stringify(userData), { expires: 7 });
    } catch (error) {
      console.error('Login failed:', error instanceof Error ? error.message : 'Unknown error');
      throw error;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove('isAuthenticated');
    Cookies.remove('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}