import { NewsItem } from '../../types';
import { getCache, setCache } from '../../utils/cache';
import { getTimeAgo } from '../utils';

const PRODUCTHUNT_API_URL = import.meta.env.VITE_PRODUCTHUNT_API_URL;
const PRODUCTHUNT_API_KEY = import.meta.env.VITE_PRODUCTHUNT_API_KEY;
const PAGE_SIZE = 10;

export async function fetchProductHuntPosts(page: number = 1): Promise<NewsItem[]> {
  if (!PRODUCTHUNT_API_KEY || !PRODUCTHUNT_API_URL) {
    console.error('Product Hunt API configuration missing');
    return [];
  }

  const cacheKey = `producthunt-${page}`;
  const cached = getCache<NewsItem[]>(cacheKey);
  if (cached) return cached;

  try {
    const query = `
      query {
        posts(first: ${PAGE_SIZE}, order: RANKING) {
          nodes {
            id
            name
            tagline
            votesCount
            commentsCount
            createdAt
            url
          }
        }
      }
    `;

    const response = await fetch(PRODUCTHUNT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PRODUCTHUNT_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('Product Hunt API errors:', data.errors);
      throw new Error('Product Hunt API error');
    }

    if (!data.data?.posts?.nodes) {
      console.error('Invalid Product Hunt API response:', data);
      return [];
    }

    const posts = data.data.posts.nodes.map((node: any) => ({
      id: node.id,
      title: `${node.name} - ${node.tagline}`,
      points: node.votesCount,
      comments: node.commentsCount,
      timeAgo: getTimeAgo(new Date(node.createdAt).getTime()),
      source: 'producthunt',
      url: node.url
    }));

    setCache(cacheKey, posts);
    return posts;
  } catch (error) {
    console.error('Error fetching Product Hunt posts:', error);
    return [];
  }
}