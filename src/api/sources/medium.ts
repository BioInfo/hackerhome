import { NewsItem } from '../../types';
import { getCache, setCache } from '../../utils/cache';
import { getTimeAgo } from '../utils';

const PAGE_SIZE = 10;

export async function fetchMediumArticles(page: number = 1): Promise<NewsItem[]> {
  const cacheKey = `medium-${page}`;
  const cached = getCache<NewsItem[]>(cacheKey);
  if (cached) return cached;

  try {
    // Note: This is a mock implementation since Medium's API requires authentication
    const articles = Array.from({ length: PAGE_SIZE }, (_, i) => ({
      id: `medium-${page}-${i}`,
      title: `Medium Article ${i + 1}`,
      comments: Math.floor(Math.random() * 100),
      reactions: Math.floor(Math.random() * 1000),
      timeAgo: getTimeAgo(Date.now() - Math.random() * 86400000),
      source: 'medium',
      url: 'https://medium.com'
    }));

    setCache(cacheKey, articles);
    return articles;
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}