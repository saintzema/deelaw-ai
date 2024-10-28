import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import AIInput from './AIInput';
import AIMessage from './AIMessage';
import { useAuth } from '../contexts/AuthContext';
import { mockApi } from '../services/mockApi';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  audioUrl?: string;
  timestamp: Date;
}

interface ChatContainerProps {
  selectedVoice?: {
    id: string;
    name: string;
    gender: 'male' | 'female';
    preview?: string;
  };
  initialQuery?: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ 
  selectedVoice,
  initialQuery 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { user, tokens, updateTokens } = useAuth();
  const hasInitialQueryRun = useRef(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery && !hasInitialQueryRun.current && user) {
      handleSubmit(initialQuery);
      hasInitialQueryRun.current = true;
    }
  }, [initialQuery, user]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (query: string, files?: File[]) => {
    if (!user) return;

    setIsProcessing(true);
    
    try {
      // Add user message
      const userMessage: Message = {
        id: crypto.randomUUID(),
        content: query,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);

      // Mock AI response
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiResponse = `This is a mock response to: "${query}"`;

      // Add AI message
      const aiMessage: Message = {
        id: crypto.randomUUID(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);

      // Update tokens
      const wordsUsed = query.split(/\s+/).length;
      updateTokens({
        words: tokens.words - wordsUsed
      });

    } catch (error) {
      console.error('Chat error:', error);
      // Add error message
      setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVoiceMessage = async (audioBlob: Blob, transcription: string) => {
    await handleSubmit(transcription);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-bolt-blue/10 flex items-center justify-center mx-auto mb-6">
              <Bot className="w-8 h-8 text-bolt-blue" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Welcome to DeeLaw AI
            </h2>
            <p className="text-bolt-gray-300 max-w-md">
              I'm your AI legal assistant. Ask me anything about law, or upload documents for analysis.
              {selectedVoice && " I can also speak my responses!"}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-bolt-gray-400">
              <Sparkles className="w-4 h-4 text-bolt-purple" />
              <span>Powered by advanced AI</span>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map(message => (
          <AIMessage
            key={message.id}
            content={message.content}
            isUser={message.isUser}
            audioUrl={message.audioUrl}
            onRequestVoice={
              !message.isUser && selectedVoice 
                ? async () => {
                    // Mock voice generation
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return '/mock-audio-url.mp3';
                  }
                : undefined
            }
          />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-bolt-gray-800">
        <AIInput
          onSubmit={handleSubmit}
          onVoiceMessage={handleVoiceMessage}
          placeholder={isProcessing ? "Processing..." : "Ask me anything about law..."}
          disabled={isProcessing}
        />
      </div>
    </div>
  );
};

export default ChatContainer;