import React, { useCallback, useMemo } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { NewsItem } from '../../types';
import NewsCard from '../NewsCard';
import { CardSkeleton } from '../Skeleton';
import { useInterfaceMode } from '../../features/interface-modes/context';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

interface VirtualizedNewsListProps {
  items: NewsItem[];
  loading: boolean;
  loadingMore: boolean;
  isDarkMode: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  onItemClick?: (url: string) => void;
  loadNextPage: () => void;
}

// Adjust item height based on mode
const getItemHeight = (mode: string) => {
  return mode === 'simple' ? 100 : 160; // Smaller height for simple mode
};
const LOADING_ITEM_COUNT = 3;

export const VirtualizedNewsList: React.FC<VirtualizedNewsListProps> = ({
  items,
  loading,
  loadingMore,
  isDarkMode,
  hasNextPage,
  onItemClick,
  loadNextPage,
}) => {
  const { mode } = useInterfaceMode();
  const { height } = useWindowDimensions();

  const listHeight = useMemo(() => {
    // Adjust the height based on the viewport and other UI elements
    const headerHeight = 64;
    const footerHeight = 40;
    const padding = mode === 'simple' ? 16 : 32; // Less padding in simple mode
    const maxHeight = 800; // Maximum height to prevent excessive scrolling
    return Math.min(height - (headerHeight + footerHeight + padding), maxHeight);
  }, [height, mode]);
  
  // Calculate item count - add extra row for loading state
  const itemCount = loading ? LOADING_ITEM_COUNT : hasNextPage ? items.length + 1 : items.length;

  const isItemLoaded = useCallback((index: number) => {
    return !hasNextPage || index < items.length || loadingMore;
  }, [hasNextPage, items.length, loadingMore]);
  
  const Item = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
    // Show skeleton for loading states
    if (!isItemLoaded(index) || (loadingMore && index >= items.length)) {
      return (
        <div style={style}>
          <CardSkeleton />
        </div>
      );
    }

    // Show news item
    const item = items[index];
    if (!item) return null;

    return (
      <div style={style}>
        <NewsCard
          {...item}
          isDarkMode={isDarkMode}
          onClick={() => onItemClick?.(item.url)}
        />
      </div>
    );
  }, [items, isDarkMode, onItemClick, isItemLoaded, loadingMore]);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: LOADING_ITEM_COUNT }).map((_, i) => (
          <CardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  // Adjust virtualization strategy based on mode
  const overscanCount = mode === 'simple' ? 1 : 3; // More aggressive in simple mode
  const itemHeight = getItemHeight(mode);

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadingMore || !hasNextPage ? () => Promise.resolve() : loadNextPage}
      threshold={2}
      minimumBatchSize={10}
    >
      {({ onItemsRendered, ref }) => (
        <List
          ref={ref}
          height={listHeight}
          itemCount={itemCount}
          itemSize={itemHeight}
          onItemsRendered={onItemsRendered}
          width="100%"
          overscanCount={overscanCount}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {Item}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default VirtualizedNewsList;
