import React, { useState } from 'react';
import { Volume2, Play, Check } from 'lucide-react';

interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  preview?: string;
  description?: string;
}

interface VoiceSettingsProps {
  selectedVoice?: Voice;
  onVoiceChange: (voice: Voice) => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({
  selectedVoice,
  onVoiceChange
}) => {
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  const voices: Voice[] = [
    {
      id: 'sarah',
      name: 'Sarah',
      gender: 'female',
      description: 'Professional and clear voice',
      preview: '/voices/sarah-preview.mp3'
    },
    {
      id: 'james',
      name: 'James',
      gender: 'male',
      description: 'Authoritative and trustworthy',
      preview: '/voices/james-preview.mp3'
    },
    {
      id: 'emma',
      name: 'Emma',
      gender: 'female',
      description: 'Friendly and approachable',
      preview: '/voices/emma-preview.mp3'
    },
    {
      id: 'michael',
      name: 'Michael',
      gender: 'male',
      description: 'Confident and engaging',
      preview: '/voices/michael-preview.mp3'
    }
  ];

  const playPreview = (voiceId: string, previewUrl?: string) => {
    if (!previewUrl) return;

    if (isPlaying === voiceId) {
      // Stop playing
      setIsPlaying(null);
    } else {
      // Start playing
      setIsPlaying(voiceId);
      const audio = new Audio(previewUrl);
      audio.play();
      audio.onended = () => setIsPlaying(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Volume2 className="w-5 h-5 text-bolt-blue" />
        <h2 className="text-xl font-bold text-white">Voice Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {voices.map((voice) => (
          <div
            key={voice.id}
            className={`group relative cursor-pointer ${
              selectedVoice?.id === voice.id ? 'scale-[1.02]' : ''
            }`}
            onClick={() => onVoiceChange(voice)}
          >
            {/* Gradient border effect */}
            <div className={`absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm transition-opacity duration-300 ${
              selectedVoice?.id === voice.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
            }`} />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                {selectedVoice?.id === voice.id ? (
                  <Check className="w-6 h-6 text-bolt-blue" />
                ) : (
                  <Volume2 className="w-6 h-6 text-bolt-blue" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-1">
                  {voice.name}
                </h3>
                <p className="text-sm text-bolt-gray-400">
                  {voice.description}
                </p>
              </div>

              {voice.preview && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playPreview(voice.id, voice.preview);
                  }}
                  className="p-2 rounded-lg hover:bg-bolt-gray-800/50 transition-colors"
                >
                  <Play className={`w-5 h-5 ${
                    isPlaying === voice.id ? 'text-bolt-blue' : 'text-bolt-gray-400'
                  }`} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VoiceSettings;