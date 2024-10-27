import React from 'react';
import { MessageSquare, Sparkles } from 'lucide-react';

const topTestimonials = [
  {
    content: "The situation analysis feature is a lifesaver. It has helped me in identifying issues and preparing better for my cases. The app is a true companion for any modern-day lawyer.",
    author: "Elizabeth Martin",
    role: "Litigation Lawyer",
    image: "https://source.unsplash.com/random/100x100?woman,lawyer,1"
  },
  {
    content: "I'm amazed by the instant help it provides. It's like having a online lawyer, always willing to help with everything from clarifying a clause to writing a letter of termination.",
    author: "Barbara Smith",
    role: "Entrepreneur",
    image: "https://source.unsplash.com/random/100x100?woman,business,1"
  },
  {
    content: "Navigating through legal jargon was a maze until AI Lawyer came to the rescue. Now, I get to understand complex terms in simple language, making my life a lot easier.",
    author: "Sarah Mitchell",
    role: "Freelancer",
    image: "https://source.unsplash.com/random/100x100?woman,professional,1"
  }
];

const bottomTestimonials = [
  {
    content: "As a small business owner, attorney consultations were a nightmare due to high costs. AIL has been a game changer with its cost-effective solutions. Now, I can get the assistance without burning a hole in my pocket.",
    author: "Michael Chen",
    role: "Small Business Owner",
    image: "https://source.unsplash.com/random/100x100?man,business"
  },
  {
    content: "Being a law student, I constantly find myself buried under piles of case laws and briefs. AI Lawyer has been a beacon, assisting me with research writing and case briefs, making my academic journey less daunting.",
    author: "Jessica Brown",
    role: "Law Student",
    image: "https://source.unsplash.com/random/100x100?woman,student"
  },
  {
    content: "The clause generator feature is a revelation. It's become an indispensable tool for me, aiding in creating and amending clauses in a snap. Paper work and document handling automation was never this easy.",
    author: "David Wilson",
    role: "Corporate Lawyer",
    image: "https://source.unsplash.com/random/100x100?man,lawyer"
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects remain the same */}
      
      <div className="container relative mx-auto px-4">
        {/* Header section remains the same */}

        {/* Top row - sliding right */}
        <div className="testimonial-container relative mb-8">
          <div className="py-4 overflow-hidden">
            <div className="animate-slide-right flex gap-6">
              {[...topTestimonials, ...topTestimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative min-w-[400px] max-w-[400px] flex-shrink-0"
                >
                  {/* Gradient border effect */}
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
                  
                  {/* Card content */}
                  <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl h-[280px] flex flex-col justify-between">
                    <div className="space-y-4">
                      <p className="text-bolt-gray-300 text-base leading-relaxed break-words">
                        "{testimonial.content}"
                      </p>
                    </div>
                    <div className="flex items-center pt-4 border-t border-bolt-gray-800">
                      <div className="relative w-12 h-12 mr-4">
                        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple blur-[2px]" />
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="relative rounded-full w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.author}</h4>
                        <p className="text-bolt-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row - sliding left */}
        <div className="testimonial-container relative">
          <div className="py-4 overflow-hidden">
            <div className="animate-slide-left flex gap-6">
              {[...bottomTestimonials, ...bottomTestimonials].map((testimonial, index) => (
                <div
                  key={index}
                  className="group relative min-w-[400px] max-w-[400px] flex-shrink-0"
                >
                  {/* Gradient border effect */}
                  <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
                  
                  {/* Card content */}
                  <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl h-[280px] flex flex-col justify-between">
                    <div className="space-y-4">
                      <p className="text-bolt-gray-300 text-base leading-relaxed break-words">
                        "{testimonial.content}"
                      </p>
                    </div>
                    <div className="flex items-center pt-4 border-t border-bolt-gray-800">
                      <div className="relative w-12 h-12 mr-4">
                        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple blur-[2px]" />
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="relative rounded-full w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{testimonial.author}</h4>
                        <p className="text-bolt-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;