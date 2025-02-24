import React, { useState, useRef, Suspense, lazy, useCallback, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import NewsSection from './components/sections/NewsSection';
import GithubSection from './components/sections/GithubSection';
import { CardSkeleton } from './components/Skeleton';
import { InterfaceModeProvider } from './features/interface-modes';
import { 
  fetchHNStories, 
  fetchDevToArticles, 
  fetchTrendingRepos
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

interface HomePageProps {
  sources: SourceConfig[];
  searchQuery: string;
  isDarkMode: boolean;
  infiniteScrollEnabled: boolean;
}

function HomePage({ sources, searchQuery, isDarkMode, infiniteScrollEnabled }: HomePageProps) {
  // Feed states
  const [timeRange, setTimeRange] = useState<string>('daily');
  const [devToFeed, setDevToFeed] = useState<DevToFeed>('top');
  const [hnFeed, setHNFeed] = useState<HNFeed>('top');
  const [activeSection, setActiveSection] = useState<Section>('hackernews');

  // Source-specific refs
  const hnScrollRef = useRef<HTMLDivElement>(null);
  const devToScrollRef = useRef<HTMLDivElement>(null);
  const githubScrollRef = useRef<HTMLDivElement>(null);

  // Source enabled states
  const hnEnabled = useMemo(() => sources.find(s => s.id === 'hackernews')?.enabled ?? false, [sources]);
  const devToEnabled = useMemo(() => sources.find(s => s.id === 'devto')?.enabled ?? false, [sources]);
  const githubEnabled = useMemo(() => sources.find(s => s.id === 'github')?.enabled ?? false, [sources]);

  // Memoize fetch functions
  const fetchHNStoriesCallback = useCallback((page: number) => fetchHNStories(hnFeed, page), [hnFeed]);
  const fetchDevToArticlesCallback = useCallback((page: number) => fetchDevToArticles(devToFeed, page), [devToFeed]);
  const fetchTrendingReposCallback = useCallback((page: number) => fetchTrendingRepos(timeRange, page), [timeRange]);

  // News sources with caching
  const {
    items: news,
    loading: hnLoading,
    loadMore: loadMoreHN,
    loadingMore: loadingMoreHN
  } = useNewsSource<NewsItem>({
    fetchFn: fetchHNStoriesCallback,
    enabled: hnEnabled,
    cacheKey: `hn-${hnFeed}`,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  });

  const {
    items: devToArticles,
    loading: devToLoading,
    loadMore: loadMoreDevTo,
    loadingMore: loadingMoreDevTo
  } = useNewsSource<NewsItem>({
    fetchFn: fetchDevToArticlesCallback,
    enabled: devToEnabled,
    cacheKey: `devto-${devToFeed}`,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  });

  const {
    items: repos,
    loading: githubLoading,
    loadMore: loadMoreGithub,
    loadingMore: loadingMoreGithub
  } = useNewsSource<GithubRepo>({
    fetchFn: fetchTrendingReposCallback,
    enabled: githubEnabled,
    cacheKey: `github-${timeRange}`,
    cacheDuration: 60 * 60 * 1000 // 1 hour
  });

  // Search functionality
  const { filteredItems: filteredNews } = useSearch<NewsItem>({ 
    items: news, 
    searchFields: ['title'],
    searchQuery
  });

  const { filteredItems: filteredDevToArticles } = useSearch<NewsItem>({ 
    items: devToArticles, 
    searchFields: ['title'],
    searchQuery
  });

  const { filteredItems: filteredRepos } = useSearch<GithubRepo>({ 
    items: repos, 
    searchFields: ['name', 'description'],
    searchQuery
  });

  // Grid layout
  const getGridClass = useCallback(() => {
    const enabledCount = sources.filter(source => source.enabled).length;
    switch (enabledCount) {
      case 1: return 'grid-cols-1';
      case 2: return 'grid-cols-2';
      case 3: return 'grid-cols-3';
      default: return 'grid-cols-3';
    }
  }, [sources]);

  const enabledSources = useMemo(() => sources.filter(source => source.enabled), [sources]);

  const handleItemClick = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

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
                  scrollRef={hnScrollRef}
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
                  onItemClick={handleItemClick}
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
                  scrollRef={devToScrollRef}
                  feed={devToFeed}
                  onFeedChange={(feed: DevToFeed) => setDevToFeed(feed)}
                  feedOptions={[
                    { value: 'top', label: 'Top' },
                    { value: 'latest', label: 'Latest' },
                    { value: 'rising', label: 'Rising' }
                  ]}
                  onItemClick={handleItemClick}
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
                  scrollRef={githubScrollRef}
                  timeRange={timeRange}
                  onTimeRangeChange={setTimeRange}
                  onItemClick={handleItemClick}
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

  const handleSourceToggle = useCallback((sourceId: string) => {
    setSources(prev => prev.map(source => 
      source.id === sourceId 
        ? { ...source, enabled: !source.enabled }
        : source
    ));
  }, []);

  const handleSourcesReorder = useCallback((newSources: SourceConfig[]) => {
    setSources(newSources);
  }, []);

  return (
    <InterfaceModeProvider>
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
              <Route path="/" element={
                <HomePage 
                  sources={sources}
                  searchQuery={searchQuery}
                  isDarkMode={isDarkMode}
                  infiniteScrollEnabled={infiniteScrollEnabled}
                />
              } />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/data-sources" element={<DataSourcesPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
      </Router>
    </InterfaceModeProvider>
  );
}

interface NewsGridProps {
  source: SourceConfig;
  items: NewsItem[];
  loading: boolean;
  loadingMore: boolean;
  searchQuery: string;
  isDarkMode: boolean;
  isActive: boolean;
  onSectionClick: () => void;
  infiniteScrollEnabled: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
  feed?: string;
  onFeedChange?: (feed: any) => void;
  feedOptions?: { value: string; label: string }[];
  onItemClick?: (url: string) => void;
}

function NewsGrid({ source, items, loading, loadingMore, searchQuery, isDarkMode, isActive, onSectionClick, infiniteScrollEnabled, scrollRef, feed, onFeedChange, feedOptions, onItemClick }: NewsGridProps) {
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
        onItemClick={onItemClick}
      />
    </div>
  );
}

export default App;