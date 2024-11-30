import { useMutation } from 'react-query';
import apiClient from '../api/client';

interface LoginCredentials {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
}

// Mock user for development
const mockUser = {
  id: '1',
  email: 'admin@getqdt.com',
  name: 'Test User'
};

export function useAuth() {
  const login = useMutation<User, Error, LoginCredentials>(
    async (credentials) => {
      try {
        // In development, use mock data
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          
          if (credentials.email === mockUser.email && credentials.password === 'test432FFEZ5423') {
            return mockUser;
          }
          throw new Error('Invalid email or password');
        }

        // Production API call
        const { data } = await apiClient.post<User>('/auth/login', credentials);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('An unexpected error occurred during login');
      }
    }
  );

  const register = useMutation<User, Error, LoginCredentials & { name?: string }>(
    async (userData) => {
      try {
        // In development, use mock data
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
          return { ...mockUser, ...userData };
        }

        const { data } = await apiClient.post<User>('/auth/register', userData);
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }
        throw new Error('An unexpected error occurred during registration');
      }
    }
  );

  return {
    login,
    register,
  };
}