import React, { MouseEvent } from 'react';
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
  onItemClick?: (url: string) => void;
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
  feedOptions,
  onItemClick
}: NewsSectionProps) {
  const bgColor = isDarkMode ? 'bg-gray-800' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';

  const handleItemClick = (url: string, e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // Prevent section click
    if (onItemClick) {
      onItemClick(url);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

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
            <div 
              key={`${title}-${item.id}-${feed}-${index}`}
              onClick={(e) => handleItemClick(item.url, e)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleItemClick(item.url, e as unknown as MouseEvent<HTMLDivElement>);
                }
              }}
              className="cursor-pointer"
            >
              <NewsCard 
                {...item} 
                isDarkMode={isDarkMode} 
                onClick={() => onItemClick ? onItemClick(item.url) : null}
              />
            </div>
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