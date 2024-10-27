import React, { useState } from 'react';
import { X, Mail, Phone, User2 } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAuth } from '../contexts/AuthContext';
import { SignupData } from '../types/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedQuery?: string;
  mode?: 'signup' | 'login';
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  savedQuery,
  mode: initialMode = 'signup'
}) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        setIsLoading(true);
        // Get user info from Google
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${response.access_token}` },
        }).then(res => res.json());

        // Handle social login/signup
        const signupData: SignupData = {
          email: userInfo.email,
          firstName: userInfo.given_name,
          lastName: userInfo.family_name,
          socialProvider: 'google',
          socialId: userInfo.sub,
        };

        await signup(signupData);
        onClose();
      } catch (error) {
        console.error('Google auth failed:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === 'signup') {
        const signupData: SignupData = {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone || undefined,
        };
        await signup(signupData);
      } else {
        await login(formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error('Auth failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-bolt-darker rounded-2xl w-full max-w-md p-8 border border-bolt-gray-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-bolt-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h2>
        
        {savedQuery && (
          <div className="mb-6 p-3 rounded-lg bg-bolt-gray-800/50 border border-bolt-gray-700">
            <p className="text-sm text-bolt-gray-300">Your question will be saved:</p>
            <p className="text-bolt-gray-100">{savedQuery}</p>
          </div>
        )}

        <button
          onClick={() => googleLogin()}
          disabled={isLoading}
          className="w-full bg-white text-gray-800 py-3 rounded-lg font-semibold mb-6 flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
        >
          <img src="/google.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-bolt-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-bolt-darker text-bolt-gray-400">Or continue with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
                  />
                </div>
                <div className="relative">
                  <User2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
                  />
                </div>
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
                />
              </div>
            </>
          )}
          
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Please wait...' : mode === 'signup' ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-bolt-gray-400">
            {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button 
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              className="text-bolt-blue hover:text-bolt-purple"
            >
              {mode === 'signup' ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;