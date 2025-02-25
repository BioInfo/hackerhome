import React, { useCallback, memo, useEffect, useRef } from 'react';
import { NewsItem } from '../../types';
import VirtualizedNewsContainer from '../virtualized/VirtualizedNewsContainer';
import LayoutSwitcher from '../controls/LayoutSwitcher';
import { useInterfaceMode } from '../../features/interface-modes/context';

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
  hasMore?: boolean;
  scrollRef: React.RefObject<HTMLDivElement>;
  feed?: string;
  onFeedChange?: (feed: string) => void;
  feedOptions?: { value: string; label: string }[];
  onItemClick?: (url: string) => void;
  onLoadMore?: () => void;
}

const NewsSection = memo(function NewsSection({
  title,
  items,
  loading,
  loadingMore,
  isDarkMode,
  isActive,
  onSectionClick,
  infiniteScrollEnabled,
  hasMore = true,
  scrollRef,
  feed,
  onFeedChange,
  feedOptions,
  onItemClick,
  onLoadMore
}: NewsSectionProps) {
  const textColor = isDarkMode ? 'text-white' : 'text-gray-900';
  const borderColor = isDarkMode ? 'border-gray-700' : 'border-gray-200';
  
  // Initialize refs
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadMoreTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const previousItemsLengthRef = useRef(items.length);

  
  // Define memoized callbacks
  const handleLoadMore = useCallback(() => {
    if (!onLoadMore || loading || loadingMore || !infiniteScrollEnabled) {
      return;
    }

    // Stop loading more if we've reached the end of available data
    if (!hasMore) {
      return;
    }

    if (loadMoreTimeoutRef.current) {
      clearTimeout(loadMoreTimeoutRef.current);
    }

    loadMoreTimeoutRef.current = setTimeout(() => {
      if (onLoadMore) {
        console.log(`Load more triggered for ${title} section`);
        onLoadMore();
      }
    }, 500);
  }, [onLoadMore, loading, loadingMore, infiniteScrollEnabled, hasMore]);

  const handleItemClick = useCallback((url: string) => {
    if (onItemClick) {
      onItemClick(url);
    } else if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }, [onItemClick]);

  // Setup intersection observer
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!infiniteScrollEnabled || !el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0.1
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [infiniteScrollEnabled, handleLoadMore]);

  // Track items length changes
  useEffect(() => {
    previousItemsLengthRef.current = items.length;
  }, [items.length]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (loadMoreTimeoutRef.current) {
        clearTimeout(loadMoreTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`relative border-b ${borderColor} ${isActive ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
      onClick={onSectionClick}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className={`text-lg font-semibold ${textColor}`}>{title}</h2>
        
        {feedOptions && onFeedChange && (
          <div className="flex items-center space-x-2">
            <LayoutSwitcher isDarkMode={isDarkMode} />
            <select
              onClick={(e) => e.stopPropagation()} // Prevent section click when selecting feed
              value={feed}
              onChange={(e) => onFeedChange(e.target.value)}
              className="form-select text-sm"
            >
              {feedOptions.map(option => (
                <option key={`${title}-${option.value}`} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <VirtualizedNewsContainer
        items={items}
        loading={loading}
        loadingMore={loadingMore}
        isDarkMode={isDarkMode}
        hasNextPage={infiniteScrollEnabled && hasMore}
        isNextPageLoading={loadingMore}
        onItemClick={handleItemClick}
        loadNextPage={handleLoadMore}
      />

      {infiniteScrollEnabled && (
        <div 
          ref={loadMoreRef} 
          className="h-10 w-full" 
          aria-hidden="true"
          data-testid="load-more-trigger"
        />
      )}
    </div>
  );
});

// Memoize the component to prevent unnecessary re-renders
export default NewsSection;