import React from 'react';

export function CardSkeleton() {
  return (
    <div className="h-full bg-gray-800/5 dark:bg-gray-800/20 rounded-lg p-4">
      <div className="h-6 bg-gray-700/50 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-800/20 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/50 rounded w-full"></div>
            <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="h-4 bg-gray-700/50 rounded w-16"></div>
            <div className="h-4 bg-gray-700/50 rounded w-20"></div>
            <div className="h-4 bg-gray-700/50 rounded w-24"></div>
          </div>
        </div>
        <div className="p-4 bg-gray-800/20 rounded-lg animate-pulse">
          <div className="h-6 bg-gray-700/50 rounded w-2/3 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-700/50 rounded w-full"></div>
            <div className="h-4 bg-gray-700/50 rounded w-4/5"></div>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="h-4 bg-gray-700/50 rounded w-16"></div>
            <div className="h-4 bg-gray-700/50 rounded w-20"></div>
            <div className="h-4 bg-gray-700/50 rounded w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RepoSkeleton() {
  return (
    <div className="h-full bg-gray-800/5 dark:bg-gray-800/20 rounded-lg p-4">
      <div className="h-5 bg-gray-700/50 rounded w-1/3 mb-6"></div>
      <div className="space-y-4">
        <div className="p-4 bg-gray-800/20 rounded-lg animate-pulse">
          <div className="h-5 bg-gray-700/50 rounded w-1/2 mb-4"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-700/50 rounded w-full"></div>
            <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 bg-gray-700/50 rounded-full"></div>
              <div className="h-4 bg-gray-700/50 rounded w-16"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-700/50 rounded"></div>
              <div className="h-4 bg-gray-700/50 rounded w-12"></div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 bg-gray-700/50 rounded"></div>
              <div className="h-4 bg-gray-700/50 rounded w-12"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}