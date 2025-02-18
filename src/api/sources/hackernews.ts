import { NewsItem, HNFeed } from '../../types';
import { getCache, setCache } from '../../utils/cache';
import { getTimeAgo } from '../utils';

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';
const PAGE_SIZE = 10;

interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  descendants: number;
  time: number;
}

async function fetchStory(id: number): Promise<HNStory> {
  const response = await fetch(`${HN_API_BASE}/item/${id}.json`);
  return response.json();
}

export async function fetchHNStories(feed: HNFeed = 'top', page: number = 1): Promise<NewsItem[]> {
  const cacheKey = `hn-${feed}-${page}`;
  const cached = getCache<NewsItem[]>(cacheKey);
  if (cached) return cached;

  try {
    const endpoint = `${feed}stories`;
    const response = await fetch(`${HN_API_BASE}/${endpoint}.json`);
    const storyIds = await response.json();
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    
    const stories = await Promise.all(
      storyIds.slice(start, end).map(fetchStory)
    );
    
    const newsItems = stories
      .filter(Boolean)
      .filter(story => {
        if (feed === 'ask') return true;
        return story.url;
      })
      .map(story => ({
        id: story.id,
        title: story.title,
        points: story.score,
        comments: story.descendants,
        timeAgo: getTimeAgo(story.time * 1000),
        source: 'hackernews',
        url: story.url || `https://news.ycombinator.com/item?id=${story.id}`
      }));

    setCache(cacheKey, newsItems);
    return newsItems;
  } catch (error) {
    console.error('Error fetching HN stories:', error);
    return [];
  }
}