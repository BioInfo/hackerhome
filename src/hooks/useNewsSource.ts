import { useState, useEffect, useCallback, useRef } from 'react';

interface UseNewsSourceProps<T> {
  fetchFn: (page: number) => Promise<T[]>;
  enabled: boolean;
  cacheKey?: string;
  cacheDuration?: number;
}

interface FetchState<T> {
  data: T[];
  loading: boolean;
  loadingMore: boolean;
  error: Error | null;
  page: number;
}

// In-memory cache
const memoryCache = new Map<string, { data: any[]; timestamp: number }>();

export function useNewsSource<T>({
  fetchFn,
  enabled,
  cacheKey,
  cacheDuration = 5 * 60 * 1000
}: UseNewsSourceProps<T>) {
  // Single state object to avoid race conditions
  const [state, setState] = useState<FetchState<T>>({
    data: [],
    loading: false,
    loadingMore: false,
    error: null,
    page: 1
  });

  // Refs for cleanup and state tracking
  const mounted = useRef(true);
  const abortController = useRef<AbortController | null>(null);
  const lastFetchTime = useRef<number>(0);
  const isFetching = useRef(false);

  // Cache management functions
  const getFromCache = useCallback((key: string) => {
    if (!key) return null;
    const cached = memoryCache.get(key);
    if (!cached) return null;

    const isStale = Date.now() - cached.timestamp > cacheDuration;
    return { data: cached.data, isStale };
  }, [cacheDuration]);

  const setToCache = useCallback((key: string, data: T[]) => {
    if (!key) return;
    memoryCache.set(key, {
      data,
      timestamp: Date.now()
    });
  }, []);

  // Main fetch function
  const fetchData = useCallback(async (pageNum: number, isBackground = false) => {
    if (!enabled || !mounted.current || isFetching.current) return;

    // Rate limiting
    const now = Date.now();
    if (now - lastFetchTime.current < 1000) return;
    lastFetchTime.current = now;

    try {
      isFetching.current = true;

      // Cancel previous request
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();

      // Update loading state
      if (!isBackground) {
        setState(prev => ({
          ...prev,
          loading: pageNum === 1,
          loadingMore: pageNum > 1
        }));
      }

      // Check cache for first page
      if (pageNum === 1 && cacheKey) {
        const cached = getFromCache(cacheKey);
        if (cached?.data) {
          setState(prev => ({
            ...prev,
            data: cached.data,
            loading: false,
            loadingMore: false
          }));

          if (!cached.isStale) return;
        }
      }

      // Fetch new data
      const newData = await fetchFn(pageNum);

      // Validate response
      if (!Array.isArray(newData)) {
        throw new Error('Invalid data format: expected array');
      }

      // Update state if still mounted
      if (mounted.current) {
        setState(prev => {
          const updatedData = pageNum === 1 ? newData : [...prev.data, ...newData];
          
          // Cache first page data
          if (pageNum === 1 && cacheKey && newData.length > 0) {
            setToCache(cacheKey, newData);
          }

          return {
            ...prev,
            data: updatedData,
            loading: false,
            loadingMore: false,
            error: null
          };
        });
      }
    } catch (error) {
      if (mounted.current) {
        console.error('Error fetching data:', error);
        
        // Try to use cached data on error
        if (pageNum === 1 && cacheKey) {
          const cached = getFromCache(cacheKey);
          if (cached?.data) {
            setState(prev => ({
              ...prev,
              data: cached.data,
              loading: false,
              loadingMore: false,
              error: error instanceof Error ? error : new Error('Failed to fetch data')
            }));
            return;
          }
        }

        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Failed to fetch data'),
          loading: false,
          loadingMore: false
        }));
      }
    } finally {
      isFetching.current = false;
    }
  }, [enabled, fetchFn, cacheKey, getFromCache, setToCache]);

  // Cleanup on unmount
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, []);

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      fetchData(1);
    }
  }, [enabled, fetchData]);

  // Load more function
  const loadMore = useCallback(() => {
    if (!enabled || state.loading || state.loadingMore || isFetching.current) return;
    fetchData(state.page + 1);
    setState(prev => ({ ...prev, page: prev.page + 1 }));
  }, [enabled, state.loading, state.loadingMore, state.page, fetchData]);

  return {
    items: state.data,
    loading: state.loading,
    loadingMore: state.loadingMore,
    error: state.error,
    loadMore
  };
}