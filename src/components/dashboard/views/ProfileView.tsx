import React, { useState } from 'react';
import { 
  User,
  Mail,
  Building,
  Globe,
  MapPin,
  Phone,
  Lock,
  Shield,
  Trash2,
  Save,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Mic,
  AudioLines,
  Code,
  Crown,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { Line } from 'react-chartjs-2';

const ProfileView: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    jobRole: 'Happy Person',
    company: '',
    website: '',
    city: '',
    country: 'Nigeria',
    phone: '',
  });

  // Mock usage data
  const usage = [
    { icon: <FileText className="w-5 h-5" />, label: 'Documents Created', value: '0 documents' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Words Generated', value: '0 words' },
    { icon: <ImageIcon className="w-5 h-5" />, label: 'Images Created', value: '0 images' },
    { icon: <Mic className="w-5 h-5" />, label: 'Voiceover Tasks', value: '6 tasks' },
    { icon: <AudioLines className="w-5 h-5" />, label: 'Audio Transcribed', value: '0 audio files' },
    { icon: <Code className="w-5 h-5" />, label: 'Codes Generated', value: '1 codes' },
  ];

  // Mock chart data
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Words Generated',
        data: [0, 0, 0, 0, 0, 4657, 0, 0, 0, 0, 0, 0],
        borderColor: '#0066FF',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        fill: true,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Profile Header */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-bolt-gray-800 flex items-center justify-center">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-bolt-gray-400" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-bolt-blue text-white flex items-center justify-center hover:bg-bolt-purple transition-colors">
                <User className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-white">
                {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-bolt-gray-400">Happy Person</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="text-sm">
                  <span className="text-bolt-gray-400">Words Left:</span>{' '}
                  <span className="text-white font-medium">4.6K / 0</span>
                </div>
                <div className="text-sm">
                  <span className="text-bolt-gray-400">Images Left:</span>{' '}
                  <span className="text-white font-medium">0 / 0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
            {[
              { icon: <User className="w-4 h-4" />, label: 'Update Profile' },
              { icon: <Save className="w-4 h-4" />, label: 'Set Defaults' },
              { icon: <Lock className="w-4 h-4" />, label: 'Change Password' },
              { icon: <Shield className="w-4 h-4" />, label: '2FA Authentication' },
              { icon: <Trash2 className="w-4 h-4" />, label: 'Delete Account' },
            ].map((action, index) => (
              <button
                key={index}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-bolt-gray-800/50 text-bolt-gray-300 hover:text-white hover:bg-bolt-gray-700 transition-colors text-sm"
              >
                {action.icon}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Details */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
        
        <form
          onSubmit={handleSubmit}
          className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl"
        >
          <h2 className="text-xl font-bold text-white mb-6">Personal Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={`${formData.firstName} ${formData.lastName}`}
                disabled={!isEditing}
                className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                Referral ID
              </label>
              <input
                type="text"
                value="KHXYBUJVFNPJZ03"
                disabled
                className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bolt-gray-300 mb-1">
                Job Role
              </label>
              <input
                type="text"
                value={formData.jobRole}
                onChange={(e) => setFormData(prev => ({ ...prev, jobRole: e.target.value }))}
                disabled={!isEditing}
                className="w-full bg-bolt-darker border border-bolt-gray-700 rounded-lg px-4 py-2 text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue disabled:opacity-50"
              />
            </div>

            {/* Add more fields as needed */}
          </div>
        </form>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {usage.map((stat, index) => (
          <div key={index} className="group relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                  <div className="text-bolt-blue">{stat.icon}</div>
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-bolt-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subscription */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Crown className="w-6 h-6 text-bolt-blue" />
              <h2 className="text-xl font-bold text-white">Subscription</h2>
            </div>
            <button className="px-4 py-2 bg-bolt-blue text-white rounded-lg hover:bg-bolt-purple transition-colors">
              Upgrade Plan
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-medium text-white">Free Trial</p>
            <p className="text-bolt-gray-400">No Subscription / $0.00 Per Month</p>
            <p className="text-sm text-bolt-gray-300">
              Total words available via subscription plan 0. Total prepaid words available 4,657.
            </p>
          </div>
        </div>
      </div>

      {/* Usage Chart */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-6 h-6 text-bolt-blue" />
            <h2 className="text-xl font-bold text-white">Words & Images Generated (Current Year)</h2>
          </div>
          
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-bolt-gray-400 pt-8 border-t border-bolt-gray-800">
        <p>Copyright © 2024 DeeLaw.ai. All rights reserved</p>
        <p className="mt-1">v2.6</p>
      </footer>
    </div>
  );
};

export default ProfileView;