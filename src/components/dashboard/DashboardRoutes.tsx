import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import HomeView from './views/HomeView';
import ChatView from './views/ChatView';
import DocumentsView from './views/DocumentsView';
import TemplatesView from './views/TemplatesView';
import HistoryView from './views/HistoryView';
import TeamView from './views/TeamView';
import CustomAIView from './views/CustomAIView';
import SettingsView from './views/SettingsView';
import BillingView from './views/BillingView';
import ProfileView from './views/ProfileView';
import { useAuth } from '../../contexts/AuthContext';

const DashboardRoutes: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/chat" replace />} />
        <Route path="/chat" element={<ChatView />} />
        <Route path="/documents" element={<DocumentsView />} />
        <Route path="/templates" element={<TemplatesView />} />
        <Route path="/history" element={<HistoryView />} />
        <Route path="/team" element={<TeamView />} />
        <Route path="/custom-ai" element={<CustomAIView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="/billing" element={<BillingView />} />
        <Route path="/profile" element={<ProfileView />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;