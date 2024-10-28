import React, { createContext, useContext, useState, useEffect } from 'react';
import { SignupData, User, Tokens } from '../types/auth';
import { mockApi } from '../services/mockApi';

interface AuthContextType {
  user: User | null;
  tokens: Tokens;
  isEmailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  updateTokens: (newTokens: Partial<Tokens>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize with stored user data
const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const getStoredTokens = () => {
  const storedTokens = localStorage.getItem('tokens');
  return storedTokens ? JSON.parse(storedTokens) : {
    words: 4657,
    images: 0,
    minutes: 5,
    characters: 812
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
  const [tokens, setTokens] = useState<Tokens>(getStoredTokens());
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        try {
          const userData = await mockApi.validateToken(token);
          setUser(userData);
          setTokens(userData.tokens);
          setIsEmailVerified(userData.isEmailVerified);
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('tokens', JSON.stringify(userData.tokens));
        } catch (error) {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          localStorage.removeItem('tokens');
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user: userData, token } = await mockApi.login(email, password);
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('tokens', JSON.stringify(userData.tokens));
      setUser(userData);
      setTokens(userData.tokens);
      setIsEmailVerified(userData.isEmailVerified);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const { user: userData, token } = await mockApi.signup(data);
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
      const token = localStorage.getItem('auth_token');
      if (!token) throw new Error('Not authenticated');
      await mockApi.resendVerification(token);
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

  const logout = () => {
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