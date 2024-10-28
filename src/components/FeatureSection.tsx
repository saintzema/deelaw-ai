import React from 'react';
import { MessageSquare, Globe, Building2, Scale, FileText, Zap } from 'lucide-react';

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Country-Specific AI",
      description: "Unlike other AI models, DeeLaw is trained specifically on your country's laws and legal system, ensuring accurate and relevant advice for your jurisdiction."
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Custom Training",
      description: "Train DeeLaw on your firm's documents and precedents for personalized assistance that aligns with your practice's unique requirements."
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Local Legal Compliance",
      description: "Get advice that's always up-to-date with your jurisdiction's latest laws, regulations, and court decisions."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Legal Chat Assistant",
      description: "Get instant answers to your legal questions with our AI-powered chat assistant. Start with 1,000 free words, upgrade for more."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Smart Document Analysis",
      description: "Analyze contracts and legal documents with AI that understands your local legal requirements and jurisdiction-specific clauses."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Research",
      description: "Access comprehensive legal research tailored to your jurisdiction's laws and precedents, with instant citations and references."
    }
  ];

  return (
    <section className="relative py-10 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-bolt-darker" />
      <div className="absolute inset-0 bg-gradient-radial from-bolt-blue/10 via-transparent to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-bolt-purple/10 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-bolt-blue/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Not Just Another AI - A{' '}
            <span className="bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text text-transparent">
              Legal Expert
            </span>{' '}
            for Your Jurisdiction
          </h2>
          <p className="text-xl text-bolt-gray-300 max-w-3xl mx-auto">
            DeeLaw stands apart with jurisdiction-specific training and custom learning capabilities,
            delivering precise legal assistance for your location and needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
              
              {/* Feature card */}
              <div className="relative h-full bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
                <div className="bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">
                  <div className="text-transparent mb-4">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
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