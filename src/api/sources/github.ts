import { GithubRepo } from '../../types';

const GITHUB_API_BASE = 'https://api.github.com';
const PAGE_SIZE = 10;

// Fallback data for different time ranges
const FALLBACK_REPOS = {
  daily: [
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
    },
    {
      id: 3,
      name: 'microsoft/vscode',
      description: 'Visual Studio Code',
      language: 'TypeScript',
      stars: 150000,
      forks: 28000,
      url: 'https://github.com/microsoft/vscode'
    }
  ],
  weekly: [
    {
      id: 4,
      name: 'rust-lang/rust',
      description: 'Empowering everyone to build reliable and efficient software.',
      language: 'Rust',
      stars: 85000,
      forks: 11000,
      url: 'https://github.com/rust-lang/rust'
    },
    {
      id: 5,
      name: 'golang/go',
      description: 'The Go programming language',
      language: 'Go',
      stars: 110000,
      forks: 16000,
      url: 'https://github.com/golang/go'
    },
    {
      id: 6,
      name: 'sveltejs/svelte',
      description: 'Cybernetically enhanced web apps',
      language: 'TypeScript',
      stars: 71000,
      forks: 3900,
      url: 'https://github.com/sveltejs/svelte'
    }
  ],
  monthly: [
    {
      id: 7,
      name: 'denoland/deno',
      description: 'A modern runtime for JavaScript and TypeScript.',
      language: 'Rust',
      stars: 89000,
      forks: 5000,
      url: 'https://github.com/denoland/deno'
    },
    {
      id: 8,
      name: 'tailwindlabs/tailwindcss',
      description: 'A utility-first CSS framework for rapid UI development.',
      language: 'JavaScript',
      stars: 75000,
      forks: 3800,
      url: 'https://github.com/tailwindlabs/tailwindcss'
    },
    {
      id: 9,
      name: 'pallets/flask',
      description: 'The Python micro framework for building web applications.',
      language: 'Python',
      stars: 62000,
      forks: 15000,
      url: 'https://github.com/pallets/flask'
    }
  ]
};

// Rate limit handling
let lastRateLimitHit = 0;
const RATE_LIMIT_RESET_TIME = 60 * 60 * 1000; // 1 hour

export async function fetchTrendingRepos(timeRange: string = 'daily', page: number = 1): Promise<GithubRepo[]> {
  try {
    // Check if we're still in rate limit cooldown
    if (Date.now() - lastRateLimitHit < RATE_LIMIT_RESET_TIME) {
      console.warn('Still in rate limit cooldown, using fallback data');
      return FALLBACK_REPOS[timeRange as keyof typeof FALLBACK_REPOS] || FALLBACK_REPOS.daily;
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
        lastRateLimitHit = Date.now();
        console.warn('GitHub API rate limit exceeded, using fallback data');
        return FALLBACK_REPOS[timeRange as keyof typeof FALLBACK_REPOS] || FALLBACK_REPOS.daily;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || !Array.isArray(data.items)) {
      console.error('Invalid GitHub API response format');
      return FALLBACK_REPOS[timeRange as keyof typeof FALLBACK_REPOS] || FALLBACK_REPOS.daily;
    }

    const repos = data.items.map((repo: any): GithubRepo => ({
      id: repo.id,
      name: repo.full_name,
      description: repo.description || '',
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      url: repo.html_url
    }));

    return repos;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return FALLBACK_REPOS[timeRange as keyof typeof FALLBACK_REPOS] || FALLBACK_REPOS.daily;
  }
}