import React, { useState, useEffect } from 'react';
import { Scale, Menu, X, LogIn, LogOut } from 'lucide-react';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import DetailedFeatures from './components/DetailedFeatures';
import TestimonialSection from './components/TestimonialSection';
import CTASection from './components/CTASection';
import PricingCard from './components/PricingCard';
import AdvantagesSection from './components/AdvantagesSection';
import UsersSection from './components/UsersSection';
import HowItWorks from './components/HowItWorks';
import TokenPurchaseCard from './components/TokenPurchaseCard';


const App: React.FC = () => {
  const [userType, setUserType] = useState<'citizen' | 'lawyer'>('citizen');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);


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

  const handleAuthClick = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const pricingPlans = [
    {
      planId: 'free-plan',
      title: "Free Plan",
      subtitle: "Basic Legal Help",
      price: currency === 'NGN' ? 0 : 0,
      tokenAmount: 1000,
      features: [
        "Basic AI legal assistant",
        "1,000 words per month",
        "Simple document help",
        "Basic templates",
        "Pay-as-you-go option"
      ]
    },
    {
      planId: 'basic-plan',
      title: "Basic Plan",
      subtitle: "Essential Legal Support",
      price: currency === 'NGN' ? 4500 : 10,
      tokenAmount: 25000,
      features: [
        "Smart AI legal assistant",
        "25,000 words per month",
        "Document review",
        "Standard templates",
        "Email support"
      ]
    },
    {
      planId: 'pro-plan',
      title: "Pro Plan",
      subtitle: "Complete Legal Solution",
      price: currency === 'NGN' ? 13500 : 30,
      tokenAmount: 100000,
      features: [
        "Advanced AI assistant",
        "100,000 words per month",
        "Full automation",
        "Premium templates",
        "Priority support"
      ],
      popularTag: true
    },
    {
      planId: 'max-plan',
      title: "Max Plan",
      subtitle: "Ultimate Legal Access",
      price: currency === 'NGN' ? 22500 : 50,
      tokenAmount: 1000000,
      features: [
        "Maximum AI help",
        "1M words per month",
        "Full automation",
        "Custom templates",
        "24/7 support"
      ]
    }
  ];

  const tokenPackages = [
    {
      tokenAmount: 5000,
      price: currency === 'NGN' ? 2250 : 5,
      description: "Starter Pack",
    },
    {
      tokenAmount: 10000,
      price: currency === 'NGN' ? 4050 : 9,
      description: "Popular Pack",
      highlighted: true,
    },
    {
      tokenAmount: 50000,
      price: currency === 'NGN' ? 18000 : 40,
      description: "Pro Pack",
    },
    {
      tokenAmount: 100000,
      price: currency === 'NGN' ? 31500 : 70,
      description: "Max Pack",
    },
    {
      planId: 'annual-plan',
      title: "Annual Plan",
      subtitle: "Yearly Legal Access",
      price: currency === 'NGN' ? 50000 : 110,
      period: 'year',
      tokenAmount: 1500000,
      features: [
        "All Max Plan features",
        "1.5M words per year",
        "Priority support",
        "Custom templates",
        "2 months free"
      ]
    }
  ];


  return (
    <div className="min-h-screen bg-bolt-dark text-bolt-gray-50 relative overflow-hidden">
      {/* Futuristic tint effects */}
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
            <span className="text-2xl font-bold text-white">
              DeeLaw <span className="text-bolt-blue bg-clip-text text-transparent bg-gradient-to-r from-bolt-blue to-bolt-purple">AI</span>
            </span>
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

          <button 
            onClick={handleAuthClick}
            className="bg-gradient-to-r from-bolt-blue to-bolt-purple text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-bolt-blue/20 hover:scale-105 flex items-center gap-2"
          >
            {isLoggedIn ? (
              <>
                Dashboard
                <LogOut className="w-4 h-4" />
              </>
            ) : (
              <>
                Try for Free
                <LogIn className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </header>

      <main className="relative z-30">
        <div className="container mx-auto px-4 py-12">
          <HeroSection userType={userType} onUserTypeChange={setUserType} />
        </div>

        <FeatureSection />

        <div className="container mx-auto px-4">
          <section id="pricing" className="py-16">
            <h2 className="text-3xl font-bold text-center text-white mb-8">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {pricingPlans.map((plan, index) => (
                 <PricingCard
                  key={index}
                  planId={plan.planId}
                  title={plan.title}
                  subtitle={plan.subtitle}
                  price={plan.price}
                  currency={currency}
                  period="month"
                  features={plan.features}
                  tokenAmount={plan.tokenAmount}
                  highlighted={index === 2}
                  popularTag={plan.popularTag}
                  isSelected={selectedPlanId === plan.planId}
                  onSelect={() => setSelectedPlanId(plan.planId)}
                />
              ))}
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center text-white mb-4">Custom Token Packages</h2>
              <p className="text-center text-bolt-gray-300 mb-8">
                Need a specific amount of tokens? Choose from our flexible token packages
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {tokenPackages.map((pkg, index) => (
                  <TokenPurchaseCard
                    key={index}
                    tokenAmount={pkg.tokenAmount}
                    price={pkg.price}
                    currency={currency}
                    highlighted={pkg.highlighted}
                    description={pkg.description}
                  />
                ))}
              </div>
            </div>

          </section>
        </div>
        <AdvantagesSection />
        <UsersSection />

        
        <div>
        </div>

        <HowItWorks />
        <DetailedFeatures />
        <TestimonialSection />
        <CTASection />
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
            &copy; 2024 DeeLaw. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;