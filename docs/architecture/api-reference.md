# API Reference

## Overview

This document outlines the API endpoints, request/response formats, and integration guidelines for the HackerHome application.

## API Endpoints

### News API

#### Get News Feed
```http
GET /api/news
```

**Query Parameters:**
```typescript
interface NewsQueryParams {
  page?: number;        // Page number (default: 1)
  limit?: number;       // Items per page (default: 20)
  source?: string[];    // News sources to include
  category?: string[];  // Categories to filter
  sort?: 'latest' | 'popular'; // Sort order
}
```

**Response:**
```typescript
interface NewsResponse {
  items: NewsItem[];
  total: number;
  page: number;
  hasMore: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  points: number;
  comments: number;
  timestamp: string;
  author: string;
}
```

#### Get News Item
```http
GET /api/news/:id
```

**Response:**
```typescript
interface NewsItemDetail extends NewsItem {
  content: string;
  tags: string[];
  relatedItems: NewsItem[];
}
```

### Search API

#### Search Content
```http
GET /api/search
```

**Query Parameters:**
```typescript
interface SearchParams {
  query: string;        // Search query
  filters?: {
    source?: string[];
    date?: DateRange;
    type?: ContentType[];
  };
  page?: number;
  limit?: number;
}

interface DateRange {
  start: string;
  end: string;
}

type ContentType = 'article' | 'discussion' | 'repository';
```

**Response:**
```typescript
interface SearchResponse {
  results: SearchResult[];
  total: number;
  page: number;
  hasMore: boolean;
}

interface SearchResult {
  id: string;
  type: ContentType;
  title: string;
  snippet: string;
  highlights: string[];
  source: string;
  url: string;
  timestamp: string;
}
```

## Integration Guidelines

### Authentication

#### Headers
```typescript
interface AuthHeaders {
  'Authorization': `Bearer ${string}`;
  'Content-Type': 'application/json';
  'Accept': 'application/json';
}
```

#### Error Responses
```typescript
interface ApiError {
  code: number;
  message: string;
  details?: Record<string, any>;
}
```

### Rate Limiting

```typescript
interface RateLimitHeaders {
  'X-RateLimit-Limit': string;     // Requests per hour
  'X-RateLimit-Remaining': string; // Remaining requests
  'X-RateLimit-Reset': string;     // Reset timestamp
}
```

## External APIs

### Hacker News API

#### Configuration
```typescript
interface HNConfig {
  baseUrl: 'https://hacker-news.firebaseio.com/v0';
  timeout: 5000;
  retries: 3;
}
```

#### Integration
```typescript
class HackerNewsService {
  async getTopStories(): Promise<Story[]>;
  async getNewStories(): Promise<Story[]>;
  async getStory(id: number): Promise<StoryDetail>;
}
```

### DEV.to API

#### Configuration
```typescript
interface DevToConfig {
  baseUrl: 'https://dev.to/api';
  apiKey: string;
  timeout: 5000;
}
```

#### Integration
```typescript
class DevToService {
  async getArticles(params: ArticleParams): Promise<Article[]>;
  async getArticle(id: number): Promise<ArticleDetail>;
}
```

### GitHub API

#### Configuration
```typescript
interface GitHubConfig {
  baseUrl: 'https://api.github.com';
  token?: string;
  timeout: 5000;
}
```

#### Integration
```typescript
class GitHubService {
  async getTrendingRepos(): Promise<Repository[]>;
  async getRepository(owner: string, repo: string): Promise<RepositoryDetail>;
}
```

## Implementation Examples

### Fetching News
```typescript
async function fetchNews(params: NewsQueryParams): Promise<NewsResponse> {
  const queryString = new URLSearchParams(params as any).toString();
  const response = await fetch(`/api/news?${queryString}`, {
    headers: getAuthHeaders(),
  });
  
  if (!response.ok) {
    throw new ApiError(response.status, await response.json());
  }
  
  return response.json();
}
```

### Search Implementation
```typescript
async function searchContent(params: SearchParams): Promise<SearchResponse> {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  
  if (!response.ok) {
    throw new ApiError(response.status, await response.json());
  }
  
  return response.json();
}
```

## Error Handling

### Error Types
```typescript
enum ApiErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  RATE_LIMITED = 429,
  SERVER_ERROR = 500,
}

class ApiError extends Error {
  constructor(
    public code: ApiErrorCode,
    public details?: Record<string, any>
  ) {
    super(getErrorMessage(code));
  }
}
```

### Error Handling Example
```typescript
async function handleApiRequest<T>(
  request: Promise<T>
): Promise<T> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError) {
      handleApiError(error);
    }
    throw error;
  }
}
```

## Caching Strategy

### Cache Configuration
```typescript
interface CacheConfig {
  maxAge: number;        // Cache duration in ms
  staleWhileRevalidate: boolean;
  prefetch: boolean;
  cacheKey: (params: any) => string;
}
```

### Implementation
```typescript
class ApiCache {
  static async get<T>(key: string): Promise<T | null>;
  static async set<T>(key: string, data: T, config: CacheConfig): Promise<void>;
  static async clear(pattern?: string): Promise<void>;
}
```

## API Client

### Client Configuration
```typescript
interface ApiClientConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headers: Record<string, string>;
  cache: CacheConfig;
}
```

### Implementation
```typescript
class ApiClient {
  constructor(config: ApiClientConfig) {}
  
  async get<T>(path: string, params?: Record<string, any>): Promise<T>;
  async post<T>(path: string, data: any): Promise<T>;
  async put<T>(path: string, data: any): Promise<T>;
  async delete<T>(path: string): Promise<T>;
}
```

## WebSocket API

### Connection
```typescript
interface WebSocketConfig {
  url: string;
  protocols?: string[];
  reconnect: boolean;
  maxRetries: number;
}
```

### Events
```typescript
interface WebSocketEvents {
  'news:update': NewsItem;
  'search:update': SearchResult;
  'error': Error;
}
```

## API Versioning

### Version Headers
```typescript
interface VersionHeaders {
  'Accept-Version': string;  // e.g., '2024-03'
  'X-API-Version': string;   // Current API version
}
```

### Deprecation
```typescript
interface DeprecationHeaders {
  'Deprecation': string;     // Deprecation date
  'Sunset': string;          // End-of-life date
  'Link': string;            // Link to documentation
}
``` 