import React from 'react';
import { MessageSquare, Clock, Heart } from 'lucide-react';
import type { NewsItem } from '../types';

interface NewsCardProps extends NewsItem {
  isDarkMode: boolean;
}

export default function NewsCard({ title, source, points, comments, timeAgo, reactions, isDarkMode }: NewsCardProps) {
  const bgHoverColor = isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100';
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const metaTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={`p-4 ${bgHoverColor} rounded-lg cursor-pointer transition duration-200`}>
      <h3 className={`${textColor} font-medium mb-2`}>{title}</h3>
      <div className={`flex items-center space-x-4 text-sm ${metaTextColor}`}>
        {points && <span>{points} points</span>}
        {reactions && (
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {reactions}
          </span>
        )}
        {comments && (
          <span className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-1" />
            {comments}
          </span>
        )}
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {timeAgo}
        </span>
      </div>
    </div>
  );
}