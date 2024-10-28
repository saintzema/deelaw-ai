import React, { useState, useRef } from 'react';
import { FileText, Upload, Loader2, AlertCircle, X } from 'lucide-react';

const DocumentsView: React.FC = () => {
  const [documents, setDocuments] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      documents.forEach(doc => formData.append('documents', doc));

      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      setDocuments([]);
    } catch (error) {
      setError('Failed to upload documents. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Documents</h2>

      {/* Upload Area */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-bolt-gray-700 border-dashed rounded-lg hover:border-bolt-gray-600 transition-colors">
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

          {/* Document List */}
          {documents.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Selected Documents</h3>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-bolt-gray-800/50 rounded-lg px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-bolt-blue" />
                      <div>
                        <p className="text-white font-medium">{doc.name}</p>
                        <p className="text-sm text-bolt-gray-400">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeDocument(index)}
                      className="text-bolt-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="mt-6 w-full bg-gradient-to-r from-bolt-blue to-bolt-purple text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Upload Documents
                  </>
                )}
              </button>

              {/* Error Message */}
              {error && (
                <div className="mt-4 flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentsView;