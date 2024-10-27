import React from 'react';
import { Sparkles, Zap, FileText, Globe } from 'lucide-react';

const DetailedFeatures: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Ask AI Lawyer",
      description: "Legal research made simple. Chat with your AI assistant for instant insights and answers to complex legal questions in real-time.",
      image: "https://source.unsplash.com/random/800x600?chat,interface"
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "AI Document Handling",
      description: "Instantly analyze contracts, convert legal documents, and get summaries of complex legal texts with advanced AI processing.",
      image: "https://source.unsplash.com/random/800x600?document,scanning"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Internet-Powered Research",
      description: "Complete hours of legal research in minutes with AI-powered search and comprehensive analysis of legal databases.",
      image: "https://source.unsplash.com/random/800x600?research,internet"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Multi-Platform Access",
      description: "Access powerful legal AI tools anywhere. Available seamlessly across web and mobile devices.",
      image: "https://source.unsplash.com/random/800x600?mobile,devices"
    }
  ];

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
          Advanced Legal AI Features
        </h2>
        
        <p className="text-xl text-bolt-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Discover powerful features that transform your legal work. From instant document analysis 
          to AI-powered research, we handle the complexity.
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