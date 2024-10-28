import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

interface CustomAI {
  id: string;
  name: string;
  description: string;
  trainingStatus: 'training' | 'ready' | 'failed';
  createdAt: Date;
  lastUsed?: Date;
}

interface TrainingData {
  name: string;
  description: string;
  documents: File[];
  websiteUrls?: string[];
}

interface AITrainingContextType {
  customAIs: CustomAI[];
  createCustomAI: (data: TrainingData) => Promise<void>;
  deleteCustomAI: (id: string) => Promise<void>;
  getTrainingStatus: (id: string) => Promise<void>;
}

const AITrainingContext = createContext<AITrainingContextType | undefined>(undefined);

export const AITrainingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customAIs, setCustomAIs] = useState<CustomAI[]>([]);
  const { user } = useAuth();

  const createCustomAI = async (data: TrainingData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      data.documents.forEach(doc => formData.append('documents', doc));
      if (data.websiteUrls) {
        formData.append('websiteUrls', JSON.stringify(data.websiteUrls));
      }

      const response = await fetch('/api/custom-ai/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to create custom AI');

      const newAI = await response.json();
      setCustomAIs(prev => [...prev, newAI]);
    } catch (error) {
      console.error('Failed to create custom AI:', error);
      throw error;
    }
  };

  const deleteCustomAI = async (id: string) => {
    try {
      const response = await fetch(`/api/custom-ai/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete custom AI');

      setCustomAIs(prev => prev.filter(ai => ai.id !== id));
    } catch (error) {
      console.error('Failed to delete custom AI:', error);
      throw error;
    }
  };

  const getTrainingStatus = async (id: string) => {
    try {
      const response = await fetch(`/api/custom-ai/${id}/status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });

      if (!response.ok) throw new Error('Failed to get training status');

      const data = await response.json();
      setCustomAIs(prev => prev.map(ai => 
        ai.id === id ? { ...ai, trainingStatus: data.status } : ai
      ));
    } catch (error) {
      console.error('Failed to get training status:', error);
      throw error;
    }
  };

  return (
    <AITrainingContext.Provider value={{
      customAIs,
      createCustomAI,
      deleteCustomAI,
      getTrainingStatus
    }}>
      {children}
    </AITrainingContext.Provider>
  );
};

export const useAITraining = () => {
  const context = useContext(AITrainingContext);
  if (context === undefined) {
    throw new Error('useAITraining must be used within an AITrainingProvider');
  }
  return context;
};