import { NewsItem } from '@/types';

/**
 * Generates mock news items for testing the virtualized components
 * 
 * @param count Number of items to generate
 * @param startIndex Starting index for the items (used for pagination)
 * @returns Array of mock news items
 */
export const generateMockNewsItems = (count: number, startIndex = 0): NewsItem[] => {
  const sources = ['HackerNews', 'DevTo', 'GitHub', 'Reddit', 'ProductHunt'];
  const timeAgo = ['2 hours ago', '5 hours ago', '1 day ago', '2 days ago', 'just now', '30 minutes ago'];
  
  return Array.from({ length: count }).map((_, i) => {
    const index = startIndex + i;
    const source = sources[index % sources.length];
    const points = Math.floor(Math.random() * 500) + 10;
    const comments = Math.floor(Math.random() * 100);
    const reactions = Math.floor(Math.random() * 50);
    
    return {
      id: `mock-${index}`,
      title: `Mock News Item ${index}: This is a longer title that might wrap to multiple lines to test the card layout and rendering in different modes`,
      url: `https://example.com/item/${index}`,
      source,
      points,
      comments,
      timeAgo: timeAgo[index % timeAgo.length],
      reactions: source === 'DevTo' ? reactions : undefined
    };
  });
};

/**
 * Simulates an API call to fetch paginated news items
 * 
 * @param page Page number to fetch
 * @param itemsPerPage Number of items per page
 * @param delay Simulated network delay in ms
 * @returns Promise that resolves to an array of news items
 */
export const fetchMockNewsItems = (
  page = 1, 
  itemsPerPage = 20, 
  delay = 500
): Promise<NewsItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page - 1) * itemsPerPage;
      resolve(generateMockNewsItems(itemsPerPage, startIndex));
    }, delay);
  });
};

export default { generateMockNewsItems, fetchMockNewsItems };