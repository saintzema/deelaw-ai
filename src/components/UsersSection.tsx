import React from 'react';
import { Users, Scale, Building2, GraduationCap, Sparkles } from 'lucide-react';

const userTypes = [
  {
    icon: <Users className="w-8 h-8" />,
    title: "AI for",
    highlight: "Legal Consumers",
    highlightColor: "from-bolt-purple to-bolt-blue",
    description: "Get instant legal guidance based on your country's specific laws. No more generic advice - receive accurate, jurisdiction-specific assistance.",
    image: "https://source.unsplash.com/random/600x400?legal,consumer"
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "AI for",
    highlight: "Lawyers",
    highlightColor: "from-bolt-blue to-bolt-purple",
    description: "Access an AI trained on your jurisdiction's laws and regulations. Customize with your firm's documents for personalized assistance.",
    image: "https://source.unsplash.com/random/600x400?lawyer,work"
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "AI for",
    highlight: "Law Firms",
    highlightColor: "from-bolt-blue to-bolt-purple",
    description: "Train DeeLaw on your firm's documents and precedents. Get an AI that understands your jurisdiction and practice areas.",
    image: "https://source.unsplash.com/random/600x400?office,legal"
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "AI for",
    highlight: "Law Students",
    highlightColor: "from-bolt-purple to-bolt-blue",
    description: "Study with an AI that knows your country's legal system. Perfect for exam prep and understanding local case law.",
    image: "https://source.unsplash.com/random/600x400?student,study"
  }
];

const UsersSection: React.FC = () => {
  return (
    <section className="relative py-1 overflow-hidden">
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-bolt-darker" />
      <div className="absolute inset-0 bg-gradient-radial from-bolt-blue/10 via-transparent to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-bolt-purple/10 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-bolt-blue/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-bolt-purple" />
          <span className="text-bolt-purple font-semibold px-4 py-1 rounded-full bg-bolt-purple/10 backdrop-blur-sm">
            Users
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Who is DeeLaw AI for?
        </h2>

        <p className="text-xl text-bolt-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Unlike generic AI, DeeLaw is trained on your country's specific laws and can be customized 
          for your organization's unique needs. Get relevant, jurisdiction-specific legal assistance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {userTypes.map((type, index) => (
            <div key={index} className="group relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
              
              {/* Card content */}
              <div className="relative h-full bg-bolt-darker rounded-xl border border-bolt-gray-800 overflow-hidden backdrop-blur-xl">
                <div className="p-6">
                  <div className="mb-6">
                    <div className="bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">
                      <div className="text-transparent">{type.icon}</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {type.title}{' '}
                    <span className={`bg-gradient-to-r ${type.highlightColor} bg-clip-text text-transparent`}>
                      {type.highlight}
                    </span>
                  </h3>
                  <p className="text-bolt-gray-300 mb-6">
                    {type.description}
                  </p>
                </div>
                
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-bolt-darker via-transparent to-transparent z-10" />
                  <img 
                    src={type.image}
                    alt={type.highlight}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UsersSection;