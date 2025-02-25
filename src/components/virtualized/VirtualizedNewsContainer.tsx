import React, { useCallback, memo } from 'react';
import { NewsItem } from '../../types';
import VirtualizedNewsList from './VirtualizedNewsList';
import VirtualizedNewsGrid from './VirtualizedNewsGrid';
import VirtualizedMasonryGrid from './VirtualizedMasonryGrid';
import { useInterfaceMode } from '../../features/interface-modes/context';

interface VirtualizedNewsContainerProps {
  items: NewsItem[];
  loading: boolean;
  loadingMore: boolean;
  isDarkMode: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  onItemClick?: (url: string) => void;
  loadNextPage: () => void;
}

/**
 * Container component that switches between different virtualized views based on interface mode
 * and layout preference. Supports three layouts:
 * - list: Simple vertical list of items
 * - grid: Fixed-size grid with consistent item sizes
 * - masonry: Masonry grid with variable height items
 */
export const VirtualizedNewsContainer: React.FC<VirtualizedNewsContainerProps> = ({
  items,
  loading,
  loadingMore,
  isDarkMode,
  hasNextPage,
  isNextPageLoading,
  onItemClick,
  loadNextPage,
}) => {
  const { mode, layout } = useInterfaceMode();
  
  // Determine which component to render based on mode and layout preference
  const renderContent = useCallback(() => {
    // In simple mode, always use the list view
    if (mode === 'simple') {
      return (
        <VirtualizedNewsList
          items={items}
          loading={loading}
          loadingMore={loadingMore}
          isDarkMode={isDarkMode}
          hasNextPage={hasNextPage}
          isNextPageLoading={isNextPageLoading}
          onItemClick={onItemClick}
          loadNextPage={loadNextPage}
        />
      );
    }
    
    // In advanced mode, use the selected layout based on preference
    switch (layout) {
      case 'grid':
        return (
          <VirtualizedNewsGrid
            items={items}
            loading={loading}
            loadingMore={loadingMore}
            isDarkMode={isDarkMode}
            hasNextPage={hasNextPage}
            isNextPageLoading={isNextPageLoading}
            onItemClick={onItemClick}
            loadNextPage={loadNextPage}
          />
        );
      
      case 'masonry':
        return (
          <VirtualizedMasonryGrid
            items={items}
            loading={loading}
            loadingMore={loadingMore}
            isDarkMode={isDarkMode}
            hasNextPage={hasNextPage}
            isNextPageLoading={isNextPageLoading}
            onItemClick={onItemClick}
            loadNextPage={loadNextPage}
          />
        );
      
      case 'list':
      default:
        return (
          <VirtualizedNewsList
            items={items}
            loading={loading}
            loadingMore={loadingMore}
            isDarkMode={isDarkMode}
            hasNextPage={hasNextPage}
            isNextPageLoading={isNextPageLoading}
            onItemClick={onItemClick}
            loadNextPage={loadNextPage}
          />
        );
    }
  }, [
    items,
    loading,
    loadingMore,
    isDarkMode,
    hasNextPage,
    isNextPageLoading,
    onItemClick,
    loadNextPage,
    mode,
    layout
  ]);
  
  return renderContent();
};

// Memoize to prevent unnecessary re-renders when parent components change
export default memo(VirtualizedNewsContainer);