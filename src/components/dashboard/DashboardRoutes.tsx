import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  // Check if there's a query parameter in the URL
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('query');

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname + location.search }} replace />;
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route 
          path="/" 
          element={
            <Navigate 
              to={initialQuery ? `/dashboard/chat?query=${encodeURIComponent(initialQuery)}` : "/dashboard/chat"} 
              replace 
            />
          } 
        />
        <Route 
          path="/chat" 
          element={
            <ChatView 
              initialQuery={initialQuery ? decodeURIComponent(initialQuery) : undefined}
            />
          } 
        />
        <Route path="/home" element={<HomeView />} />
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