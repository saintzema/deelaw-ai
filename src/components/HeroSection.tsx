import React, { useState, useRef } from "react";
import { MapPin, FileText, Upload, AlertCircle } from "lucide-react";
import TypewriterComponent from "typewriter-effect";
import { useAuth } from "../contexts/AuthContext";
import { typewriterTexts } from "../constants/typewriterTexts";
import chatScreenImage from "../assets/chat-screen.png";
import chatInterface from "../assets/chatscreen.svg";
import AIInput from "./AIInput";
import AuthModal from "./AuthModal";
import { UserType } from "../types/auth";

interface HeroSectionProps {
  userType: UserType;
  onUserTypeChange: (type: UserType) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ userType, onUserTypeChange }) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [savedQuery, setSavedQuery] = useState<string>();
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const handleAIQuery = async (query: string, files?: File[]) => {
    if (!user) {
      setSavedQuery(query);
      setShowAuthModal(true);
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Handle file processing if present
      let processedFiles: { content: string; type: string }[] = [];
      if (files?.length) {
        processedFiles = await Promise.all(
          files.map(async (file) => {
            if (file.type.startsWith('image/')) {
              // Process image with OCR
              const content = await processImageWithOCR(file);
              return { content, type: 'image' };
            } else {
              // Process document
              const content = await processDocument(file);
              return { content, type: 'document' };
            }
          })
        );
      }

      // Prepare API request with user type context and processed files
      const response = await fetch('/api/ai/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: JSON.stringify({
          query,
          userType,
          files: processedFiles,
        })
      });

      if (!response.ok) throw new Error('Failed to process query');

      const data = await response.json();
      // Handle response (implement your logic here)
      console.log('AI Response:', data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('AI Query failed:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTypewriterClick = (text: string) => {
    setInputValue(text);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Helper functions for file processing
  const processImageWithOCR = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/ocr', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('OCR processing failed');
    const data = await response.json();
    return data.text;
  };

  const processDocument = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('document', file);

    const response = await fetch('/api/document', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Document processing failed');
    const data = await response.json();
    return data.text;
  };

  const features = [
    {
      icon: <FileText className="w-5 h-5" />,
      text: "DeeLaw can analyze legal documents",
      query: "Analyze this legal document for potential risks and obligations"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      text: "DeeLaw can explain your legal rights",
      query: "What are my rights in this situation?"
    },
    {
      icon: <FileText className="w-5 h-5" />,
      text: "DeeLaw can help draft legal documents",
      query: "Draft a contract for a business partnership"
    },
    {
      icon: <Upload className="w-5 h-5" />,
      text: "DeeLaw can process documents & images",
      query: "Upload an image of a document for analysis"
    }
  ];

  return (
    <div className="relative group">
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        savedQuery={savedQuery}
      />

      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
      
      {/* Main content */}
      <div className="relative bg-bolt-darker rounded-2xl border border-bolt-gray-800 shadow-2xl overflow-hidden p-8 mb-16 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text text-transparent">DeeLaw:</span>{" "}
              your personal legal AI assistant
            </h1>
            
            {/* User Type Selector */}
            <div className="relative w-fit mb-6">
              <div className="flex items-center bg-bolt-darker/50 p-1 rounded-full border border-bolt-gray-800">
                <button
                  onClick={() => onUserTypeChange('citizen')}
                  className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                    userType === 'citizen' ? 'text-white font-bold' : 'text-bolt-gray-400'
                  }`}
                >
                  For Citizens
                </button>
                <button
                  onClick={() => onUserTypeChange('lawyer')}
                  className={`relative z-10 px-6 py-2 text-sm font-medium transition-colors duration-200 ${
                    userType === 'lawyer' ? 'text-white' : 'text-bolt-gray-400'
                  }`}
                >
                  For Lawyers
                </button>
                <div
                  className={`absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-gradient-to-r from-bolt-blue to-bolt-purple rounded-full transition-transform duration-300 ease-in-out ${
                    userType === 'lawyer' ? 'translate-x-full' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            <p className="text-xl text-bolt-gray-300 mb-8">
              {userType === 'citizen'
                ? "Say goodbye to expensive legal consultation, long waits for appointments, and confusing legal texts."
                : "Say goodbye to routine tasks. DeeLaw automates your legal research and paperwork, granting you more free time."}
            </p>

            <div 
              className="text-xl font-semibold mb-6 h-20 bg-gradient-to-r from-bolt-blue to-bolt-purple bg-clip-text text-transparent cursor-pointer"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.textContent) {
                  handleTypewriterClick(target.textContent);
                }
              }}
            >
              <TypewriterComponent
                options={{
                  strings: typewriterTexts[userType],
                  autoStart: true,
                  loop: true,
                  cursor: '|',
                  delay: 50,
                }}
              />
            </div>

            {/* AI Input Box */}
            <div className="max-w-xl">
              <AIInput 
                onSubmit={handleAIQuery}
                placeholder={`Ask any legal question as a ${userType}...`}
                value={inputValue}
                onChange={setInputValue}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Right side with chat interface */}
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50" />
              <img
                src={chatInterface}
                alt="DeeLaw Chat Interface"
                className="relative rounded-lg shadow-2xl"
              />
              <div className="absolute -inset-[1px] -bottom-8 -right-8 w-2/3 rounded-lg" />
              <img
                src={chatScreenImage}
                alt="DeeLaw Mobile Interface"
                className="absolute -bottom-8 -right-8 w-2/3 rounded-lg shadow-2xl border-4 border-bolt-darker"
              />
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="mt-16">
          <div className="relative group">
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative bg-bolt-darker rounded-2xl p-8 shadow-lg border border-bolt-gray-800">
              <h4 className="text-2xl font-bold text-white mb-4">What can DeeLaw do?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center group cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleTypewriterClick(feature.query)}
                  >
                    <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center mr-3">
                      <div className="text-bolt-blue group-hover:text-bolt-purple transition-colors">
                        {feature.icon}
                      </div>
                    </div>
                    <p className="text-bolt-gray-300 group-hover:text-white transition-colors">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;