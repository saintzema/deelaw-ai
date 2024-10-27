import React, { createContext, useContext } from 'react';
import { PaystackOptions, PaystackTransaction } from '../types/payment';

interface PricingContextType {
  initializePayment: (data: PaystackOptions) => Promise<void>;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initializePayment = async (data: PaystackOptions) => {
    try {
      const handler = window.PaystackPop.setup({
        ...data,
        publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        onSuccess: (transaction: PaystackTransaction) => {
          // Handle successful payment
          console.log('Payment successful:', transaction);
        },
        onCancel: () => {
          // Handle payment cancellation
          console.log('Payment cancelled');
        },
      });
      handler.openIframe();
    } catch (error) {
      console.error('Payment initialization failed:', error);
    }
  };

  return (
    <PricingContext.Provider value={{ initializePayment }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};