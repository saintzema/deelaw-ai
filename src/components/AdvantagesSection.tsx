import React from 'react';
import { Zap, DollarSign, Shield, Brain, MapPin, Sparkles, Scale, Clock } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const advantages = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Smartest Legal AI",
    description: "Get the most accurate legal advice powered by the latest AI technology. We're constantly learning and improving."
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Local Legal Expert",
    description: "Unlike others, we know your local laws. Get advice specific to your state, from Lagos to Abuja to Delta."
  },
  {
    icon: <Scale className="w-8 h-8" />,
    title: "Real Legal Knowledge",
    description: "Built with real lawyers, trained on actual cases. Not just generic AI - true legal expertise."
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Instant Help 24/7",
    description: "No waiting, no appointments. Get expert legal help instantly, any time of day or night."
  }
];

const stats = [
  {
    value: 30,
    unit: "Sec",
    description: "Average response time"
  },
  {
    value: 50000,
    unit: "+",
    description: "Legal questions answered"
  },
  {
    value: 100,
    unit: "%",
    description: "Location accuracy"
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
            Why We're Different
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center text-white mb-4">
          Nigeria's #1 AI Legal Assistant
        </h2>

        <p className="text-xl text-bolt-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Not just another AI - we're your local legal expert. Available 24/7, trained on Nigerian law, and ready to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {advantages.map((advantage, index) => (
            <div key={index} className="group relative">
              {/* Gradient border effect */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
              
              {/* Card content */}
              <div className="relative h-full bg-bolt-darker p-6 rounded-xl border border-bolt-gray-800 backdrop-blur-xl hover:shadow-xl transition-all duration-300">
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
            Leading the Legal AI Revolution
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