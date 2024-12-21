import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ChatContainer from '../../ChatContainer';
import VoiceSettings from '../VoiceSettings';

interface ChatViewProps {
  initialQuery?: string;
}

const ChatView: React.FC<ChatViewProps> = ({ initialQuery: propInitialQuery }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedVoice, setSelectedVoice] = useState<{
    id: string;
    name: string;
    gender: 'male' | 'female';
    preview?: string;
  } | undefined>(undefined);

  // Use propInitialQuery if present, otherwise check for query param or location state
  const [initialQuery, setInitialQuery] = useState<string | undefined>(() => {
    if (propInitialQuery) return propInitialQuery;
    
    const searchParams = new URLSearchParams(location.search);
    const queryFromParam = searchParams.get('query');
    
    if (queryFromParam) {
      return decodeURIComponent(queryFromParam);
    }

    return (location.state as { initialQuery?: string })?.initialQuery;
  });

  // Clear the initialQuery from both URL and state after using it
  useEffect(() => {
    if (initialQuery) {
      navigate(location.pathname, { replace: true }); // Remove query param from URL
      window.history.replaceState({ ...window.history.state, initialQuery: undefined }, '');
      setInitialQuery(undefined); // Clear local state
    }
  }, [initialQuery, location, navigate]);

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