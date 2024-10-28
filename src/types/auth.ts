export type UserType = 'citizen' | 'lawyer';

export interface Tokens {
  words: number;
  images: number;
  minutes: number;
  characters: number;
}

export interface SignupData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  socialProvider?: 'google';
  socialId?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  tokens: Tokens;
  avatar?: string;
  role?: string;
  plan?: {
    name: string;
    expiresAt?: Date;
  };
  referralId?: string;
  company?: string;
  website?: string;
  city?: string;
  country?: string;
  jobRole?: string;
  isEmailVerified: boolean;
}