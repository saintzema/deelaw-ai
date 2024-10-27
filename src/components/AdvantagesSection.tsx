import React from 'react';
import { Zap, DollarSign, HeadphonesIcon, Lock, MapPin, Sparkles } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const advantages = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Fast",
    description: "The fastest online lawyer service, ideal for avoiding expenses and appointments."
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Cost-effective",
    description: "Forget the high costs of traditional law market. The artificial intelligence lawyer is budget-friendly."
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "State-Specific Advice",
    description: "Get legal advice tailored to your state's laws and regulations, from Delta to Lagos."
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Private",
    description: "We stand firm on privacy, ensuring that users' conversations remain secure and anonymous."
  }
];

const stats = [
  {
    value: 5,
    unit: "Sec",
    description: "To summarize any"
  },
  {
    value: 75,
    unit: "%",
    description: "Time saved: On"
  },
  {
    value: 90,
    unit: "%",
    description: "Cost reduction:"
  }
];

const AdvantagesSection: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="relative py-24 overflow-hidden" ref={sectionRef}>
      {/* Gradient background effects */}
      <div className="absolute inset-0 bg-bolt-darker" />
      <div className="absolute inset-0 bg-gradient-radial from-bolt-blue/10 via-transparent to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-bolt-purple/10 rounded-full blur-3xl" />
      <div className="absolute left-0 bottom-1/4 w-96 h-96 bg-bolt-blue/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-bolt-purple" />
          <span className="text-bolt-purple font-semibold px-4 py-1 rounded-full bg-bolt-purple/10 backdrop-blur-sm">
            + Advantages
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Why our AI in law is better?
        </h2>

        <p className="text-xl text-bolt-gray-300 text-center mb-16 max-w-3xl mx-auto">
          In contrast to others, our LegalTech software is quick, easy, and wallet-friendly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {advantages.map((advantage, index) => (
            <div key={index} className="group relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
              
              {/* Card content */}
              <div className="relative bg-bolt-darker p-6 rounded-xl border border-bolt-gray-800 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">
                  <div className="text-transparent mb-4">{advantage.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{advantage.title}</h3>
                <p className="text-bolt-gray-300">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-16 text-center">
            Measuring our impact on your performance.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                {/* Gradient border effect */}
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
                
                {/* Stat content */}
                <div className="relative bg-bolt-darker p-6 rounded-xl border border-bolt-gray-800 backdrop-blur-xl text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text text-transparent">
                      {inView && (
                        <CountUp
                          end={stat.value}
                          duration={2.5}
                          separator=","
                        />
                      )}
                    </span>
                    <span className="text-4xl font-bold text-bolt-purple">{stat.unit}</span>
                  </div>
                  <p className="text-bolt-gray-300">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;