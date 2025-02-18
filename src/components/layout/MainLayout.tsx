import React from 'react';
import Header from '../Header';
import KeyboardHelp from '../KeyboardHelp';
import { SourceConfig } from '../../types';

interface MainLayoutProps {
  children: React.ReactNode;
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

export default function MainLayout({
  children,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onThemeToggle,
  infiniteScrollEnabled,
  onInfiniteScrollToggle,
  sources,
  onSourceToggle,
  onSourcesReorder
}: MainLayoutProps) {
  const bgColor = isDarkMode ? 'bg-[#1a1b1e]' : 'bg-gray-50';
  const borderColor = isDarkMode ? 'border-gray-800' : 'border-gray-200';

  return (
    <div className={`min-h-screen ${bgColor}`}>
      <Header 
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        isDarkMode={isDarkMode}
        onThemeToggle={onThemeToggle}
        infiniteScrollEnabled={infiniteScrollEnabled}
        onInfiniteScrollToggle={onInfiniteScrollToggle}
        sources={sources}
        onSourceToggle={onSourceToggle}
        onSourcesReorder={onSourcesReorder}
      />
      
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      
      <KeyboardHelp isDarkMode={isDarkMode} />
      
      <footer className={`border-t ${borderColor} mt-8 py-4`}>
        <div className="container mx-auto px-4 flex items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/BioInfo/hackerhome" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gray-200 transition-colors"
            >
              SOURCE CODE
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/terms" 
              className="hover:text-gray-200 transition-colors"
            >
              TERMS & CONDITIONS
            </a>
            <a 
              href="/privacy" 
              className="hover:text-gray-200 transition-colors"
            >
              PRIVACY POLICY
            </a>
            <a 
              href="/data-sources" 
              className="hover:text-gray-200 transition-colors"
            >
              DATA SOURCES
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}