import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatContainer from '../../ChatContainer';
import VoiceSettings from '../VoiceSettings';

interface LocationState {
  initialQuery?: string;
}

const ChatView: React.FC = () => {
  const location = useLocation();
  const [selectedVoice, setSelectedVoice] = useState<{
    id: string;
    name: string;
    gender: 'male' | 'female';
    preview?: string;
  }>();

  const [initialQuery, setInitialQuery] = useState<string | undefined>(
    (location.state as LocationState)?.initialQuery
  );

  // Clear the location state after using it
  useEffect(() => {
    if (initialQuery) {
      const state = window.history.state;
      window.history.replaceState(
        { ...state, initialQuery: undefined },
        ''
      );
    }
  }, [initialQuery]);

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <div className="flex-1">
        <ChatContainer 
          selectedVoice={selectedVoice}
          initialQuery={initialQuery}
        />
      </div>
      <div className="w-80 border-l border-bolt-gray-800">
        <VoiceSettings
          selectedVoice={selectedVoice}
          onVoiceChange={setSelectedVoice}
        />
      </div>
    </div>
  );
};

export default ChatView;