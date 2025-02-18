import React from 'react';
import NewsCard from '../NewsCard';
import { CardSkeleton } from '../Skeleton';
import { NewsItem } from '../../types';

interface NewsSectionProps {
  title: string;
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
  onFeedChange?: (feed: string) => void;
  feedOptions?: { value: string; label: string }[];
}

export default function NewsSection({
  title,
  items,
  loading,
  loadingMore,
  searchQuery,
  isDarkMode,
  isActive,
  onSectionClick,
  infiniteScrollEnabled,
  scrollRef,
  feed,
  onFeedChange,
  feedOptions
}: NewsSectionProps) {
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
          {title}
          {searchQuery && ` (${items.length})`}
        </h2>
        {feedOptions && onFeedChange && (
          <select 
            className={`${isDarkMode ? 'bg-gray-800 text-gray-200' : 'bg-white text-gray-900'} rounded px-2 py-1 text-sm border ${borderColor}`}
            value={feed}
            onChange={(e) => onFeedChange(e.target.value)}
          >
            {feedOptions.map(option => (
              <option key={`${title}-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="space-y-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <CardSkeleton key={`${title}-skeleton-${i}`} />
          ))
        ) : (
          items.map((item, index) => (
            <a 
              key={`${title}-${item.id}-${feed}-${index}`}
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <NewsCard {...item} isDarkMode={isDarkMode} />
            </a>
          ))
        )}
        {!loading && !searchQuery && infiniteScrollEnabled && (
          <div ref={scrollRef} className="h-10" />
        )}
        {loadingMore && !searchQuery && (
          Array.from({ length: 2 }).map((_, i) => (
            <CardSkeleton key={`${title}-loading-more-${i}`} />
          ))
        )}
      </div>
    </div>
  );
}