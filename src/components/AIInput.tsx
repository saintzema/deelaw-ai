import React, { useState, useRef } from 'react';
import { SendHorizontal, Paperclip, X, FileText, Image, Loader2 } from 'lucide-react';

interface AIInputProps {
  onSubmit: (query: string, files?: File[]) => void;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const AIInput: React.FC<AIInputProps> = ({ 
  onSubmit, 
  placeholder = "Ask DeeLaw anything...",
  value,
  onChange
}) => {
  const [query, setQuery] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use controlled input if value and onChange are provided
  const isControlled = value !== undefined && onChange !== undefined;
  const inputValue = isControlled ? value : query;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() || files.length > 0) {
      setIsUploading(true);
      try {
        await onSubmit(inputValue, files);
        if (!isControlled) {
          setQuery('');
        }
        setFiles([]);
      } catch (error) {
        console.error('Submission failed:', error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (isControlled) {
      onChange(newValue);
    } else {
      setQuery(newValue);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div className="relative group">
      {/* Gradient border effect */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
      
      <form 
        onSubmit={handleSubmit}
        className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 overflow-hidden backdrop-blur-xl"
      >
        {/* File attachments display */}
        {files.length > 0 && (
          <div className="px-4 pt-3 flex flex-wrap gap-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="group/file flex items-center gap-2 bg-bolt-gray-800/50 rounded-lg px-3 py-1.5 text-sm"
              >
                {getFileIcon(file)}
                <span className="text-bolt-gray-300 max-w-[150px] truncate">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-bolt-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="flex items-center px-4 py-3">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-bolt-gray-400 focus:outline-none"
          />
          
          {/* File attachment button */}
          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-lg hover:bg-bolt-gray-800/50 transition-colors text-bolt-gray-400 hover:text-white"
              title="Attach files"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isUploading || (!inputValue.trim() && files.length === 0)}
              className="p-2 rounded-lg hover:bg-bolt-gray-800/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <Loader2 className="w-5 h-5 text-bolt-blue animate-spin" />
              ) : (
                <SendHorizontal className="w-5 h-5 text-bolt-blue" />
              )}
            </button>
          </div>
        </div>

        {/* File upload progress indicator */}
        {isUploading && (
          <div className="h-1 bg-bolt-gray-800">
            <div className="h-full bg-gradient-to-r from-bolt-blue to-bolt-purple animate-progress" />
          </div>
        )}
      </form>
    </div>
  );
};

export default AIInput;