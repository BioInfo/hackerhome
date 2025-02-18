// Update GithubRepo interface to include id
export interface GithubRepo {
  id: number;       // Add id field
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
}

export interface NewsItem {
  id: string | number;
  title: string;
  url: string;
  source: string;
  points?: number;
  comments?: number;
  timeAgo: string;
  reactions?: number;
}

export type HNFeed = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job';
export type DevToFeed = 'top' | 'latest' | 'rising';
export type Section = 'hackernews' | 'devto' | 'github';

export interface SourceConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
}

export interface FeedOption {
  value: string;
  label: string;
}