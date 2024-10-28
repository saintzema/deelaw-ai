import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import PricingCard from './PricingCard';
import TokenPurchaseCard from './TokenPurchaseCard';

type PricingType = 'prepaid' | 'monthly' | 'yearly';

interface PricingProps {
  currency: 'USD' | 'NGN';
}

const PricingSection: React.FC<PricingProps> = ({ currency }) => {
  const [pricingType, setPricingType] = useState<PricingType>('monthly');

  const prepaidPlans = [
    {
      tokenAmount: 1500,
      price: currency === 'NGN' ? 5000 : 5,
      description: "Starter Pack",
      voiceMinutes: 15,
    },
    {
      tokenAmount: 5000,
      price: currency === 'NGN' ? 15000 : 15,
      description: "Value Pack",
      highlighted: true,
      voiceMinutes: 50,
    },
    {
      tokenAmount: 15000,
      price: currency === 'NGN' ? 45000 : 45,
      description: "Pro Pack",
      voiceMinutes: 150,
    },
    {
      tokenAmount: 50000,
      price: currency === 'NGN' ? 150000 : 150,
      description: "Enterprise Pack",
      voiceMinutes: 500,
    }
  ];

  const monthlyPlans = [
    {
      planId: 'free-plan',
      title: "Free",
      subtitle: "Basic Legal Help",
      price: 0,
      tokenAmount: 1000,
      aiModel: "GPT-3.5",
      features: [
        "1,000 words per month",
        "Basic AI legal assistant",
        "OpenAI GPT-3.5 model",
        "Response limit: 1,500 words",
        "Basic document templates",
        "5 minutes voice transcription",
        "Basic voice (1 character)",
        "Pay-as-you-go option"
      ]
    },
    {
      planId: 'basic-plan',
      title: "Basic",
      subtitle: "Essential Legal Support",
      price: currency === 'NGN' ? 10000 : 10,
      tokenAmount: 3000,
      aiModel: "GPT-4",
      features: [
        "3,000 words per month",
        "Advanced AI assistant",
        "Latest GPT-4 model",
        "Response limit: 2,500 words",
        "Standard templates",
        "15 minutes voice transcription",
        "2 voice characters",
        "Voice speed control",
        "Email support"
      ]
    },
    {
      planId: 'pro-plan',
      title: "Professional",
      subtitle: "Advanced Legal Solution",
      price: currency === 'NGN' ? 20000 : 20,
      tokenAmount: 7500,
      aiModel: "GPT-4 Turbo",
      popularTag: true,
      features: [
        "7,500 words per month",
        "Premium AI features",
        "GPT-4 Turbo with 128k context",
        "Response limit: 4,000 words",
        "Premium templates",
        "30 minutes voice transcription",
        "5 voice characters",
        "Voice customization",
        "Voice emotion control",
        "Priority support",
        "Advanced analytics"
      ]
    },
    {
      planId: 'team-plan',
      title: "Team",
      subtitle: "Complete Team Solution",
      price: currency === 'NGN' ? 50000 : 50,
      tokenAmount: 15000,
      aiModel: "GPT-4 Turbo",
      features: [
        "15,000 words per month",
        "All premium features",
        "GPT-4 Turbo with 128k context",
        "Response limit: 4,000 words",
        "Premium templates",
        "60 minutes voice transcription",
        "10 voice characters",
        "Custom voice training",
        "Voice style mixing",
        "Priority support",
        "Team collaboration (up to 5)",
        "Advanced workflow automation"
      ]
    },
    {
      planId: 'enterprise-plan',
      title: "Enterprise",
      subtitle: "Ultimate Legal Access",
      price: currency === 'NGN' ? 150000 : 150,
      tokenAmount: 50000,
      aiModel: "GPT-4 Turbo",
      features: [
        "50,000 words per month",
        "All premium features",
        "GPT-4 Turbo with 128k context",
        "Unlimited response length",
        "Custom templates",
        "Unlimited voice transcription",
        "Unlimited voice characters",
        "Custom voice cloning",
        "Advanced voice controls",
        "24/7 dedicated support",
        "Team collaboration (unlimited)",
        "Custom AI model training",
        "API access"
      ]
    }
  ];

  const yearlyPlans = monthlyPlans.map(plan => ({
    ...plan,
    price: plan.price * 10, // 2 months free
    tokenAmount: plan.tokenAmount * 12,
    period: 'year' as const,
    features: [
      ...plan.features,
      "Save 20% annually",
      "Lock in current price"
    ]
  }));

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-bolt-darker" />
      <div className="absolute inset-0 bg-gradient-radial from-bolt-blue/10 via-transparent to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-bolt-purple/10 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-bolt-blue/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-bolt-purple" />
          <span className="text-bolt-purple font-semibold px-4 py-1 rounded-full bg-bolt-purple/10 backdrop-blur-sm">
            Pricing
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Choose Your Legal AI Plan
        </h2>

        <p className="text-xl text-bolt-gray-300 text-center mb-12 max-w-3xl mx-auto">
          From quick legal checks to enterprise solutions, we have a plan that fits your needs
        </p>

        {/* Pricing Type Selector */}
        <div className="relative w-fit mx-auto mb-12">
          <div className="flex items-center bg-bolt-darker/50 p-1 rounded-full border border-bolt-gray-800">
            <button
              onClick={() => setPricingType('prepaid')}
              className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                pricingType === 'prepaid' ? 'text-white' : 'text-bolt-gray-400'
              }`}
            >
              Prepaid
            </button>
            <button
              onClick={() => setPricingType('monthly')}
              className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                pricingType === 'monthly' ? 'text-white' : 'text-bolt-gray-400'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPricingType('yearly')}
              className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                pricingType === 'yearly' ? 'text-white' : 'text-bolt-gray-400'
              }`}
            >
              Yearly
            </button>
            <div
              className={`absolute top-1 h-[calc(100%-8px)] bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full transition-all duration-300 ${
                pricingType === 'prepaid' 
                  ? 'left-1 w-[calc(33.333%-4px)]' 
                  : pricingType === 'monthly'
                    ? 'left-[33.333%] w-[calc(33.333%-4px)]'
                    : 'left-[66.666%] w-[calc(33.333%-4px)]'
              }`}
            />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {pricingType === 'prepaid' && prepaidPlans.map((plan, index) => (
            <TokenPurchaseCard
              key={index}
              tokenAmount={plan.tokenAmount}
              price={plan.price}
              currency={currency}
              highlighted={plan.highlighted}
              description={plan.description}
              voiceMinutes={plan.voiceMinutes}
            />
          ))}
          
          {pricingType === 'monthly' && monthlyPlans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              currency={currency}
              period="month"
              highlighted={index === 2}
            />
          ))}
          
          {pricingType === 'yearly' && yearlyPlans.map((plan, index) => (
            <PricingCard
              key={index}
              {...plan}
              currency={currency}
              highlighted={index === 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;