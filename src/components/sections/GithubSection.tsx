import React from 'react';
import GithubCard from '../GithubCard';
import { RepoSkeleton } from '../Skeleton';
import { GithubRepo } from '../../types';

interface GithubSectionProps {
  repos: GithubRepo[];
  loading: boolean;
  loadingMore: boolean;
  searchQuery: string;
  isDarkMode: boolean;
  isActive: boolean;
  onSectionClick: () => void;
  infiniteScrollEnabled: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export default function GithubSection({
  repos,
  loading,
  loadingMore,
  searchQuery,
  isDarkMode,
  isActive,
  onSectionClick,
  infiniteScrollEnabled,
  scrollRef,
  timeRange,
  onTimeRangeChange
}: GithubSectionProps) {
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <div 
      className={`space-y-4 ${isActive ? 'ring-2 ring-blue-500 rounded-lg p-4' : ''}`}
      onClick={onSectionClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-xl font-semibold ${textColor}`}>
          Trending Repos
          {searchQuery && ` (${repos.length})`}
        </h2>
        <select 
          className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded px-2 py-1 text-sm border ${borderColor}`}
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        >
          <option value="daily">Today</option>
          <option value="weekly">This Week</option>
          <option value="monthly">This Month</option>
        </select>
      </div>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <RepoSkeleton key={`github-skeleton-${i}`} />
          ))
        ) : (
          repos.map((repo, index) => (
            <a 
              key={`${repo.id}-${timeRange}-${index}`}
              href={repo.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <GithubCard {...repo} isDarkMode={isDarkMode} />
            </a>
          ))
        )}
        {!loading && !searchQuery && infiniteScrollEnabled && (
          <div ref={scrollRef} className="h-10" />
        )}
        {loadingMore && !searchQuery && (
          Array.from({ length: 2 }).map((_, i) => (
            <RepoSkeleton key={`github-loading-more-${i}`} />
          ))
        )}
      </div>
    </div>
  );
}