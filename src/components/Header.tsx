import React from 'react';
import { Home, Search, Settings, Moon, Sun, Infinity, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import SettingsDialog from './SettingsDialog';
import type { SourceConfig } from '../types';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  infiniteScrollEnabled: boolean;
  onInfiniteScrollToggle: () => void;
  sources: SourceConfig[];
  onSourceToggle: (sourceId: string) => void;
  onSourcesReorder: (sources: SourceConfig[]) => void;
}

export default function Header({ 
  searchQuery, 
  onSearchChange, 
  isDarkMode, 
  onThemeToggle,
  infiniteScrollEnabled,
  onInfiniteScrollToggle,
  sources,
  onSourceToggle,
  onSourcesReorder
}: HeaderProps) {
  const bgColor = isDarkMode ? 'bg-[#1a1b1e]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const inputBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-100';
  const inputTextColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const iconColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const hoverBgColor = isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100';

  return (
    <header className={`${bgColor} p-4 border-b ${borderColor}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className={`flex items-center ${textColor} hover:opacity-80 transition-opacity`}>
            <Home className="w-6 h-6 mr-2" />
            <span className="text-xl font-semibold">HackerHome</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className={`absolute left-3 top-2.5 w-5 h-5 ${iconColor}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search across all sources..."
              className={`w-96 pl-10 pr-4 py-2 ${inputBgColor} ${inputTextColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          
          <div className={`flex items-center space-x-2 ${iconColor}`}>
            <button 
              className={`p-2 rounded-lg ${hoverBgColor} group relative`}
              onClick={onInfiniteScrollToggle}
            >
              {infiniteScrollEnabled ? <Infinity className="w-5 h-5" /> : <List className="w-5 h-5" />}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {infiniteScrollEnabled ? 'Disable infinite scroll' : 'Enable infinite scroll'}
              </span>
            </button>
            <button 
              className={`p-2 rounded-lg ${hoverBgColor} group relative`}
              onClick={onThemeToggle}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Toggle {isDarkMode ? 'light' : 'dark'} mode
              </span>
            </button>
            <button 
              className={`p-2 rounded-lg ${hoverBgColor} group relative`}
              onClick={() => document.getElementById('settings-dialog')?.showModal()}
            >
              <Settings className="w-5 h-5" />
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Settings
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <SettingsDialog 
        isDarkMode={isDarkMode}
        infiniteScrollEnabled={infiniteScrollEnabled}
        onThemeToggle={onThemeToggle}
        onInfiniteScrollToggle={onInfiniteScrollToggle}
        sources={sources}
        onSourceToggle={onSourceToggle}
        onSourcesReorder={onSourcesReorder}
      />
    </header>
  );
}