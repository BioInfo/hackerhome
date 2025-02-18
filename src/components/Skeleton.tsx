import React from 'react';

export function CardSkeleton() {
  return (
    <div className="p-4 bg-gray-800/20 rounded-lg animate-pulse">
      <div className="h-5 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-gray-700 rounded w-16"></div>
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}

export function RepoSkeleton() {
  return (
    <div className="p-4 bg-gray-800/20 rounded-lg animate-pulse">
      <div className="h-5 bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-3"></div>
      <div className="flex items-center space-x-4">
        <div className="h-4 bg-gray-700 rounded w-16"></div>
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}