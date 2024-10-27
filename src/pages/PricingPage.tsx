import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import PricingCard from '../components/PricingCard';
import TokenPurchaseCard from '../components/TokenPurchaseCard';

const PricingPage: React.FC = () => {
  const [currency, setCurrency] = useState<'USD' | 'NGN'>('USD');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const subscriptionPlans = [
    {
      planId: 'basic-legal',
      title: "Basic Legal",
      subtitle: "Perfect for Personal Legal Queries",
      price: 0,
      tokenAmount: 2500,
      features: [
        "Basic AI legal assistant",
        "2,500 words credit / month",
        "Simple document review",
        "Basic legal templates",
        "Pay-as-you-go option"
      ]
    },
    {
      planId: 'standard-legal',
      title: "Standard Legal",
      subtitle: "For Regular Legal Support",
      price: currency === 'NGN' ? 4500 : 10,
      tokenAmount: 25000,
      features: [
        "Advanced AI legal assistant",
        "25,000 words credit / month",
        "Full document analysis",
        "Contract templates",
        "Priority support"
      ]
    },
    {
      planId: 'professional-legal',
      title: "Professional Legal",
      subtitle: "Complete Legal Solution",
      price: currency === 'NGN' ? 13500 : 30,
      tokenAmount: 100000,
      features: [
        "Premium AI legal assistant",
        "100,000 words credit / month",
        "Advanced document automation",
        "All premium templates",
        "24/7 support access"
      ],
      popularTag: true,
      highlighted: true
    },
    {
      planId: 'enterprise-legal',
      title: "Enterprise Legal",
      subtitle: "For Organizations & Law Firms",
      price: currency === 'NGN' ? 22500 : 50,
      tokenAmount: 1000000,
      features: [
        "Enterprise AI assistant",
        "1M words credit / month",
        "Full legal automation suite",
        "Custom template builder",
        "Dedicated support team"
      ]
    }
  ];

  const tokenPackages = [
    {
      tokenAmount: 5000,
      price: currency === 'NGN' ? 2250 : 5,
      description: "Basic Package",
    },
    {
      tokenAmount: 10000,
      price: currency === 'NGN' ? 4050 : 9,
      description: "Popular Package",
      highlighted: true,
    },
    {
      tokenAmount: 50000,
      price: currency === 'NGN' ? 18000 : 40,
      description: "Professional Package",
    },
    {
      tokenAmount: 100000,
      price: currency === 'NGN' ? 31500 : 70,
      description: "Enterprise Package",
    }
  ];

  return (
    <div className="min-h-screen bg-bolt-dark py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-bolt-purple" />
          <span className="text-bolt-purple font-semibold px-4 py-1 rounded-full bg-bolt-purple/10">
            Simple Pricing
          </span>
        </div>

        <h1 className="text-4xl font-bold text-center text-white mb-4">
          Choose Your Legal Assistant Plan
        </h1>

        <p className="text-xl text-bolt-gray-300 text-center mb-8 max-w-2xl mx-auto">
          From basic legal help to full-service solutions, find the perfect plan for your needs.
        </p>

        {/* Currency Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-bolt-darker rounded-full p-1 flex items-center">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-full transition-colors ${
                currency === 'USD' 
                  ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white' 
                  : 'text-bolt-gray-400 hover:text-white'
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency('NGN')}
              className={`px-4 py-2 rounded-full transition-colors ${
                currency === 'NGN' 
                  ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white' 
                  : 'text-bolt-gray-400 hover:text-white'
              }`}
            >
              NGN
            </button>
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {subscriptionPlans.map((plan) => (
            <PricingCard
              key={plan.planId}
              planId={plan.planId}
              title={plan.title}
              subtitle={plan.subtitle}
              price={plan.price}
              currency={currency}
              period="month"
              features={plan.features}
              tokenAmount={plan.tokenAmount}
              highlighted={plan.highlighted}
              popularTag={plan.popularTag}
              isSelected={selectedPlan === plan.planId}
              onSelect={() => setSelectedPlan(plan.planId)}
            />
          ))}
        </div>

        {/* Token Packages */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Need More Credits?
          </h2>
          <p className="text-bolt-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Top up your account with additional credits for more legal assistance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tokenPackages.map((pkg, index) => (
              <TokenPurchaseCard
                key={index}
                {...pkg}
                currency={currency}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;