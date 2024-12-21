import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Scale, Menu, X, LogIn } from 'lucide-react';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import DetailedFeatures from './components/DetailedFeatures';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import PricingSection from './components/PricingSection';
import AdvantagesSection from './components/AdvantagesSection';
import UsersSection from './components/UsersSection';
import HowItWorks from './components/HowItWorks';
import DashboardRoutes from './components/dashboard/DashboardRoutes';
import { useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import { AuthProvider } from './contexts/AuthContext'; 
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  const [userType, setUserType] = useState<'citizen' | 'lawyer'>('citizen');
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedQuery, setSavedQuery] = useState<string | undefined>(undefined);
  const { user } = useAuth();
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country === 'NG') {
          setCurrency('NGN');
        }
      } catch (error) {
        console.error('Error detecting location:', error);
      }
    };

    checkLocation();
  }, []);

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    setSavedQuery(undefined);
  };

  return (
    <ThemeProvider>
    <AuthProvider>  {/* Wrapping the entire app with AuthProvider */}
      <div className="min-h-screen bg-bolt-dark text-bolt-gray-50 relative overflow-hidden">
        {/* Background effects */}
        <div className="fixed top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-bolt-blue/10 via-bolt-purple/5 to-transparent pointer-events-none z-10" />
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-bolt-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="fixed top-[20%] left-0 w-[400px] h-[400px] bg-bolt-purple/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Bolt.new style colored border */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark z-50" />

        {/* Noise texture overlay */}
        <div className="fixed inset-0 bg-noise opacity-[0.015] pointer-events-none z-20" />

        <header className="sticky top-0 backdrop-blur-lg bg-bolt-darker/80 border-b border-bolt-gray-800 z-40">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center relative">
            <div className="flex items-center">
              <Scale className="text-bolt-blue w-8 h-8 mr-2" />
              <a href='/'> 
                <span className="text-2xl font-bold text-white">
                  DeeLaw <span className="text-bolt-blue bg-clip-text text-transparent bg-gradient-to-r from-bolt-blue to-bolt-purple">AI</span>
                </span>
              </a>
            </div>
            
            <button 
              className="md:hidden z-20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-bolt-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-bolt-gray-300" />
              )}
            </button>

            <nav className="hidden md:block">
              <ul className="flex space-x-6">
                <li><a href="#how-it-works" className="text-bolt-gray-300 hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#pricing" className="text-bolt-gray-300 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-bolt-gray-300 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-bolt-gray-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </nav>

            {isMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-bolt-darker/95 backdrop-blur-lg border-b border-bolt-gray-800 p-4 md:hidden">
                <ul className="space-y-4">
                  <li><a href="#how-it-works" className="block text-bolt-gray-300 hover:text-white transition-colors">How It Works</a></li>
                  <li><a href="#pricing" className="block text-bolt-gray-300 hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="block text-bolt-gray-300 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="block text-bolt-gray-300 hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            )}

            {user ? (
              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="bg-gradient-to-r from-bolt-blue to-bolt-purple text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-bolt-blue/20 hover:scale-105 flex items-center gap-2"
              >
                Dashboard
                <LogIn className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-bolt-blue to-bolt-purple text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-bolt-blue/20 hover:scale-105 flex items-center gap-2"
              >
                Try for Free
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        <main className="relative z-30">
          <Routes>
            <Route path="/" element={
              <>
                <div className="container mx-auto px-4 py-12">
                  <HeroSection 
                    userType={userType} 
                    onUserTypeChange={setUserType} 
                    setShowAuthModal={setShowAuthModal}
                    setSavedQuery={setSavedQuery}
                  />
                </div>
                <FeatureSection />
                <PricingSection currency={currency} />
                <AdvantagesSection />
                <UsersSection />
                <HowItWorks />
                <DetailedFeatures />
                <TestimonialSection />
                <CTASection />
              </>
            } />
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="relative z-30 bg-bolt-darker border-t border-bolt-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between">
              <div className="w-full md:w-1/4 mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-2 text-white">DeeLaw</h3>
                <p className="text-sm text-bolt-gray-300">Your AI-powered legal assistant</p>
              </div>
              <div className="w-full md:w-1/4">
                <h3 className="text-lg font-semibold mb-2 text-white">Connect</h3>
                <ul className="text-sm text-bolt-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-bolt-gray-400">
              © 2024 DeeLawAI (A Zema Tech Company). All rights reserved.
            </div>
          </div>
        </footer>

        <AuthModal 
          isOpen={showAuthModal} 
          onClose={handleAuthModalClose}
          savedQuery={savedQuery}
        />
      </div>
    </AuthProvider>
    </ThemeProvider>
  );
};

export default App;