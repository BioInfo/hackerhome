// Update the GithubRepo mapping in fetchTrendingRepos
const repos = data.items.map((repo: any) => ({
  id: repo.id, // Add unique GitHub repository ID
  name: repo.full_name,
  description: repo.description,
  language: repo.language,
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  url: repo.html_url
}));