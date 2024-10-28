import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Crown, 
  FileText, 
  Image as ImageIcon, 
  Clock, 
  Type, 
  CreditCard,  
  Book, 
  Users, 
  Receipt, 
  Bell, 
  Settings, 
  Lock, 
  LogOut,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface StatMenuItem {
  type: 'stat';
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface LinkMenuItem {
  type: 'link';
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface ActionMenuItem {
  type: 'action';
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

type MenuItem = StatMenuItem | LinkMenuItem | ActionMenuItem;

interface MenuSection {
  type: 'stats' | 'links';
  items: MenuItem[];
}

const UserProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems: MenuSection[] = [
    {
      type: 'stats',
      items: [
        { type: 'stat', icon: <MessageSquare className="w-4 h-4" />, label: 'Words', value: '4.6K' },
        { type: 'stat', icon: <ImageIcon className="w-4 h-4" />, label: 'Images', value: '0' },
        { type: 'stat', icon: <Clock className="w-4 h-4" />, label: 'Minutes', value: '5' },
        { type: 'stat', icon: <Type className="w-4 h-4" />, label: 'Characters', value: '812' },
      ]
    },
    {
      type: 'links',
      items: [
        { type: 'link', icon: <Crown className="w-4 h-4" />, label: 'Pricing Plans', path: '/dashboard/billing' },
        { type: 'link', icon: <FileText className="w-4 h-4" />, label: 'Templates', path: '/dashboard/templates' },
        { type: 'link', icon: <Book className="w-4 h-4" />, label: 'Workbooks', path: '/dashboard/workbooks' },
        { type: 'link', icon: <Users className="w-4 h-4" />, label: 'Affiliate Program', path: '/dashboard/affiliate' },
      ]
    },
    {
      type: 'links',
      items: [
        { type: 'link', icon: <Receipt className="w-4 h-4" />, label: 'Transactions', path: '/dashboard/transactions' },
        { type: 'link', icon: <CreditCard className="w-4 h-4" />, label: 'Subscriptions', path: '/dashboard/subscriptions' },
        { type: 'link', icon: <MessageSquare className="w-4 h-4" />, label: 'Support Request', path: '/dashboard/support' },
        { type: 'link', icon: <Bell className="w-4 h-4" />, label: 'Notifications', path: '/dashboard/notifications' },
      ]
    },
    {
      type: 'links',
      items: [
        { type: 'link', icon: <User className="w-4 h-4" />, label: 'My Profile', path: '/dashboard/profile' },
        { type: 'link', icon: <Lock className="w-4 h-4" />, label: 'Change Password', path: '/dashboard/password' },
        { type: 'action', icon: <LogOut className="w-4 h-4" />, label: 'Logout', onClick: logout },
      ]
    }
  ];

  const renderMenuItem = (item: MenuItem) => {
    if (item.type === 'stat') {
      return (
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-bolt-gray-800/50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-bolt-gray-800/50 flex items-center justify-center text-bolt-blue">
            {item.icon}
          </div>
          <div>
            <div className="text-sm font-medium text-white">{item.value}</div>
            <div className="text-xs text-bolt-gray-400">{item.label}</div>
          </div>
        </div>
      );
    }

    if (item.type === 'action') {
      return (
        <button
          onClick={item.onClick}
          className="w-full flex items-center gap-3 px-4 py-2 text-bolt-gray-300 hover:text-white hover:bg-bolt-gray-800/50 transition-colors"
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      );
    }

    return (
      <Link
        to={item.path}
        className="flex items-center gap-3 px-4 py-2 text-bolt-gray-300 hover:text-white hover:bg-bolt-gray-800/50 transition-colors"
      >
        {item.icon}
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
        <div className="relative w-10 h-10 rounded-full bg-bolt-darker border border-bolt-gray-700 flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.firstName} 
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-bolt-gray-400" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 z-50">
          <div className="group relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b border-bolt-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-bolt-gray-800 flex items-center justify-center">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.firstName} 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6 text-bolt-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <p className="text-sm text-bolt-gray-400">Happy Person</p>
                  </div>
                </div>

                {/* Plan Info */}
                <div className="mt-3 flex items-center justify-between bg-bolt-gray-800/50 rounded-lg p-2">
                  <span className="text-sm text-bolt-gray-300">Plan: Free Trial</span>
                  <Link
                    to="/dashboard/billing"
                    className="text-sm text-bolt-blue hover:text-bolt-purple transition-colors flex items-center gap-1"
                  >
                    Upgrade Now
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Menu Sections */}
              {menuItems.map((section, sectionIndex) => (
                <div
                  key={sectionIndex}
                  className={section.type === 'stats' 
                    ? "grid grid-cols-2 gap-2 p-3 border-b border-bolt-gray-800"
                    : "border-b border-bolt-gray-800 last:border-b-0"
                  }
                >
                  {section.items.map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      {renderMenuItem(item)}
                    </React.Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;