import React, { useState } from 'react';
import { BookOpen, Play, Sparkles } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'X_ZuD2lBWZ0';

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

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
            Learn
          </span>
        </div>

        <h2 className="text-4xl font-bold text-center text-white mb-4">
          How to use DeeLaw AI
        </h2>

        <p className="text-xl text-bolt-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Watch how our AI-powered legal assistant can transform your legal work experience
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="group relative">
            {/* Gradient border effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
            
            {/* Video container */}
            <div className="relative bg-bolt-darker rounded-2xl overflow-hidden border border-bolt-gray-800 backdrop-blur-xl">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                {isPlaying ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?iv_load_policy=3&rel=0&modestbranding=1&playsinline=1&autoplay=1`}
                    title="DeeLaw AI Tutorial"
                    allow="clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <div className="absolute inset-0">
                    {/* YouTube thumbnail */}
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="Video Thumbnail"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Dark overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
                    
                    {/* Play button container */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <button
                        onClick={handlePlayClick}
                        className="group/play transform transition-all duration-300 hover:scale-110 focus:outline-none mb-8"
                        aria-label="Play video"
                      >
                        {/* Animated rings */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full opacity-0 group-hover/play:opacity-20 transition-opacity duration-300 animate-ping" />
                        <div className="absolute -inset-8 bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full opacity-0 group-hover/play:opacity-10 transition-opacity duration-300 animate-ping animation-delay-150" />
                        
                        {/* Play button background */}
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-bolt-blue to-bolt-purple p-[2px] shadow-lg shadow-bolt-blue/20">
                          <div className="w-full h-full rounded-full bg-bolt-darker/90 flex items-center justify-center backdrop-blur-sm">
                            <Play className="w-12 h-12 text-white fill-current ml-2" />
                          </div>
                        </div>
                      </button>

                      {/* Video info */}
                      <h3 className="text-3xl font-bold text-white mb-4 text-center px-6">
                        DeeLaw AI Tutorial
                      </h3>
                      <p className="text-xl text-bolt-gray-300 text-center max-w-2xl px-6">
                        Learn how to leverage AI for your legal needs
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Video features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Step-by-Step Guide",
                description: "Clear instructions on using AI"
              },
              {
                icon: <Sparkles className="w-6 h-6" />,
                title: "Pro Tips",
                description: "Expert insights for better results"
              },
              {
                icon: <Play className="w-6 h-6" />,
                title: "Real Examples",
                description: "See DeeLaw AI in action"
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
                
                <div className="relative bg-bolt-darker p-6 rounded-xl border border-bolt-gray-800 backdrop-blur-xl">
                  <div className="bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text">
                    <div className="text-transparent mb-4">{feature.icon}</div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-bolt-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;