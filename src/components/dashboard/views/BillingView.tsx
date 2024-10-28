import React from 'react';
import { CreditCard, Coins, ArrowRight } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import TokenPurchaseCard from '../../TokenPurchaseCard';

const BillingView: React.FC = () => {
  const { user } = useAuth();

  const tokenPackages = [
    {
      tokenAmount: 1500,
      price: 5,
      description: "Starter Pack",
      voiceMinutes: 15,
    },
    {
      tokenAmount: 5000,
      price: 15,
      description: "Value Pack",
      highlighted: true,
      voiceMinutes: 50,
    },
    {
      tokenAmount: 15000,
      price: 45,
      description: "Pro Pack",
      voiceMinutes: 150,
    },
    {
      tokenAmount: 50000,
      price: 150,
      description: "Enterprise Pack",
      voiceMinutes: 500,
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">Billing & Usage</h2>

      {/* Current Balance */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-bolt-blue/10 flex items-center justify-center">
              <Coins className="w-6 h-6 text-bolt-blue" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {user?.tokens.toLocaleString()} words remaining
              </h3>
              <p className="text-bolt-gray-400">
                Your current balance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Token Packages */}
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Purchase More Credits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenPackages.map((pkg, index) => (
            <TokenPurchaseCard
              key={index}
              {...pkg}
              currency="USD"
            />
          ))}
        </div>
      </div>

      {/* Subscription Status */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-bolt-blue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Pro Plan</h3>
                <p className="text-bolt-gray-400">
                  Current subscription
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-bolt-blue hover:text-bolt-purple transition-colors">
              <span>Manage Subscription</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingView;