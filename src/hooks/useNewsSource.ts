import { useState, useEffect, useCallback } from 'react';

interface UseNewsSourceProps {
  fetchFn: (page: number) => Promise<any[]>;
  enabled: boolean;
  cacheKey?: string;
  cacheDuration?: number; // in milliseconds
}

interface CacheEntry {
  data: any[];
  timestamp: number;
}

export function useNewsSource({
  fetchFn,
  enabled,
  cacheKey,
  cacheDuration = 5 * 60 * 1000 // 5 minutes default
}: UseNewsSourceProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<Error | null>(null);

  const getCachedData = useCallback(() => {
    if (!cacheKey) return null;
    const cached = localStorage.getItem(cacheKey);
    if (!cached) return null;

    const { data, timestamp }: CacheEntry = JSON.parse(cached);
    const isStale = Date.now() - timestamp > cacheDuration;
    return { data, isStale };
  }, [cacheKey, cacheDuration]);

  const setCachedData = useCallback((data: any[]) => {
    if (!cacheKey) return;
    const entry: CacheEntry = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(cacheKey, JSON.stringify(entry));
  }, [cacheKey]);

  const fetchData = useCallback(async (pageNum: number) => {
    if (!enabled) return;

    try {
      // If it's the first page, check cache first
      if (pageNum === 1 && cacheKey) {
        const cached = getCachedData();
        if (cached) {
          setItems(cached.data);
          setLoading(false);
          
          // If data is stale, fetch in background
          if (cached.isStale) {
            const freshData = await fetchFn(pageNum);
            setItems(freshData);
            setCachedData(freshData);
          }
          return;
        }
      }

      const data = await fetchFn(pageNum);
      
      if (pageNum === 1) {
        setItems(data);
        if (cacheKey) {
          setCachedData(data);
        }
      } else {
        setItems(prev => [...prev, ...data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch data'));
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [enabled, fetchFn, cacheKey, getCachedData, setCachedData]);

  useEffect(() => {
    setLoading(true);
    fetchData(1);
  }, [fetchData]);

  const loadMore = useCallback(() => {
    if (loading || loadingMore) return;
    setLoadingMore(true);
    setPage(prev => prev + 1);
    fetchData(page + 1);
  }, [loading, loadingMore, page, fetchData]);

  return {
    items,
    loading,
    loadingMore,
    error,
    loadMore
  };
}