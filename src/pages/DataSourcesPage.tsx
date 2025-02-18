import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function DataSourcesPage() {
  const { isDarkMode } = useTheme();
  const bgColor = isDarkMode ? 'bg-[#1a1b1e]' : 'bg-white';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const cardBgColor = isDarkMode ? 'bg-gray-800' : 'bg-gray-50';
  const cardHoverBgColor = isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const descriptionColor = isDarkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className={`${bgColor} rounded-lg p-8 shadow-sm`}>
      <h1 className={`text-3xl font-bold mb-8 ${textColor}`}>Data Sources</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>Current Sources</h2>
          
          <div className="space-y-6">
            <div className={`${cardBgColor} rounded-lg p-6 shadow-sm transition-colors ${cardHoverBgColor}`}>
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
              <p className={`mb-4 ${descriptionColor}`}>
                The official Hacker News API provides access to stories, comments, jobs, and more from 
                the Hacker News community.
              </p>
              <div className="space-y-2">
                <p className={`text-sm font-medium ${textColor}`}>Endpoints Used:</p>
                <ul className={`list-disc pl-6 ${descriptionColor} space-y-1`}>
                  <li>Top Stories</li>
                  <li>New Stories</li>
                  <li>Best Stories</li>
                  <li>Ask HN</li>
                  <li>Show HN</li>
                  <li>Jobs</li>
                </ul>
              </div>
            </div>

            <div className={`${cardBgColor} rounded-lg p-6 shadow-sm transition-colors ${cardHoverBgColor}`}>
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
              <p className={`mb-4 ${descriptionColor}`}>
                The DEV.to API provides access to articles, users, and other content from the DEV 
                community platform.
              </p>
              <div className="space-y-2">
                <p className={`text-sm font-medium ${textColor}`}>Endpoints Used:</p>
                <ul className={`list-disc pl-6 ${descriptionColor} space-y-1`}>
                  <li>Top Articles</li>
                  <li>Latest Articles</li>
                  <li>Rising Articles</li>
                </ul>
              </div>
            </div>

            <div className={`${cardBgColor} rounded-lg p-6 shadow-sm transition-colors ${cardHoverBgColor}`}>
              <h3 className="text-xl font-semibold mb-4">
                <a 
                  href="https://docs.github.com/en/rest" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={textColor}
                >
                  GitHub API
                </a>
              </h3>
              <p className={`mb-4 ${descriptionColor}`}>
                The GitHub API provides access to repositories, users, and other GitHub platform data.
              </p>
              <div className="space-y-2">
                <p className={`text-sm font-medium ${textColor}`}>Endpoints Used:</p>
                <ul className={`list-disc pl-6 ${descriptionColor} space-y-1`}>
                  <li>Trending Repositories</li>
                  <li>Repository Details</li>
                  <li>Repository Statistics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>Coming Soon</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`${cardBgColor} rounded-lg p-6 transition-colors ${cardHoverBgColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Product Hunt</h3>
              <p className={descriptionColor}>
                Latest tech products and startups from the Product Hunt community.
              </p>
            </div>

            <div className={`${cardBgColor} rounded-lg p-6 transition-colors ${cardHoverBgColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Medium</h3>
              <p className={descriptionColor}>
                Technology articles and stories from Medium's tech publications.
              </p>
            </div>

            <div className={`${cardBgColor} rounded-lg p-6 transition-colors ${cardHoverBgColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Hashnode</h3>
              <p className={descriptionColor}>
                Developer blog posts and articles from the Hashnode community.
              </p>
            </div>

            <div className={`${cardBgColor} rounded-lg p-6 transition-colors ${cardHoverBgColor}`}>
              <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>Reddit Programming</h3>
              <p className={descriptionColor}>
                Programming discussions and resources from Reddit's programming communities.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className={`text-2xl font-semibold mb-6 ${textColor}`}>API Usage & Limitations</h2>
          
          <div className="space-y-4">
            <p className={`${textColor} opacity-90`}>
              We respect the rate limits and terms of service for all APIs we use. Our application 
              implements caching and rate limiting to ensure responsible API usage.
            </p>
            
            <div className={`${cardBgColor} rounded-lg p-6`}>
              <h3 className={`text-lg font-semibold mb-2 ${textColor}`}>Cache Policy</h3>
              <ul className={`list-disc pl-6 ${descriptionColor} space-y-1`}>
                <li>News items are cached for 5 minutes</li>
                <li>Trending repositories are cached for 1 hour</li>
                <li>Search results are cached for 1 minute</li>
              </ul>
            </div>

            <p className={`${textColor} opacity-90`}>
              For more information about our data handling and API usage, please refer to our{' '}
              <a href="/privacy" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
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