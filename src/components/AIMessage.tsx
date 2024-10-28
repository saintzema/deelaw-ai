import React, { useState } from 'react';
import { Bot, User, Volume2, Loader2 } from 'lucide-react';
import AudioPlayer from './AudioPlayer';

interface AIMessageProps {
  content: string;
  isUser?: boolean;
  audioUrl?: string;
  onRequestVoice?: () => Promise<string>;
}

const AIMessage: React.FC<AIMessageProps> = ({
  content,
  isUser = false,
  audioUrl,
  onRequestVoice
}) => {
  const [isGeneratingVoice, setIsGeneratingVoice] = useState(false);
  const [messageAudioUrl, setMessageAudioUrl] = useState(audioUrl);

  const handleVoiceRequest = async () => {
    if (!onRequestVoice) return;

    setIsGeneratingVoice(true);
    try {
      const url = await onRequestVoice();
      setMessageAudioUrl(url);
    } catch (error) {
      console.error('Failed to generate voice:', error);
    } finally {
      setIsGeneratingVoice(false);
    }
  };

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
        isUser ? 'bg-bolt-purple/10' : 'bg-bolt-blue/10'
      }`}>
        {isUser ? (
          <User className="w-5 h-5 text-bolt-purple" />
        ) : (
          <Bot className="w-5 h-5 text-bolt-blue" />
        )}
      </div>

      <div className={`flex-1 space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
        <div className="group relative inline-block max-w-3xl">
          {/* Gradient border effect */}
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
          
          <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 backdrop-blur-xl">
            <p className="text-bolt-gray-300 whitespace-pre-wrap">{content}</p>

            {!isUser && !messageAudioUrl && onRequestVoice && (
              <button
                onClick={handleVoiceRequest}
                disabled={isGeneratingVoice}
                className="mt-3 flex items-center gap-2 text-sm text-bolt-gray-400 hover:text-white transition-colors disabled:opacity-50"
              >
                {isGeneratingVoice ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating voice...
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4" />
                    Listen to response
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {messageAudioUrl && !isUser && (
          <AudioPlayer 
            audioUrl={messageAudioUrl}
            onReplay={onRequestVoice}
          />
        )}
      </div>
    </div>
  );
};

export default AIMessage;