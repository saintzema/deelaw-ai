import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Crown } from 'lucide-react';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const { user, tokens } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 text-bolt-gray-300 hover:text-white transition-colors
              ${isActive ? 'bg-bolt-gray-800/50 text-white' : ''}
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Tokens Section */}
      <div className="p-4 border-t border-bolt-gray-800">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-bolt-gray-400">AI Tokens</span>
            <div className="flex items-center gap-2">
              <span className="text-bolt-gray-300">Free Trial</span>
              <button className="text-bolt-blue hover:text-bolt-purple transition-colors flex items-center gap-1">
                <Crown className="w-4 h-4" />
                Upgrade
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-bolt-gray-400">Next Renewal:</span>
              <span className="text-bolt-gray-300">No Renewal</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-bolt-gray-400">Words:</span>
                <span className="text-bolt-gray-300">{tokens.words}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-bolt-gray-400">Images:</span>
                <span className="text-bolt-gray-300">{tokens.images}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-bolt-gray-400">Minutes:</span>
                <span className="text-bolt-gray-300">{tokens.minutes}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-bolt-gray-400">Characters:</span>
                <span className="text-bolt-gray-300">{tokens.characters}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;