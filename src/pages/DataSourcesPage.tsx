import React from 'react';

export default function DataSourcesPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Data Sources</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Current Sources</h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                <a 
                  href="https://github.com/HackerNews/API" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400"
                >
                  Hacker News API
                </a>
              </h3>
              <p className="mb-4">
                The official Hacker News API provides access to stories, comments, jobs, and more from 
                the Hacker News community.
              </p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Endpoints Used:</strong></p>
                <ul className="list-disc pl-6">
                  <li>Top Stories</li>
                  <li>New Stories</li>
                  <li>Best Stories</li>
                  <li>Ask HN</li>
                  <li>Show HN</li>
                  <li>Jobs</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                <a 
                  href="https://developers.forem.com/api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-500 dark:hover:text-indigo-400"
                >
                  DEV.to API
                </a>
              </h3>
              <p className="mb-4">
                The DEV.to API provides access to articles, users, and other content from the DEV 
                community platform.
              </p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Endpoints Used:</strong></p>
                <ul className="list-disc pl-6">
                  <li>Top Articles</li>
                  <li>Latest Articles</li>
                  <li>Rising Articles</li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold mb-4">
                <a 
                  href="https://docs.github.com/en/rest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-900 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
                >
                  GitHub API
                </a>
              </h3>
              <p className="mb-4">
                The GitHub API provides access to repositories, users, and other GitHub platform data.
              </p>
              <div className="space-y-2">
                <p className="text-sm"><strong>Endpoints Used:</strong></p>
                <ul className="list-disc pl-6">
                  <li>Trending Repositories</li>
                  <li>Repository Details</li>
                  <li>Repository Statistics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Coming Soon</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Product Hunt</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Latest tech products and startups from the Product Hunt community.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Medium</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Technology articles and stories from Medium's tech publications.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Hashnode</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Developer blog posts and articles from the Hashnode community.
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Reddit Programming</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Programming discussions and resources from Reddit's programming communities.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">API Usage & Limitations</h2>
          
          <div className="space-y-4">
            <p>
              We respect the rate limits and terms of service for all APIs we use. Our application 
              implements caching and rate limiting to ensure responsible API usage.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Cache Policy</h3>
              <ul className="list-disc pl-6">
                <li>News items are cached for 5 minutes</li>
                <li>Trending repositories are cached for 1 hour</li>
                <li>Search results are cached for 1 minute</li>
              </ul>
            </div>

            <p>
              For more information about our data handling and API usage, please refer to our{' '}
              <a href="/privacy" className="text-blue-500 hover:text-blue-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
} 