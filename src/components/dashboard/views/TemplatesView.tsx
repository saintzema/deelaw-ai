import React, { useState } from 'react';
import { FileText, Search, Star, Clock, Filter } from 'lucide-react';

interface TemplateCategory {
  id: string;
  name: string;
  templates: Template[];
}

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  isPremium: boolean;
  isFavorite: boolean;
}

const TemplatesView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Mock template data - replace with actual API call
  const categories: TemplateCategory[] = [
    {
      id: 'agreements',
      name: 'Agreements',
      templates: [
        {
          id: '1',
          name: 'Purchase of Goods Agreement',
          description: 'A simple agreement to buy or sell goods',
          category: 'agreements',
          isPremium: false,
          isFavorite: false,
        },
        {
          id: '2',
          name: 'Non-Disclosure Agreement',
          description: 'Create an NDA fast',
          category: 'agreements',
          isPremium: true,
          isFavorite: true,
        },
      ]
    },
    {
      id: 'emails',
      name: 'Emails',
      templates: [
        {
          id: '3',
          name: 'Follow-Up Email',
          description: 'Create professional email follow up with just few clicks',
          category: 'emails',
          isPremium: false,
          isFavorite: false,
        }
      ]
    },
    // Add more categories as needed
  ];

  const filteredTemplates = categories
    .flatMap(category => category.templates)
    .filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-bolt-blue" />
          <h2 className="text-2xl font-bold text-white">Templates</h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-bolt-darker border border-bolt-gray-700 rounded-lg text-white placeholder-bolt-gray-400 focus:outline-none focus:border-bolt-blue w-64"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-bolt-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-4 py-2 bg-bolt-darker border border-bolt-gray-700 rounded-lg text-white focus:outline-none focus:border-bolt-blue appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="group relative">
            <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-bolt-blue via-bolt-purple to-bolt-blue-dark blur-sm opacity-30 group-hover:opacity-50 transition duration-300" />
            
            <div className="relative bg-bolt-darker rounded-xl border border-bolt-gray-800 p-6 backdrop-blur-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-bolt-blue/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-bolt-blue" />
                </div>
                <button className="text-bolt-gray-400 hover:text-bolt-blue transition-colors">
                  <Star className={`w-5 h-5 ${template.isFavorite ? 'fill-current text-bolt-blue' : ''}`} />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
              <p className="text-bolt-gray-400 text-sm mb-4">{template.description}</p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-bolt-gray-800">
                <div className="flex items-center gap-2 text-sm text-bolt-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>2 min</span>
                </div>
                {template.isPremium && (
                  <span className="text-xs px-2 py-1 rounded-full bg-bolt-blue/10 text-bolt-blue">
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatesView;