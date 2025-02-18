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