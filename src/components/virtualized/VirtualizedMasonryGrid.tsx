import React, { useCallback, useEffect, useMemo, useRef, useState, RefObject } from 'react';
import { NewsItem } from '../../types';
import NewsCard from '../NewsCard';
import { CardSkeleton } from '../Skeleton';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';
import useVirtualizedKeyboardNav from './useVirtualizedKeyboardNav';

interface VirtualizedMasonryGridProps {
  items: NewsItem[];
  loading: boolean;
  loadingMore: boolean;
  isDarkMode: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  onItemClick?: (url: string) => void;
  loadNextPage: () => void;
}

// Constants for grid configuration
const MASONRY_COLUMNS_DEFAULT: Record<string, number> = {
  sm: 1,   // Small screens (< 640px)
  md: 2,   // Medium screens (>= 640px)
  lg: 3,   // Large screens (>= 1024px)
  xl: 4    // Extra large screens (>= 1280px)
};

const LOADING_ITEM_COUNT = 6;

export const VirtualizedMasonryGrid: React.FC<VirtualizedMasonryGridProps> = ({
  items,
  loading,
  loadingMore,
  isDarkMode,
  hasNextPage,
  onItemClick,
  loadNextPage,
}) => {
  const { width } = useWindowDimensions();
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  
  // Calculate number of columns based on viewport width
  const columnCount = useMemo(() => {
    if (width < 640) return MASONRY_COLUMNS_DEFAULT.sm;
    if (width < 1024) return MASONRY_COLUMNS_DEFAULT.md;
    if (width < 1280) return MASONRY_COLUMNS_DEFAULT.lg;
    return MASONRY_COLUMNS_DEFAULT.xl;
  }, [width]);
  
  // Create column arrays for masonry layout
  const masonryColumns = useMemo(() => {
    // Reset columns
    const columns: NewsItem[][] = Array.from({ length: columnCount }, () => []);
    
    if (loading || items.length === 0) {
      return columns;
    }
    
    // Distribute items into columns (masonry layout algorithm)
    items.forEach((item, index) => {
      // Place each item in the column with the fewest items
      const columnIndex = index % columnCount;
      columns[columnIndex].push(item);
    });
    
    return columns;
  }, [items, columnCount, loading]);
  
  // Loading indicator status
  const isLoading = loading || loadingMore;
  
  // Keyboard navigation
  const { handleKeyDown } = useVirtualizedKeyboardNav({
    itemCount: items.length,
    columnCount,
    focusedIndex,
    setFocusedIndex,
    containerRef: containerRef as RefObject<HTMLElement>
  });

  // Handle intersection observation for infinite loading
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;
    
    // Disconnect previous observer if exists
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Create new observer for infinite loading
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !loadingMore) {
          console.log('Last item visible, loading more...');
          loadNextPage();
        }
      },
      { rootMargin: '200px 0px' }
    );
    
    // Observe last item
    if (lastItemRef.current) {
      observerRef.current.observe(lastItemRef.current);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isLoading, loadingMore, loadNextPage, items.length]);
  
  // Handle item click with focus management
  const handleItemClick = useCallback((index: number, url: string) => {
    setFocusedIndex(index);
    if (onItemClick) {
      onItemClick(url);
    }
  }, [onItemClick]);
  
  // Render loading skeleton
  if (loading && items.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: LOADING_ITEM_COUNT }).map((_, i) => (
          <CardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }
  
  return (
    <div
      ref={containerRef}
      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="grid"
      aria-colcount={columnCount}
    >
      <div className="flex flex-row gap-4">
        {masonryColumns.map((column, colIndex) => (
          <div 
            key={`masonry-column-${colIndex}`} 
            className="flex-1 flex flex-col gap-4"
            role="row"
          >
            {column.map((item, itemIndex) => {
              const globalIndex = itemIndex * columnCount + colIndex;
              const isFocused = globalIndex === focusedIndex;
              
              // Check if this is the last item in the last column
              const isLastItem = colIndex === masonryColumns.length - 1 && 
                               itemIndex === column.length - 1;
              
              return (
                <div
                  key={`col-${colIndex}-item-${item.id}`}
                  ref={isLastItem ? lastItemRef : null}
                  className={`${isFocused ? 'ring-2 ring-blue-500 rounded-lg' : ''} transition-all duration-200`}
                  tabIndex={isFocused ? 0 : -1}
                  data-index={globalIndex}
                  aria-selected={isFocused}
                  role="gridcell"
                >
                  <NewsCard
                    {...item}
                    isDarkMode={isDarkMode}
                    onClick={() => handleItemClick(globalIndex, item.url)}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Loading indicator at the bottom */}
      {loadingMore && hasNextPage && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: columnCount }).map((_, i) => (
            <CardSkeleton key={`loading-more-${i}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VirtualizedMasonryGrid;