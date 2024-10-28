import React, { useState, useRef } from 'react';
import { 
  Brain, 
  Upload, 
  Globe, 
  Plus, 
  X, 
  FileText,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useAITraining } from '../../contexts/AITrainingContext';

const CustomAITraining: React.FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [websiteUrls, setWebsiteUrls] = useState<string[]>([]);
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createCustomAI, customAIs, deleteCustomAI } = useAITraining();


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const addWebsiteUrl = () => {
    if (newUrl && isValidUrl(newUrl)) {
      setWebsiteUrls(prev => [...prev, newUrl]);
      setNewUrl('');
      setError(null);
    } else {
      setError('Please enter a valid URL');
    }
  };

  const removeUrl = (index: number) => {
    setWebsiteUrls(prev => prev.filter((_, i) => i !== index));
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter a name for your AI');
      return;
    }

    if (documents.length === 0 && websiteUrls.length === 0) {
      setError('Please provide at least one document or website URL');
      return;
    }

    setIsCreating(true);
    try {
      await createCustomAI({
        name,
        description,
        documents,
        websiteUrls: websiteUrls.length > 0 ? websiteUrls : undefined
      });

      // Reset form
      setName('');
      setDescription('');
      setDocuments([]);
      setWebsiteUrls([]);
    } catch (error) {
      setError('Failed to create custom AI. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Brain className="w-5 h-5 text-bolt-blue" />
        <h2 className="text-xl font-bold text-white">Custom AI Training</h2>
      </div>

      {/* Training Form */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
        
        <form onSubmit={handleSubmit} className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="space-y-4">
            {/* Name and Description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                  AI Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
                  placeholder="e.g., Legal Research Assistant"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
                  placeholder="What will this AI help with?"
                />
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                Training Documents
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-bolt-gray-700 border-dashed rounded-lg hover:border-bolt-gray-600 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-bolt-gray-400" />
                  <div className="flex text-sm text-bolt-gray-400">
                    <label className="relative cursor-pointer rounded-md font-medium text-bolt-blue hover:text-bolt-purple">
                      <span>Upload files</span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-bolt-gray-400">
                    PDF, DOC, DOCX, TXT up to 10MB each
                  </p>
                </div>
              </div>
            </div>

            {/* Document List */}
            {documents.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="group/file flex items-center gap-2 bg-bolt-gray-800/50 rounded-lg px-3 py-1.5 text-sm"
                  >
                    <FileText className="w-4 h-4 text-bolt-blue" />
                    <span className="text-bolt-gray-300 max-w-[150px] truncate">
                      {doc.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDocument(index)}
                      className="text-bolt-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Website URLs */}
            <div>
              <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                Website URLs (Optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1 bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue"
                  placeholder="https://example.com"
                />
                <button
                  type="button"
                  onClick={addWebsiteUrl}
                  className="p-2 rounded-lg bg-bolt-gray-800 text-white hover:bg-bolt-gray-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* URL List */}
            {websiteUrls.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {websiteUrls.map((url, index) => (
                  <div
                    key={index}
                    className="group/url flex items-center gap-2 bg-bolt-gray-800/50 rounded-lg px-3 py-1.5 text-sm"
                  >
                    <Globe className="w-4 h-4 text-bolt-blue" />
                    <span className="text-bolt-gray-300 max-w-[200px] truncate">
                      {url}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeUrl(index)}
                      className="text-bolt-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isCreating}
              className="w-full bg-gradient-to-r from-bolt-blue to-bolt-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Training AI...
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  Start Training
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Custom AIs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customAIs.map((ai) => (
          <div key={ai.id} className="group relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-bolt-blue" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{ai.name}</h3>
                  <p className="text-sm text-bolt-gray-400">{ai.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-bolt-gray-800">
                <span className="text-sm text-bolt-gray-400">
                  {ai.trainingStatus === 'training' ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Training...
                    </span>
                  ) : ai.trainingStatus === 'ready' ? (
                    <span className="text-green-500">Ready to use</span>
                  ) : (
                    <span className="text-red-500">Training failed</span>
                  )}
                </span>
                <button
                  onClick={() => deleteCustomAI(ai.id)}
                  className="text-bolt-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomAITraining;