import React from 'react';
import { Star, GitFork } from 'lucide-react';
import type { GithubRepo } from '../types';

interface GithubCardProps extends GithubRepo {
  isDarkMode: boolean;
}

export default function GithubCard({ name, description, language, stars, forks, isDarkMode }: GithubCardProps) {
  const bgHoverColor = isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100';
  const titleColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const descriptionColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const metaTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`p-4 ${bgHoverColor} rounded-lg cursor-pointer transition duration-200`}>
      <h3 className={`${titleColor} font-medium mb-2`}>{name}</h3>
      <p className={`${descriptionColor} text-sm mb-3`}>{description}</p>
      <div className="flex items-center space-x-4 text-sm">
        {language && (
          <span className={`flex items-center ${metaTextColor}`}>
            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
            {language}
          </span>
        )}
        <span className={`flex items-center ${metaTextColor}`}>
          <Star className="w-4 h-4 mr-1" />
          {stars.toLocaleString()}
        </span>
        <span className={`flex items-center ${metaTextColor}`}>
          <GitFork className="w-4 h-4 mr-1" />
          {forks.toLocaleString()}
        </span>
      </div>
    </div>
  );
}