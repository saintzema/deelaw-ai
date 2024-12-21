import React, { useState } from 'react';
import { 
  MessageSquare, 
  FileText, 
  Settings, 
  CreditCard, 
  Menu, 
  X,
  Sun,
  Moon,
  Users,
  History,
  Brain
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { useTheme } from '../../contexts/ThemeContext';
import UserProfileDropdown from './UserProfileDropdown';
import EmailVerificationBanner from './EmailVerificationBanner';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, isEmailVerified } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Chat', path: '/dashboard/chat' },
    { icon: <FileText className="w-5 h-5" />, label: 'Documents', path: '/dashboard/documents' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Templates', path: '/dashboard/templates' },
    { icon: <History className="w-5 h-5" />, label: 'History', path: '/dashboard/history' },
    { icon: <Users className="w-5 h-5" />, label: 'Team', path: '/dashboard/team' },
    { icon: <Brain className="w-5 h-5" />, label: 'Custom AI', path: '/dashboard/custom-ai' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/dashboard/settings' },
    { icon: <CreditCard className="w-5 h-5" />, label: 'Billing', path: '/dashboard/billing' },
  ];

  // Redirect or show a login screen if no user is found
  if (!user) {
    window.location.href = '/login'; 
    return null;
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-bolt-darker text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Top Bar */}
      <header className={`fixed top-0 left-0 right-0 h-16 z-50 ${theme === 'dark' ? 'bg-bolt-darker border-bolt-gray-800' : 'bg-white border-gray-200'} border-b`}>
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-bolt-gray-800/50' : 'hover:bg-gray-100'}`}
            >
              {isSidebarOpen ? (
                <X className={`w-6 h-6 ${theme === 'dark' ? 'text-bolt-gray-300' : 'text-gray-600'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${theme === 'dark' ? 'text-bolt-gray-300' : 'text-gray-600'}`} />
              )}
            </button>

            <div className="flex items-center gap-2">
              <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                DeeLaw
              </span>
              <span className="text-bolt-blue bg-clip-text text-transparent bg-gradient-to-r from-bolt-blue to-bolt-purple">
                AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-bolt-gray-800/50 text-bolt-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <div className={`text-right mr-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <p className="font-medium">{user?.firstName ?? 'Unknown'} {user?.lastName ?? ''}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-bolt-gray-400' : 'text-gray-500'}`}>
                {user?.tokens?.words?.toLocaleString() || '0'} words remaining
              </p>
            </div>

            <UserProfileDropdown />
          </div>
        </div>
      </header>

      {/* Email Verification Banner */}
      {!isEmailVerified && (
        <div className="fixed top-16 left-0 right-0 z-40">
          <EmailVerificationBanner />
        </div>
      )}

      {/* Sidebar */}
      <aside className={`fixed top-16 bottom-0 left-0 w-64 ${theme === 'dark' ? 'bg-bolt-darker border-bolt-gray-800' : 'bg-white border-gray-200'} border-r transform transition-transform duration-300 z-30 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar menuItems={menuItems} />
      </aside>

      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6">
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;