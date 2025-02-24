import React, { memo } from 'react';
import { MessageSquare, Clock, Heart, Share2, Bookmark, ExternalLink } from 'lucide-react';
import type { NewsItem } from '../types';
import { useInterfaceMode, useOptimization, useThemeMode, interactionStyles } from '../features/interface-modes';

interface NewsCardProps extends NewsItem {
  isDarkMode: boolean;
  onSave?: () => void;
  onShare?: () => void;
  onClick?: () => void;
}

const SimpleNewsCard: React.FC<NewsCardProps> = ({ 
  title, 
  timeAgo,
  source,
  isDarkMode,
  onClick 
}) => {
  const { getClassName } = useThemeMode();
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const metaTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div 
      onClick={onClick}
      className={getClassName('card', `${interactionStyles.simple.hover} cursor-pointer`)}
    >
      <div className="flex flex-col h-full">
        <h3 className={`${textColor} font-medium ${getClassName('text')} mb-2 line-clamp-2`}>{title}</h3>
        <div className={`flex items-center justify-between mt-auto ${getClassName('text')} ${metaTextColor}`}>
          <span className="font-medium">{source}</span>
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {timeAgo}
          </span>
        </div>
      </div>
    </div>
  );
};

const AdvancedNewsCard: React.FC<NewsCardProps> = ({
  title,
  source,
  points,
  comments,
  timeAgo,
  reactions,
  url,
  isDarkMode,
  onSave,
  onShare,
  onClick
}) => {
  const { getClassName } = useThemeMode();
  const textColor = isDarkMode ? 'text-gray-200' : 'text-gray-900';
  const metaTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div 
      onClick={onClick}
      className={getClassName('card', `${interactionStyles.advanced.hover} cursor-pointer transform transition-all duration-200`)}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className={`${textColor} font-medium ${getClassName('text')} flex-1`}>
            {title}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onSave && (
              <button 
                onClick={(e) => { e.stopPropagation(); onSave(); }}
                className={`p-1.5 rounded-lg ${interactionStyles.advanced.button} transition-colors`}
                aria-label="Save"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            )}
            {onShare && (
              <button 
                onClick={(e) => { e.stopPropagation(); onShare(); }}
                className={`p-1.5 rounded-lg ${interactionStyles.advanced.button} transition-colors`}
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            )}
            {url && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                className={`p-1.5 rounded-lg ${interactionStyles.advanced.button} transition-colors`}
                aria-label="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className={`${metaTextColor} mb-3`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-medium">{source}</span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {timeAgo}
            </span>
          </div>
          
          <div className={`flex items-center gap-4 ${getClassName('text')}`}>
            {points && (
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">
                {points} points
              </span>
            )}
            {reactions && (
              <span className="flex items-center">
                <Heart className="w-4 h-4 mr-1 text-pink-500" />
                {reactions}
              </span>
            )}
            {comments && (
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1 text-blue-500" />
                {comments}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const NewsCard: React.FC<NewsCardProps> = (props) => {
  const { mode } = useInterfaceMode();
  const { shouldLoadFeature } = useOptimization();

  // Only load advanced features if we're in advanced mode and they're enabled
  const showAdvancedFeatures = shouldLoadFeature('advanced');

  return mode === 'simple' || !showAdvancedFeatures ? (
    <SimpleNewsCard {...props} />
  ) : (
    <AdvancedNewsCard {...props} />
  );
};

// Memoize the component with a custom comparison function
export default memo(NewsCard, (prev, next) => {
  return (
    prev.title === next.title &&
    prev.isDarkMode === next.isDarkMode &&
    prev.timeAgo === next.timeAgo &&
    prev.source === next.source &&
    prev.points === next.points &&
    prev.comments === next.comments &&
    prev.reactions === next.reactions
  );
});