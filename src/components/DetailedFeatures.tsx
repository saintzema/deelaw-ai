import React from 'react';
import { Sparkles, Zap, FileText, Globe, Building2 } from 'lucide-react';

const DetailedFeatures: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Country-Specific Legal AI",
      description: "Unlike generic AI, DeeLaw is trained on your country's specific laws, regulations, and legal precedents for accurate, relevant advice.",
      image: "https://source.unsplash.com/random/800x600?globe,world"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Custom-Trained for Your Firm",
      description: "Train DeeLaw on your firm's documents, past cases, and unique processes for personalized, firm-specific assistance.",
      image: "https://source.unsplash.com/random/800x600?office,building"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Smart Document Analysis",
      description: "Instantly analyze contracts and legal documents with AI that understands your jurisdiction's legal requirements.",
      image: "https://source.unsplash.com/random/800x600?document,scanning"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Legal Research",
      description: "Access up-to-date legal information specific to your jurisdiction, with instant citations and references.",
      image: "https://source.unsplash.com/random/800x600?research,library"
    }
  ];

  return (
    <section className="relative py-5 overflow-hidden">
      {/* Previous background effects remain the same... */}

      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-bolt-purple" />
          <span className="text-bolt-purple font-semibold px-4 py-1 rounded-full bg-bolt-purple/10 backdrop-blur-sm">
            Features
          </span>
        </div>
        
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Jurisdiction-Specific Legal AI
        </h2>
        
        <p className="text-xl text-bolt-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Unlike general AI, DeeLaw is trained specifically on your country's legal system, 
          providing accurate, relevant advice for your jurisdiction.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
              
              {/* Feature card */}
              <div className="relative bg-bolt-darker rounded-2xl border border-bolt-gray-800 overflow-hidden backdrop-blur-xl">
                {/* Image container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-bolt-darker via-transparent to-transparent z-10" />
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                      <div className="text-bolt-blue">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{feature.title}</h3>
                  </div>
                  <p className="text-bolt-gray-300">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom gradient accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailedFeatures;