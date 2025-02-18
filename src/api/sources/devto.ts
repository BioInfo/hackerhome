import { NewsItem, DevToFeed } from '../../types';
import { getCache, setCache } from '../../utils/cache';
import { getTimeAgo } from '../utils';

const DEVTO_API_BASE = 'https://dev.to/api';
const PAGE_SIZE = 10;

export async function fetchDevToArticles(feed: DevToFeed = 'top', page: number = 1): Promise<NewsItem[]> {
  const cacheKey = `devto-${feed}-${page}`;
  const cached = getCache<NewsItem[]>(cacheKey);
  if (cached) return cached;

  try {
    const params = new URLSearchParams({
      per_page: PAGE_SIZE.toString(),
      page: page.toString(),
      ...(feed === 'top' && { top: '1' }),
      ...(feed === 'latest' && { state: 'fresh' }),
      ...(feed === 'rising' && { state: 'rising' })
    });

    const response = await fetch(`${DEVTO_API_BASE}/articles?${params}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const articles = await response.json();
    
    const newsItems = articles.map(article => ({
      id: article.id,
      title: article.title,
      comments: article.comments_count,
      reactions: article.positive_reactions_count,
      timeAgo: getTimeAgo(new Date(article.published_at).getTime()),
      source: 'devto',
      url: article.url
    }));

    setCache(cacheKey, newsItems);
    return newsItems;
  } catch (error) {
    console.error('Error fetching DEV.to articles:', error);
    return [];
  }
}