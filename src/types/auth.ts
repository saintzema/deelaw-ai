export type UserType = 'citizen' | 'lawyer';

export interface SignupData {
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  phone?: string;
  socialProvider?: 'google';
  socialId?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  tokens: number;
}