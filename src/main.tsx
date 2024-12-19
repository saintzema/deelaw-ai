import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import { PricingProvider } from './contexts/PricingContext';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
if (!googleClientId) {
  console.error('Google Client ID is not set in environment variables');
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <PricingProvider>
            <App />
          </PricingProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </ErrorBoundary>
  </StrictMode>
);