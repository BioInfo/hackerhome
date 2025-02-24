interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface Cache {
  [key: string]: CacheItem<any>;
}

// In-memory cache
const memoryCache: Cache = {};

export function setCache<T>(key: string, data: T, duration?: number): void {
  memoryCache[key] = {
    data,
    timestamp: Date.now(),
  };
}

export function getCache<T>(key: string, duration: number = 5 * 60 * 1000): { data: T | null, isStale: boolean } {
  const item = memoryCache[key];
  if (!item) {
    return { data: null, isStale: true };
  }

  const isStale = Date.now() - item.timestamp > duration;
  
  if (isStale) {
    // Keep stale data but mark it as stale
    return { data: item.data, isStale: true };
  }

  return { data: item.data, isStale: false };
}

export function clearCache(key?: string): void {
  if (key) {
    delete memoryCache[key];
  } else {
    // Clear all cache
    Object.keys(memoryCache).forEach(k => delete memoryCache[k]);
  }
}

export function getCacheSize(): number {
  return Object.keys(memoryCache).length;
}

// Automatically clean up stale cache entries periodically
setInterval(() => {
  Object.entries(memoryCache).forEach(([key, item]) => {
    const isStale = Date.now() - item.timestamp > 24 * 60 * 60 * 1000; // 24 hours
    if (isStale) {
      delete memoryCache[key];
    }
  });
}, 60 * 60 * 1000); // Run cleanup every hour