import React from 'react';
import { 
  Crown, 
  ArrowRight, 
  Star,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  Code,
  Mic,
  AudioLines,
  BarChart3,
  Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const HomeView: React.FC = () => {
  const { user } = useAuth();

  // Mock data for the chart
  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: 'Words Generated',
        data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 1000)),
        fill: true,
        borderColor: '#0066FF',
        backgroundColor: 'rgba(0, 102, 255, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
    },
  };

  const stats = [
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Words Left', value: '4,657' },
    { icon: <ImageIcon className="w-5 h-5" />, label: 'Images Left', value: '0' },
    { icon: <FileText className="w-5 h-5" />, label: 'Characters Left', value: '812' },
    { icon: <Mic className="w-5 h-5" />, label: 'Minutes Left', value: '5' },
  ];

  const usage = [
    { icon: <FileText className="w-5 h-5" />, label: 'Documents Created', value: '0 contents' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Words Generated', value: '0 words' },
    { icon: <ImageIcon className="w-5 h-5" />, label: 'Images Created', value: '0 images' },
    { icon: <Code className="w-5 h-5" />, label: 'Codes Generated', value: '1 codes' },
    { icon: <Mic className="w-5 h-5" />, label: 'Voiceover Tasks', value: '6 tasks' },
    { icon: <AudioLines className="w-5 h-5" />, label: 'Audio Transcribed', value: '0 audio files' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-50 group-hover:opacity-100 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Welcome, {user?.firstName} {user?.lastName}
              </h1>
              <p className="text-bolt-gray-400">
                Your account is currently part of our Free plan
              </p>
            </div>
            <Link
              to="/dashboard/billing"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-bolt-blue to-bolt-purple text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
            >
              <Crown className="w-5 h-5" />
              Upgrade Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="group relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                  <div className="text-bolt-blue">{stat.icon}</div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-bolt-gray-400">{stat.label}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
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

      {/* Favorites Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Favorite AI Assistants */}
        <div className="group relative">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
          
          <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-bolt-blue" />
              <h2 className="text-lg font-bold text-white">Favorite AI Chat Assistants</h2>
            </div>
            <p className="text-bolt-gray-400 text-sm mb-4">
              Have your favorite AI chat assistants handy anytime you need them
            </p>
            <p className="text-bolt-gray-400 text-sm">
              To add AI chat assistant as your favorite ones, simply click on the star icon on desired AI Chat Assistants
            </p>
          </div>
        </div>

        {/* Favorite Templates */}
        <div className="group relative">
          <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
          
          <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-bolt-blue" />
              <h2 className="text-lg font-bold text-white">Favorite Templates</h2>
            </div>
            <p className="text-bolt-gray-400 text-sm mb-4">
              Always have your top favorite templates handy whenever you need them
            </p>
            <p className="text-bolt-gray-400 text-sm">
              To add templates as your favorite ones, simply click on the star icon on desired templates
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="group relative">
        <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
        
        <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-bolt-blue" />
            <h2 className="text-lg font-bold text-white">Word Generation (Current Month)</h2>
          </div>
          <p className="text-bolt-gray-400 text-sm mb-6">
            Monitor your daily word generation closely
          </p>
          <div className="h-[300px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-sm text-bolt-gray-400 pt-8 border-t border-bolt-gray-800">
        <p>Copyright © 2024 DeeLaw.ai (A Zema Tech Company) All rights reserved</p>
        <p className="mt-1">v2.6</p>
      </footer>
    </div>
  );
};

export default HomeView;