import React from 'react';
import { MessageSquare, FileText, Mic, Code, Shield, Clock, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Legal Chat Assistant",
    description: "Get instant answers to your legal questions with our AI-powered chat assistant."
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: "Document Analysis",
    description: "Upload and analyze legal documents with advanced AI technology."
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Legal Protection",
    description: "Stay protected with AI-powered legal advice and document verification."
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Smart Contracts",
    description: "Generate and analyze smart contracts with built-in legal compliance."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "24/7 Availability",
    description: "Access legal assistance anytime, anywhere with our always-on AI system."
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Voice Interface",
    description: "Interact naturally with voice commands for hands-free legal assistance."
  }
];

const FeatureSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-bolt-darker" />
      <div className="absolute inset-0 bg-gradient-radial from-bolt-blue/10 via-transparent to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-bolt-purple/10 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-bolt-blue/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-bolt-purple" />
          <span className="text-bolt-purple font-semibold px-4 py-1 rounded-full bg-bolt-purple/10 backdrop-blur-sm">
            Features
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Powerful Features
        </h2>
        <p className="text-xl text-bolt-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Everything you need for legal assistance in one place
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Gradient border effect */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
              
              {/* Card content */}
              <div className="relative bg-bolt-darker p-6 rounded-xl border border-bolt-gray-800 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">
                  <div className="text-transparent mb-4">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-bolt-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;