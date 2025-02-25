import { NewsItem, DevToFeed } from '../../types';
import { getCache, setCache } from '../../utils/cache';
import { getTimeAgo } from '../utils';

const DEVTO_API_BASE = 'https://dev.to/api';
const PAGE_SIZE = 10;

// Fallback data in case the API fails
const FALLBACK_ARTICLES = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    comments_count: 42,
    positive_reactions_count: 150,
    published_at: new Date().toISOString(),
    url: 'https://dev.to/example/understanding-react-hooks',
    source: 'devto'
  },
  {
    id: 2,
    title: 'TypeScript Best Practices',
    comments_count: 35,
    positive_reactions_count: 120,
    published_at: new Date().toISOString(),
    url: 'https://dev.to/example/typescript-best-practices',
    source: 'devto'
  },
  {
    id: 3,
    title: 'Modern JavaScript Development',
    comments_count: 28,
    positive_reactions_count: 95,
    published_at: new Date().toISOString(),
    url: 'https://dev.to/example/modern-javascript-development',
    source: 'devto'
  }
];

export async function fetchDevToArticles(feed: DevToFeed = 'top', page: number = 1): Promise<NewsItem[]> {
  // Validate input parameters
  if (page < 1) {
    console.warn('Invalid page number:', page);
    page = 1;
  }
  const cacheKey = `devto-${feed}-${page}`;
  const cached = getCache<NewsItem[]>(cacheKey);
  if (cached.data && !cached.isStale) {
    console.log('Using cached Dev.to articles:', cached.data);
    return cached.data;
  }

  try {
    // Build query parameters
    const params = new URLSearchParams({
      per_page: PAGE_SIZE.toString(),
      page: page.toString()
    });
    
    // Add feed-specific parameters
    switch (feed) {
      case 'latest':
        // For latest articles
        params.append('tag', 'javascript'); // Add a popular tag to get more results
        params.append('top', '1'); // Get top articles within the timeframe
        params.append('state', 'fresh');
        break;
      case 'rising':
        // For rising articles
        params.append('state', 'rising');
        break;
      case 'top':
      default:
        // For top articles
        params.append('top', '7'); // Top articles from last 7 days
        break;
    }

    console.log('Fetching Dev.to articles with params:', params.toString());
    const apiUrl = `${DEVTO_API_BASE}/articles?${params}`;
    console.log('Fetching from URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json'
      },
      mode: 'cors'
    });
    console.log('Dev.to API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Dev.to API error:', errorText);
      throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
    }

    let articles;
    try {
      articles = await response.json();
      console.log('Dev.to API response:', articles);
    } catch (error) {
      console.error('Error parsing Dev.to API response:', error);
      return [];
    }
    
    if (!Array.isArray(articles)) {
      console.error('Invalid DEV.to API response format');
      return [];
    }
    
    // Filter out invalid articles
    const validArticles = articles.filter(article => {
      if (!article || typeof article !== 'object') {
        console.warn('Invalid article (not an object):', article);
        return false;
      }
      
      // Log the article for debugging
      console.log('Processing article:', article);
      
      // Check for required fields
      const requiredFields = ['id', 'title', 'url', 'published_at'];
      const missingFields = requiredFields.filter(field => !article[field]);
      
      if (missingFields.length > 0) {
        console.warn(`Article missing required fields: ${missingFields.join(', ')}`, article);
        return false;
      }
      
      // Additional validation for URL format
      try {
        new URL(article.url);
      } catch (error) {
        console.warn('Invalid article URL:', article.url);
        return false;
      }
      
      return true;
    });
    
    if (validArticles.length === 0) {
      console.warn('No valid articles found in response');
      return [];
    }
    
    const newsItems = validArticles.map(article => {
      try {
        return {
          id: article.id,
          title: article.title,
          comments: article.comments_count || 0,
          reactions: article.positive_reactions_count || 0,
          timeAgo: getTimeAgo(new Date(article.published_at).getTime()),
          source: 'devto',
          url: article.url
        };
      } catch (error) {
        console.error('Error transforming article:', error, article);
        return null;
      }
    }).filter(Boolean);

    if (newsItems.length > 0) {
      console.log('Caching Dev.to articles:', newsItems);
      setCache(cacheKey, newsItems);
    }
    return newsItems;
  } catch (error) {
    console.error('Error fetching DEV.to articles:', error);
    console.log('Using fallback articles');
    return FALLBACK_ARTICLES.map(article => ({
      id: article.id,
      title: article.title,
      comments: article.comments_count,
      reactions: article.positive_reactions_count,
      timeAgo: getTimeAgo(new Date(article.published_at).getTime()),
      source: 'devto',
      url: article.url
    }));
  }
}