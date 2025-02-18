import { GithubRepo } from '../../types';
import { getCache, setCache } from '../../utils/cache';

const GITHUB_API_BASE = 'https://api.github.com';
const PAGE_SIZE = 10;

// Mock data for when API fails
const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 1,
    name: 'facebook/react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    language: 'JavaScript',
    stars: 200000,
    forks: 41000,
    url: 'https://github.com/facebook/react'
  },
  {
    id: 2,
    name: 'vercel/next.js',
    description: 'The React Framework for Production',
    language: 'TypeScript',
    stars: 100000,
    forks: 24000,
    url: 'https://github.com/vercel/next.js'
  }
];

export async function fetchTrendingRepos(timeRange: string = 'daily', page: number = 1): Promise<GithubRepo[]> {
  const cacheKey = `github-${timeRange}-${page}`;
  const cached = getCache<GithubRepo[]>(cacheKey);

  try {
    // If we have cached data, return it immediately
    if (cached) {
      return cached;
    }

    const date = new Date();
    date.setDate(date.getDate() - (timeRange === 'weekly' ? 7 : timeRange === 'monthly' ? 30 : 1));
    const dateString = date.toISOString().split('T')[0];
    
    const response = await fetch(
      `${GITHUB_API_BASE}/search/repositories?q=created:>${dateString}&sort=stars&order=desc&page=${page}&per_page=${PAGE_SIZE}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'HackerHome-App'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        console.warn('GitHub API rate limit exceeded');
        // Return cached data if available, otherwise fallback data
        return cached || FALLBACK_REPOS;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || !Array.isArray(data.items)) {
      console.error('Invalid GitHub API response format');
      return cached || FALLBACK_REPOS;
    }

    const repos = data.items.map((repo: any) => ({
      id: repo.id,
      name: repo.full_name,
      description: repo.description || '',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url
    }));

    // Only cache valid data
    if (repos.length > 0) {
      setCache(cacheKey, repos);
    }

    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return cached data if available, otherwise fallback data
    return cached || FALLBACK_REPOS;
  }
}