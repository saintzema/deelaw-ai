import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SignupData, User, Tokens } from '../types/auth';
import { authApi } from '../services/api';

interface AuthContextType {
  user: User | null;
  tokens: Tokens;
  isEmailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  updateTokens: (newTokens: Partial<Tokens>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper functions for localStorage
const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      return JSON.parse(storedUser);
    } catch (error) {
      console.error('Failed to parse user from localStorage:', error);
      return null;
    }
  }
  return null;
};

const getStoredTokens = (): Tokens => {
  const storedTokens = localStorage.getItem('tokens');
  if (storedTokens) {
    try {
      return JSON.parse(storedTokens);
    } catch (error) {
      console.error('Failed to parse tokens from localStorage:', error);
      return {
        words: 0,
        images: 0,
        minutes: 0,
        characters: 0
      };
    }
  }
  return {
    words: 0,
    images: 0,
    minutes: 0,
    characters: 0
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [tokens, setTokens] = useState<Tokens>(getStoredTokens());
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Use useCallback for memoization of async functions
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const userData = await authApi.validateToken();
        setUser(userData);
        setTokens(userData.tokens);
        setIsEmailVerified(userData.isEmailVerified);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('tokens', JSON.stringify(userData.tokens));
      } catch (error) {
        console.error('Authentication check failed:', error);
        logout(); // Call logout to clear state and localStorage
      }
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token } = await authApi.login(email, password);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('tokens', JSON.stringify(userData.tokens));
      setUser(userData);
      setTokens(userData.tokens);
      setIsEmailVerified(userData.isEmailVerified);
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Login failed. Please check your credentials.');
      throw error;
    }
    
  };

  const signup = async (data: SignupData) => {
    try {
      const { user: userData, token } = await authApi.signup(data);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('tokens', JSON.stringify(userData.tokens));
      setUser(userData);
      setTokens(userData.tokens);
      setIsEmailVerified(userData.isEmailVerified);
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      await authApi.resendVerification();
    } catch (error) {
      console.error('Failed to resend verification:', error);
      throw error;
    }
  };

  const updateTokens = (newTokens: Partial<Tokens>) => {
    setTokens(prev => {
      const updated = { ...prev, ...newTokens };
      localStorage.setItem('tokens', JSON.stringify(updated));
      return updated;
    });
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      localStorage.removeItem('tokens');
      setUser(null);
      setTokens({
        words: 0,
        images: 0,
        minutes: 0,
        characters: 0
      });
      setIsEmailVerified(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      tokens,
      isEmailVerified,
      login, 
      logout, 
      signup,
      resendVerificationEmail,
      updateTokens
    }}>
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