import { SignupData, User, Tokens } from '../types/auth';

// Mock database - initialize with stored users
const getStoredUsers = () => {
  const stored = localStorage.getItem('mockDb_users');
  return stored ? JSON.parse(stored) : [];
};

let users: User[] = getStoredUsers();

const saveUsers = () => {
  localStorage.setItem('mockDb_users', JSON.stringify(users));
};

const defaultTokens: Tokens = {
  words: 4657,
  images: 0,
  minutes: 5,
  characters: 812
};

export const mockApi = {
  signup: async (data: SignupData): Promise<{ user: User; token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    // Check if user already exists
    if (users.find(u => u.email === data.email)) {
      throw new Error('User already exists');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      tokens: defaultTokens,
      isEmailVerified: false,
      role: 'user',
      plan: {
        name: 'Free Trial'
      }
    };

    users.push(newUser);
    saveUsers();

    return {
      user: newUser,
      token: `mock-token-${newUser.id}`
    };
  },

  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay

    const user = users.find(u => u.email === email);
    if (!user) {
      // For demo purposes, create a new user if not found
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        firstName: 'Demo',
        lastName: 'User',
        tokens: defaultTokens,
        isEmailVerified: false,
        role: 'user',
        plan: {
          name: 'Free Trial'
        }
      };
      users.push(newUser);
      saveUsers();
      return {
        user: newUser,
        token: `mock-token-${newUser.id}`
      };
    }

    return {
      user,
      token: `mock-token-${user.id}`
    };
  },

  validateToken: async (token: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay

    const userId = token.replace('mock-token-', '');
    const user = users.find(u => u.id === userId);
    if (!user) {
      throw new Error('Invalid token');
    }
    return user;
  },

  resendVerification: async (token: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate email sending
  },

  transcribe: async (audioBlob: Blob): Promise<{ text: string }> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transcription
    return {
      text: "This is a mock transcription of your audio message."
    };
  }
};