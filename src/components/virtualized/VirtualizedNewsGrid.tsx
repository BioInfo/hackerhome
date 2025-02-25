import React, { useCallback, useMemo } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import { NewsItem } from '../../types';
import NewsCard from '../NewsCard';
import { CardSkeleton } from '../Skeleton';
import { useWindowDimensions } from '../../hooks/useWindowDimensions';

interface VirtualizedNewsGridProps {
  items: NewsItem[];
  loading: boolean;
  loadingMore: boolean;
  isDarkMode: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  onItemClick?: (url: string) => void;
  loadNextPage: () => void;
}

// Grid configuration
const COLUMN_WIDTH = 320;
const ROW_HEIGHT = 280;
const GRID_GAP = 16;
const LOADING_ITEM_COUNT = 6;

export const VirtualizedNewsGrid: React.FC<VirtualizedNewsGridProps> = ({
  items,
  loading,
  loadingMore,
  isDarkMode,
  hasNextPage,
  onItemClick,
  loadNextPage,
}) => {
  const { width, height } = useWindowDimensions();
  
  // Calculate grid dimensions
  const gridDimensions = useMemo(() => {
    // Adjust for page layout
    const headerHeight = 64;
    const footerHeight = 40;
    const padding = 32;
    const availableWidth = width - (padding * 2);
    const availableHeight = Math.min(height - (headerHeight + footerHeight + padding), 800);
    
    // Calculate columns that can fit
    const columnCount = Math.max(1, Math.floor(availableWidth / (COLUMN_WIDTH + GRID_GAP)));
    
    return {
      columnCount,
      width: availableWidth,
      height: availableHeight
    };
  }, [width, height]);
  
  // Calculate item count for the grid
  const columnCount = gridDimensions.columnCount;
  // Calculate item count - add extra row for loading state
  const itemCount = loading ? LOADING_ITEM_COUNT : hasNextPage ? items.length + columnCount : items.length;
  const rowCount = Math.ceil(itemCount / columnCount);
  
  // Convert from flat to 2D indices

  // Convert from 2D to flat index
  const mapFromCoordinates = (rowIndex: number, columnIndex: number) => {
    return rowIndex * columnCount + columnIndex;
  };

  // Check if an item at a specific index is loaded
  const isItemLoaded = useCallback((index: number) => {
    return !hasNextPage || index < items.length;
  }, [hasNextPage, items.length, loadingMore]);
  
  // Render a cell in the grid
  const Cell = useCallback(({ rowIndex, columnIndex, style }: { 
    rowIndex: number; 
    columnIndex: number; 
    style: React.CSSProperties 
  }) => {
    const index = mapFromCoordinates(rowIndex, columnIndex);
    
    // Apply grid gap styling
    const cellStyle = {
      ...style,
      left: Number(style.left) + GRID_GAP,
      top: Number(style.top) + GRID_GAP,
      width: Number(style.width) - GRID_GAP,
      height: Number(style.height) - GRID_GAP
    };
    
    // Show loading skeleton for unloaded items and during loading more
    if (!isItemLoaded(index)) {
      return (
        <div style={cellStyle}>
          <CardSkeleton />
        </div>
      );
    }
    
    const item = items[index];
    if (!item) return null;
    
    return (
      <div style={cellStyle} className="h-full">
        <NewsCard
          {...item}
          isDarkMode={isDarkMode}
          onClick={() => onItemClick?.(item.url)}
        />
      </div>
    );
  }, [items, isDarkMode, onItemClick, isItemLoaded, loadingMore]);
  
  // Convert the flat onItemsRendered from InfiniteLoader to grid-based version
  const onItemsRendered = useCallback(({
    visibleRowStartIndex,
    visibleRowStopIndex,
    visibleColumnStartIndex,
    visibleColumnStopIndex
  }: {
    visibleRowStartIndex: number;
    visibleRowStopIndex: number;
    visibleColumnStartIndex: number;
    visibleColumnStopIndex: number;
  }) => {
    // Calculate visible items for InfiniteLoader
    const visibleStartIndex = visibleRowStartIndex * columnCount + visibleColumnStartIndex;
    const visibleStopIndex = visibleRowStopIndex * columnCount + visibleColumnStopIndex;
    
    return {
      visibleStartIndex,
      visibleStopIndex
    };
  }, [columnCount]);
  
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: LOADING_ITEM_COUNT }).map((_, i) => (
          <CardSkeleton key={`skeleton-${i}`} />
        ))}
      </div>
    );
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadingMore || !hasNextPage ? () => Promise.resolve() : loadNextPage}
      threshold={2}
    >
      {({ onItemsRendered: infiniteOnItemsRendered, ref }: { onItemsRendered: any, ref: any }) => (
        <Grid
          ref={ref}
          columnCount={columnCount}
          columnWidth={COLUMN_WIDTH}
          height={gridDimensions.height}
          rowCount={rowCount}
          rowHeight={ROW_HEIGHT}
          width={gridDimensions.width}
          onItemsRendered={(gridParams: any) => {
            const { visibleStartIndex, visibleStopIndex } = onItemsRendered(gridParams);
            infiniteOnItemsRendered({
              visibleStartIndex,
              visibleStopIndex
            });
          }}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {Cell}
        </Grid>
      )}
    </InfiniteLoader>
  );
};

export default VirtualizedNewsGrid;