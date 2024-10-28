import React, { useState } from 'react';
import { Settings, Volume2, Brain } from 'lucide-react';
import VoiceSettings from '../VoiceSettings';
import CustomAITraining from '../CustomAITraining';

interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female';
  preview?: string;
}

const SettingsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'voice' | 'ai'>('voice');
  const [selectedVoice, setSelectedVoice] = useState<Voice>();

  const handleVoiceChange = (voice: Voice) => {
    setSelectedVoice(voice);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>

      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'voice'
              ? 'bg-bolt-blue text-white'
              : 'text-bolt-gray-400 hover:text-white'
          }`}
        >
          <Volume2 className="w-5 h-5" />
          Voice Settings
        </button>
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'ai'
              ? 'bg-bolt-blue text-white'
              : 'text-bolt-gray-400 hover:text-white'
          }`}
        >
          <Brain className="w-5 h-5" />
          Custom AI
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'voice' ? (
          <VoiceSettings
            selectedVoice={selectedVoice}
            onVoiceChange={handleVoiceChange}
          />
        ) : (
          <CustomAITraining />
        )}
      </div>
    </div>
  );
};

export default SettingsView;