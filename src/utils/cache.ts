interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface Cache {
  [key: string]: CacheItem<any>;
}

const cache: Cache = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function setCache<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

export function getCache<T>(key: string): T | null {
  const item = cache[key];
  if (!item) return null;

  const isExpired = Date.now() - item.timestamp > CACHE_DURATION;
  if (isExpired) {
    delete cache[key];
    return null;
  }

  return item.data;
}