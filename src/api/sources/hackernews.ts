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
  console.log('Fetching HN story:', id);
  const response = await fetch(`${HN_API_BASE}/item/${id}.json`);
  console.log('HN story response status:', response.status);
  
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  
  const story = await response.json();
  console.log('HN story data:', story);
  return story;
}

export async function fetchHNStories(feed: HNFeed = 'top', page: number = 1): Promise<NewsItem[]> {
  const cacheKey = `hn-${feed}-${page}`;
  const cached = getCache<NewsItem[]>(cacheKey);
  if (cached.data && !cached.isStale) {
    console.log('Using cached HN stories:', cached.data);
    return cached.data;
  }

  try {
    const endpoint = `${feed}stories`;
    console.log('Fetching HN stories from endpoint:', `${HN_API_BASE}/${endpoint}.json`);
    const response = await fetch(`${HN_API_BASE}/${endpoint}.json`);
    console.log('HN API response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    
    const storyIds = await response.json();
    console.log('HN API story IDs:', storyIds);
    
    if (!Array.isArray(storyIds)) {
      console.error('Invalid Hacker News API response format');
      return [];
    }
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    
    const storyPromises = storyIds.slice(start, end).map(async (id) => {
      try {
        const story = await fetchStory(id);
        if (!story || !story.title) {
          console.warn(`Invalid story data for ID ${id}:`, story);
          return null;
        }
        return story;
      } catch (error) {
        console.error(`Error fetching story ${id}:`, error);
        return null;
      }
    });

    const stories = await Promise.all(storyPromises);
    
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