import { useState, useEffect, useCallback, useRef } from 'react';
import { getCache, setCache } from '../utils/cache';

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
  hasMore: boolean;
}

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
    page: 1,
    hasMore: true
  });

  // Refs for cleanup and state tracking
  const mounted = useRef(true);
  const abortController = useRef<AbortController | null>(null);
  const lastFetchTime = useRef<number>(0);
  const isFetching = useRef(false);
  const MAX_PAGES = 3; // Maximum number of pages to load at once

  // Cache management functions with error handling
  const getFromCache = useCallback((key: string) => {
    if (!key) return null;
    try {
      return getCache<T[]>(key, cacheDuration);
    } catch (error) {
      console.warn('Error reading from cache:', error);
      return null;
    }
  }, [cacheDuration]);

  const setToCache = useCallback((key: string, data: T[]) => {
    if (!key) return;
    try {
      setCache(key, data, cacheDuration);
    } catch (error) {
      console.warn('Error writing to cache:', error);
    }
  }, [cacheDuration]);

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
          console.log('Found cached data:', cached);
          setState(prev => ({
            ...prev,
            data: cached.data || [],
            loading: false,
            loadingMore: false
          }));

          if (!cached.isStale) {
            console.log('Using fresh cached data');
            return;
          }
          console.log('Cached data is stale, fetching fresh data');
        }
      }

      // Fetch new data
      console.log(`Fetching data for page ${pageNum}`);
      const newData = await fetchFn(pageNum);
      console.log(`Received data for page ${pageNum}:`, newData);

      // Validate response
      if (!newData || !Array.isArray(newData)) {
        console.error('Invalid data format:', newData);
        // Try to use cached data if available
        if (pageNum === 1 && cacheKey) {
          const cached = getFromCache(cacheKey);
          if (cached?.data && Array.isArray(cached.data)) {
            console.log('Using cached data as fallback');
            setState(prev => ({
              ...prev,
              data: cached.data || [],
              loading: false,
              loadingMore: false,
              error: new Error('Failed to fetch fresh data, using cached data')
            }));
            return;
          }
        }
        throw new Error('Invalid data format: expected array');
      }
      
      if (newData.length === 0 && pageNum === 1) {
        console.warn('No data received for first page');
      }
      
      // Check if we've reached the end of available data
      const hasMoreData = newData.length > 0;
      // Or if we've reached the maximum number of pages
      const reachedMaxPages = pageNum >= MAX_PAGES;

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
            error: null,
            hasMore: hasMoreData && !reachedMaxPages
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
              data: cached.data || [],
              loading: false,
              loadingMore: false,
              error: error instanceof Error ? error : new Error('Failed to fetch data'),
              hasMore: false
            }));
            return;
          }
        }

        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error : new Error('Failed to fetch data'),
          loading: false,
          loadingMore: false,
          hasMore: false
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

  // Load more function with request tracking
  const loadMore = useCallback(() => {
    if (!enabled || state.loading || state.loadingMore || isFetching.current || !state.hasMore) {
      console.log('Load more blocked:', { 
        enabled, 
        loading: state.loading, 
        loadingMore: state.loadingMore, 
        isFetching: isFetching.current 
      });
      return;
    }
    
    // Don't load more if we've reached the maximum number of pages
    if (state.page >= MAX_PAGES) {
      console.log('Maximum number of pages reached');
      return;
    }
    
    const nextPage = state.page + 1;
    setState(prev => ({
      ...prev,
      loadingMore: true
    }));
    
    // Track this request
    const requestId = Date.now();
    const currentRequest = { page: nextPage, id: requestId };
    
    fetchData(nextPage).then(() => {
      // Only update if this is still the most recent request
      if (mounted.current && currentRequest.id === requestId) {
        setState(prev => ({
          ...prev,
          page: nextPage,
          loadingMore: false,
          hasMore: nextPage < MAX_PAGES // Set hasMore to false if we've reached the max pages
        }));
      }
    }).catch(() => {
      if (mounted.current && currentRequest.id === requestId) {
        setState(prev => ({
          ...prev,
          loadingMore: false
        }));
      }
    });
  }, [enabled, state.loading, state.loadingMore, state.page, state.hasMore, fetchData]);

  return {
    items: state.data,
    loading: state.loading,
    loadingMore: state.loadingMore,
    error: state.error,
    loadMore,
    hasMore: state.hasMore
  };
}