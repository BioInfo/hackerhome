import { useState, useEffect, useCallback } from 'react';
import type { NewsItem } from '../types';

interface UseNewsSourceOptions {
  fetchFn: (page: number) => Promise<NewsItem[]>;
  enabled: boolean;
  initialPage?: number;
}

export function useNewsSource({ fetchFn, enabled, initialPage = 1 }: UseNewsSourceOptions) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(initialPage);

  const fetchData = useCallback(async (pageNum: number, isLoadingMore: boolean = false) => {
    if (!enabled) return;

    try {
      if (isLoadingMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const data = await fetchFn(pageNum);
      
      setItems(prev => isLoadingMore ? [...prev, ...data] : data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [fetchFn, enabled]);

  useEffect(() => {
    // Only fetch initial data when enabled changes or on mount
    if (enabled) {
      fetchData(initialPage);
    }
  }, [enabled, initialPage, fetchData]);

  const loadMore = useCallback(() => {
    if (!loading && !loadingMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchData(nextPage, true);
    }
  }, [loading, loadingMore, page, fetchData]);

  return { 
    items, 
    loading, 
    loadingMore, 
    error, 
    loadMore 
  };
}