import React, { useState } from 'react';
import { Coins, ArrowRight, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePricing } from '../contexts/PricingContext';
import { PaystackOptions } from '../types/payment';

interface TokenPurchaseCardProps {
  tokenAmount: number;
  price: number;
  currency: 'USD' | 'NGN';
  highlighted?: boolean;
  description?: string;
  voiceMinutes?: number;
}

const TokenPurchaseCard: React.FC<TokenPurchaseCardProps> = ({
  tokenAmount,
  price,
  currency,
  highlighted = false,
  description,
  voiceMinutes,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { initializePayment } = usePricing();

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/auth/signup', { 
        state: { redirectTo: '/pricing/tokens' } 
      });
      return;
    }

    try {
      const paymentData: PaystackOptions = {
        email: user.email,
        amount: price * 100, // Convert to lowest currency unit
        currency,
        metadata: {
          type: 'token_purchase',
          tokenAmount,
          voiceMinutes,
          userId: user.id,
        },
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        onSuccess: (transaction) => {
          console.log('Token purchase successful:', transaction);
          navigate('/dashboard');
        },
        onCancel: () => {
          console.log('Token purchase cancelled');
        },
      };

      await initializePayment(paymentData);
    } catch (error) {
      console.error('Token purchase failed:', error);
    }
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm transition-opacity duration-300 ${
          highlighted || isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 overflow-hidden p-6">
        {description && (
          <div className="absolute top-4 right-4 text-sm text-bolt-gray-400">
            {description}
          </div>
        )}
        
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
            <Coins className="w-5 h-5 text-bolt-blue" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {tokenAmount.toLocaleString()} Credits
            </h3>
            <p className="text-bolt-gray-400 text-sm">
              {(price / tokenAmount).toFixed(3)} {currency}/credit
            </p>
          </div>
        </div>

        {voiceMinutes && (
          <div className="flex items-center gap-2 mb-4 text-sm text-bolt-gray-300">
            <Mic className="w-4 h-4 text-bolt-blue" />
            <span>{voiceMinutes} minutes voice processing</span>
          </div>
        )}

        <div className="mb-6">
          <span className="text-3xl font-bold bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text text-transparent">
            {formattedPrice}
          </span>
        </div>

        <button 
          onClick={handlePurchase}
          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/button ${
            highlighted
              ? 'bg-gradient-to-r from-bolt-blue to-bolt-purple text-white hover:opacity-90'
              : 'bg-bolt-gray-800 text-white hover:bg-bolt-gray-700'
          }`}
        >
          <span>Purchase Credits</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default TokenPurchaseCard;