import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePricing } from '../contexts/PricingContext';

interface PricingCardProps {
  title: string;
  subtitle: string;
  price: number;
  currency: 'USD' | 'NGN';
  period: string;
  features: string[];
  highlighted?: boolean;
  popularTag?: boolean;
  tokenAmount: number;
  planId: string;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  title,
  subtitle,
  price,
  currency,
  period,
  features,
  highlighted = false,
  popularTag = false,
  tokenAmount,
  planId,
  isSelected = false,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { user, tokens } = useAuth();
  const { initializePayment } = usePricing();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const handlePlanSelection = async () => {
    onSelect?.();

    if (!user) {
      navigate('/auth/signup', { 
        state: { redirectTo: `/pricing/${planId}` } 
      });
      return;
    }

    if (price === 0) {
      if (tokens > 0) {
        navigate('/dashboard');
      } else {
        navigate('/pricing/tokens');
      }
      return;
    }

    try {
      await initializePayment({
        email: user.email,
        amount: price * 100, // Convert to lowest currency unit
        currency,
        metadata: {
          type: 'subscription',
          planId,
          tokenAmount,
          userId: user.id,
        },
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        onSuccess: (transaction) => {
          console.log('Payment successful:', transaction);
          navigate('/dashboard');
        },
        onCancel: () => {
          console.log('Payment cancelled');
        },
      });
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div 
        className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm transition-opacity duration-300 ${
          highlighted || isHovered || isSelected ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Card content */}
      <div 
        className={`relative bg-bolt-darker rounded-xl border ${
          isSelected 
            ? 'border-bolt-blue' 
            : highlighted 
              ? 'border-bolt-purple' 
              : 'border-bolt-gray-800'
        } overflow-hidden backdrop-blur-xl transition-all duration-300 hover:shadow-2xl ${
          isSelected ? 'transform scale-105' : ''
        }`}
      >
        {popularTag && (
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-bolt-blue to-bolt-purple px-3 py-1 rounded-full">
            <Sparkles className="w-3 h-3 text-white" />
            <span className="text-sm font-medium text-white">Most Popular</span>
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-bolt-gray-300 text-sm">{subtitle}</p>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <div className="flex items-baseline">
              <span className={`text-4xl font-bold bg-gradient-to-r ${
                isSelected 
                  ? 'from-bolt-blue to-bolt-purple' 
                  : 'from-bolt-gray-300 to-white'
              } bg-clip-text text-transparent transition-colors duration-300`}>
                {formattedPrice}
              </span>
              <span className="text-bolt-gray-300 ml-2">/ {period}</span>
            </div>
            <p className="text-bolt-gray-400 text-sm mt-2">
              Includes {tokenAmount.toLocaleString()} legal credits
            </p>
          </div>

          {/* Features */}
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start text-bolt-gray-300 group/item">
                <div className="mr-3 mt-1">
                  <div className={`w-5 h-5 rounded-full ${
                    isSelected 
                      ? 'bg-bolt-blue/20' 
                      : 'bg-bolt-blue/10'
                  } flex items-center justify-center group-hover/item:bg-bolt-blue/20 transition-colors`}>
                    <Check className={`w-3 h-3 ${
                      isSelected ? 'text-bolt-blue' : 'text-bolt-gray-400'
                    }`} />
                  </div>
                </div>
                <span className={`transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'group-hover/item:text-white'
                }`}>{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <button 
            onClick={handlePlanSelection}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/button ${
              isSelected || highlighted
                ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white hover:opacity-90'
                : 'bg-bolt-gray-800 text-white hover:bg-bolt-gray-700'
            }`}
          >
            <span>{price === 0 ? 'Start Free' : 'Choose Plan'}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </button>
        </div>

        {/* Bottom gradient accent */}
        {(isSelected || highlighted) && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark" />
        )}
      </div>
    </div>
  );
};

export default PricingCard;