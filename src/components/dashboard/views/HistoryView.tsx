import React, { useState } from 'react';
import { History, MessageSquare, FileText, Mic, Filter, Search, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface HistoryItem {
  id: string;
  type: 'chat' | 'document' | 'voice';
  content: string;
  timestamp: Date;
  audioUrl?: string;
}

const HistoryView: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'chat' | 'document' | 'voice'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock history data - replace with actual API call
  const historyItems: HistoryItem[] = [
    {
      id: '1',
      type: 'chat',
      content: 'What are my rights during a police stop?',
      timestamp: new Date('2024-02-20T10:30:00')
    },
    {
      id: '2',
      type: 'document',
      content: 'Employment_Contract.pdf',
      timestamp: new Date('2024-02-19T15:45:00')
    },
    {
      id: '3',
      type: 'voice',
      content: 'Voice message about tenant rights',
      timestamp: new Date('2024-02-18T09:15:00'),
      audioUrl: '/voice-messages/message-1.mp3'
    }
  ];

  const filteredItems = historyItems.filter(item => {
    const matchesFilter = filter === 'all' || item.type === filter;
    const matchesSearch = item.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'chat':
        return <MessageSquare className="w-5 h-5 text-bolt-blue" />;
      case 'document':
        return <FileText className="w-5 h-5 text-bolt-purple" />;
      case 'voice':
        return <Mic className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History className="w-6 h-6 text-bolt-blue" />
          <h2 className="text-2xl font-bold text-white">History</h2>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
            <input
              type="text"
              placeholder="Search history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-bolt-darker border border-bolt-gray-700 rounded-lg text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue w-64"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="pl-10 pr-4 py-2 bg-bolt-darker border border-bolt-gray-700 rounded-lg text-white focus:outline-none focus:border-bolt-blue appearance-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="chat">Chats</option>
              <option value="document">Documents</option>
              <option value="voice">Voice</option>
            </select>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group relative"
          >
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-bolt-gray-800/50 flex items-center justify-center">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{item.content}</h3>
                    <div className="flex items-center gap-2 text-sm text-bolt-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{format(item.timestamp, 'PPp')}</span>
                    </div>
                  </div>
                </div>

                <button className="text-bolt-gray-400 hover:text-white transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryView;