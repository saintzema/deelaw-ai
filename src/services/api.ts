import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { SignupData, User, Tokens } from '../types/auth';

// Define response types
interface AuthResponse {
  user: User;
  token: string;
}

interface LogoutResponse {
  message: string;
}

interface ChatResponse {
  message: string;
  audioUrl?: string;
  tokensUsed?: number;
}

interface TranscriptionResponse {
  text: string;
  confidence?: number;
}

interface TokenBalanceResponse {
  tokens: Tokens;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response and error interceptors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', data);
    return response.data;
  },


  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  resendVerification: async (): Promise<{ message: string }> => {
    const response = await api.post('/auth/resend-verification');
    return response.data;
  },

  validateToken: async (): Promise<User> => {
    const response = await api.get<User>('/auth/user');
    return response.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response = await api.post<LogoutResponse>('/auth/logout');
    return response.data;
  }
};

export const chatApi = {
  sendMessage: async (message: string, audioBlob?: Blob): Promise<ChatResponse> => {
    const formData = new FormData();
    formData.append('message', message);
    
    if (audioBlob) {
      formData.append('audio', audioBlob);
    }

    const response = await api.post<ChatResponse>('/chat/send', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  transcribeAudio: async (audioBlob: Blob): Promise<TranscriptionResponse> => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    const response = await api.post<TranscriptionResponse>('/chat/transcribe', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  generateAudioResponse: async (text: string): Promise<{ audioUrl: string }> => {
    const response = await api.post<{ audioUrl: string }>('/chat/generate-audio', { text });
    return response.data;
  },
};

export const tokenApi = {
  getBalance: async (): Promise<TokenBalanceResponse> => {
    const response = await api.get<TokenBalanceResponse>('/tokens/balance');
    return response.data;
  },

  updateBalance: async (tokens: Partial<Tokens>): Promise<TokenBalanceResponse> => {
    const response = await api.put<TokenBalanceResponse>('/tokens/update', tokens);
    return response.data;
  },
};

export default api;