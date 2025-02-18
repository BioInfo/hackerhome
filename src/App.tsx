import React, { useState, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import NewsSection from './components/sections/NewsSection';
import GithubSection from './components/sections/GithubSection';
import { CardSkeleton } from './components/Skeleton';
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

// Lazy load pages
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const DataSourcesPage = lazy(() => import('./pages/DataSourcesPage'));

function NewsGrid({ source, items, loading, loadingMore, searchQuery, isDarkMode, isActive, onSectionClick, infiniteScrollEnabled, scrollRef, feed, onFeedChange, feedOptions }: any) {
  if (!source.enabled) return null;

  return (
    <div className="h-full bg-gray-800/5 dark:bg-gray-800/20 rounded-lg p-4">
      <NewsSection
        title={source.name}
        items={items}
        loading={loading}
        loadingMore={loadingMore}
        searchQuery={searchQuery}
        isDarkMode={isDarkMode}
        isActive={isActive}
        onSectionClick={onSectionClick}
        infiniteScrollEnabled={infiniteScrollEnabled}
        scrollRef={scrollRef}
        feed={feed}
        onFeedChange={onFeedChange}
        feedOptions={feedOptions}
      />
    </div>
  );
}

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

  // News sources with caching
  const {
    items: news,
    loading: hnLoading,
    loadMore: loadMoreHN,
    loadingMore: loadingMoreHN
  } = useNewsSource({
    fetchFn: (page) => fetchHNStories(hnFeed, page),
    enabled: sources.find(s => s.id === 'hackernews')?.enabled ?? false,
    cacheKey: `hn-${hnFeed}`,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  });

  const {
    items: devToArticles,
    loading: devToLoading,
    loadMore: loadMoreDevTo,
    loadingMore: loadingMoreDevTo
  } = useNewsSource({
    fetchFn: (page) => fetchDevToArticles(devToFeed, page),
    enabled: sources.find(s => s.id === 'devto')?.enabled ?? false,
    cacheKey: `devto-${devToFeed}`,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  });

  const {
    items: repos,
    loading: githubLoading,
    loadMore: loadMoreGithub,
    loadingMore: loadingMoreGithub
  } = useNewsSource({
    fetchFn: (page) => fetchTrendingRepos(timeRange, page),
    enabled: sources.find(s => s.id === 'github')?.enabled ?? false,
    cacheKey: `github-${timeRange}`,
    cacheDuration: 60 * 60 * 1000 // 1 hour
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
      default: return 'grid-cols-3';
    }
  };

  const enabledSources = sources.filter(source => source.enabled);

  return (
    <div className={`grid ${getGridClass()} gap-6`}>
      {enabledSources.map(source => {
        if (source.id === 'hackernews') {
          return (
            <Suspense key={source.id} fallback={<CardSkeleton />}>
              <div className="h-full">
                <NewsGrid
                  source={source}
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
                  onFeedChange={(feed: HNFeed) => setHNFeed(feed)}
                  feedOptions={[
                    { value: 'top', label: 'Top Stories' },
                    { value: 'new', label: 'New Stories' },
                    { value: 'best', label: 'Best Stories' },
                    { value: 'ask', label: 'Ask HN' },
                    { value: 'show', label: 'Show HN' },
                    { value: 'job', label: 'Jobs' }
                  ]}
                />
              </div>
            </Suspense>
          );
        }

        if (source.id === 'devto') {
          return (
            <Suspense key={source.id} fallback={<CardSkeleton />}>
              <div className="h-full">
                <NewsGrid
                  source={source}
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
                  onFeedChange={(feed: DevToFeed) => setDevToFeed(feed)}
                  feedOptions={[
                    { value: 'top', label: 'Top' },
                    { value: 'latest', label: 'Latest' },
                    { value: 'rising', label: 'Rising' }
                  ]}
                />
              </div>
            </Suspense>
          );
        }

        if (source.id === 'github') {
          return (
            <Suspense key={source.id} fallback={<CardSkeleton />}>
              <div className="h-full">
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
              </div>
            </Suspense>
          );
        }

        return null;
      })}
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
        <Suspense fallback={<CardSkeleton />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/data-sources" element={<DataSourcesPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;