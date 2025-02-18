import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import NewsSection from './components/sections/NewsSection';
import GithubSection from './components/sections/GithubSection';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DataSourcesPage from './pages/DataSourcesPage';
import { 
  fetchHNStories, 
  fetchDevToArticles, 
  fetchTrendingRepos, 
  fetchProductHuntPosts, 
  fetchMediumArticles 
} from './api';
import { useNewsSource } from './hooks/useNewsSource';
import { useSearch } from './hooks/useSearch';
import { useTheme } from './hooks/useTheme';
import type { 
  NewsItem, 
  GithubRepo, 
  HNFeed, 
  DevToFeed, 
  Section, 
  SourceConfig 
} from './types';

function HomePage() {
  // Source configuration
  const [sources, setSources] = useState<SourceConfig[]>([
    { id: 'hackernews', name: 'Hacker News', description: 'Tech news and discussions', enabled: true, icon: 'newspaper' },
    { id: 'devto', name: 'DEV.to', description: 'Developer community articles', enabled: true, icon: 'code' },
    { id: 'github', name: 'GitHub', description: 'Trending repositories', enabled: true, icon: 'github' },
    { id: 'hashnode', name: 'Hashnode', description: 'Developer blogs and articles', enabled: false, icon: 'pen-tool' },
    { id: 'lobsters', name: 'Lobsters', description: 'Technology focused link aggregation', enabled: false, icon: 'bookmark' },
    { id: 'producthunt', name: 'Product Hunt', description: 'New products and startups', enabled: false, icon: 'rocket' },
    { id: 'medium', name: 'Medium', description: 'Tech articles and blogs', enabled: false, icon: 'book' }
  ]);

  // Feed states
  const [timeRange, setTimeRange] = useState<string>('daily');
  const [devToFeed, setDevToFeed] = useState<DevToFeed>('top');
  const [hnFeed, setHNFeed] = useState<HNFeed>('top');
  const [activeSection, setActiveSection] = useState<Section>('hackernews');
  const [searchQuery, setSearchQuery] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(true);

  // News sources
  const {
    items: news,
    loading: hnLoading,
    loadMore: loadMoreHN,
    loadingMore: loadingMoreHN
  } = useNewsSource({
    fetchFn: (page) => fetchHNStories(hnFeed, page),
    enabled: sources.find(s => s.id === 'hackernews')?.enabled ?? false
  });

  const {
    items: devToArticles,
    loading: devToLoading,
    loadMore: loadMoreDevTo,
    loadingMore: loadingMoreDevTo
  } = useNewsSource({
    fetchFn: (page) => fetchDevToArticles(devToFeed, page),
    enabled: sources.find(s => s.id === 'devto')?.enabled ?? false
  });

  const {
    items: repos,
    loading: githubLoading,
    loadMore: loadMoreGithub,
    loadingMore: loadingMoreGithub
  } = useNewsSource({
    fetchFn: (page) => fetchTrendingRepos(timeRange, page),
    enabled: sources.find(s => s.id === 'github')?.enabled ?? false
  });

  // Search functionality
  const { filteredItems: filteredNews } = useSearch<NewsItem>({ 
    items: news, 
    searchFields: ['title'] 
  });
  const { filteredItems: filteredDevToArticles } = useSearch<NewsItem>({ 
    items: devToArticles, 
    searchFields: ['title'] 
  });
  const { filteredItems: filteredRepos } = useSearch<GithubRepo>({ 
    items: repos, 
    searchFields: ['name', 'description'] 
  });

  // Source management
  const handleSourceToggle = (sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, enabled: !source.enabled }
        : source
    ));
  };

  const handleSourcesReorder = (newSources: SourceConfig[]) => {
    setSources(newSources);
  };

  // Grid layout
  const getGridClass = () => {
    const enabledCount = sources.filter(source => source.enabled).length;
    switch (enabledCount) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      case 4: return 'grid-cols-4';
      default: return 'grid-cols-3';
    }
  };

  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {sources.find(s => s.id === 'hackernews')?.enabled && (
        <NewsSection
          title="Hacker News"
          items={filteredNews}
          loading={hnLoading}
          loadingMore={loadingMoreHN}
          searchQuery={searchQuery}
          isDarkMode={isDarkMode}
          isActive={activeSection === 'hackernews'}
          onSectionClick={() => setActiveSection('hackernews')}
          infiniteScrollEnabled={infiniteScrollEnabled}
          scrollRef={useRef<HTMLDivElement>(null)}
          feed={hnFeed}
          onFeedChange={(feed) => setHNFeed(feed as HNFeed)}
          feedOptions={[
            { value: 'top', label: 'Top Stories' },
            { value: 'new', label: 'New Stories' },
            { value: 'best', label: 'Best Stories' },
            { value: 'ask', label: 'Ask HN' },
            { value: 'show', label: 'Show HN' },
            { value: 'job', label: 'Jobs' }
          ]}
        />
      )}

      {sources.find(s => s.id === 'devto')?.enabled && (
        <NewsSection
          title="DEV.to"
          items={filteredDevToArticles}
          loading={devToLoading}
          loadingMore={loadingMoreDevTo}
          searchQuery={searchQuery}
          isDarkMode={isDarkMode}
          isActive={activeSection === 'devto'}
          onSectionClick={() => setActiveSection('devto')}
          infiniteScrollEnabled={infiniteScrollEnabled}
          scrollRef={useRef<HTMLDivElement>(null)}
          feed={devToFeed}
          onFeedChange={(feed) => setDevToFeed(feed as DevToFeed)}
          feedOptions={[
            { value: 'top', label: 'Top' },
            { value: 'latest', label: 'Latest' },
            { value: 'rising', label: 'Rising' }
          ]}
        />
      )}

      {sources.find(s => s.id === 'github')?.enabled && (
        <GithubSection
          repos={filteredRepos}
          loading={githubLoading}
          loadingMore={loadingMoreGithub}
          searchQuery={searchQuery}
          isDarkMode={isDarkMode}
          isActive={activeSection === 'github'}
          onSectionClick={() => setActiveSection('github')}
          infiniteScrollEnabled={infiniteScrollEnabled}
          scrollRef={useRef<HTMLDivElement>(null)}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />
      )}
    </div>
  );
}

function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(true);
  const [sources, setSources] = useState<SourceConfig[]>([
    { id: 'hackernews', name: 'Hacker News', description: 'Tech news and discussions', enabled: true, icon: 'newspaper' },
    { id: 'devto', name: 'DEV.to', description: 'Developer community articles', enabled: true, icon: 'code' },
    { id: 'github', name: 'GitHub', description: 'Trending repositories', enabled: true, icon: 'github' }
  ]);

  const handleSourceToggle = (sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, enabled: !source.enabled }
        : source
    ));
  };

  const handleSourcesReorder = (newSources: SourceConfig[]) => {
    setSources(newSources);
  };

  return (
    <Router>
      <MainLayout
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isDarkMode={isDarkMode}
        onThemeToggle={toggleTheme}
        infiniteScrollEnabled={infiniteScrollEnabled}
        onInfiniteScrollToggle={() => setInfiniteScrollEnabled(!infiniteScrollEnabled)}
        sources={sources}
        onSourceToggle={handleSourceToggle}
        onSourcesReorder={handleSourcesReorder}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/data-sources" element={<DataSourcesPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;