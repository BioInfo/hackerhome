import React, { memo } from 'react';
import { Star, GitFork, Link2, BarChart2, Users, GitBranch, ExternalLink } from 'lucide-react';
import type { GithubRepo } from '../types';
import { useInterfaceMode, useOptimization, useThemeMode, interactionStyles } from '../features/interface-modes';

interface GithubCardProps extends GithubRepo {
  isDarkMode: boolean;
  onViewStats?: () => void;
  onViewContributors?: () => void;
  onClick?: () => void;
}

const SimpleGithubCard: React.FC<GithubCardProps> = ({ 
  name, 
  description, 
  stars,
  language,
  isDarkMode,
  onClick
}) => {
  const { getClassName } = useThemeMode();
  const titleColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const descriptionColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const metaTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';

  return (
    <div 
      className={getClassName('card', `${interactionStyles.simple.hover} cursor-pointer`)}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <h3 className={`${titleColor} font-medium ${getClassName('text')} mb-2`}>{name}</h3>
        <p className={`${descriptionColor} ${getClassName('text')} mb-3 line-clamp-2 flex-1`}>
          {description}
        </p>
        <div className={`flex items-center justify-between ${getClassName('text')} ${metaTextColor}`}>
          {language && (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              {language}
            </span>
          )}
          <span className="flex items-center">
            <Star className="w-3 h-3 mr-1" />
            {stars.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

const AdvancedGithubCard: React.FC<GithubCardProps> = ({
  name,
  description,
  language,
  stars,
  forks,
  isDarkMode,
  url,
  onViewStats,
  onViewContributors,
  onClick
}) => {
  const { getClassName } = useThemeMode();
  const titleColor = isDarkMode ? 'text-blue-400' : 'text-blue-600';
  const descriptionColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';
  const metaTextColor = isDarkMode ? 'text-gray-400' : 'text-gray-500';
  const badgeBg = isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50';
  const badgeText = isDarkMode ? 'text-blue-400' : 'text-blue-600';

  return (
    <div 
      className={getClassName('card', `${interactionStyles.advanced.hover} cursor-pointer transform transition-all duration-200`)}
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className={`${titleColor} font-medium ${getClassName('text')} flex items-center gap-2`}>
            <GitBranch className="w-4 h-4" />
            {name}
          </h3>
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onViewStats && (
              <button 
                onClick={(e) => { e.stopPropagation(); onViewStats(); }}
                className={`p-1.5 rounded-lg ${interactionStyles.advanced.button} transition-colors`}
                aria-label="View Stats"
              >
                <BarChart2 className="w-4 h-4" />
              </button>
            )}
            {onViewContributors && (
              <button 
                onClick={(e) => { e.stopPropagation(); onViewContributors(); }}
                className={`p-1.5 rounded-lg ${interactionStyles.advanced.button} transition-colors`}
                aria-label="View Contributors"
              >
                <Users className="w-4 h-4" />
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

        <p className={`${descriptionColor} ${getClassName('text')} mb-4 line-clamp-2`}>
          {description}
        </p>

        <div className={`${metaTextColor} ${getClassName('text')} mt-auto`}>
          <div className="flex flex-wrap items-center gap-4 mb-3">
            {language && (
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${badgeBg} ${badgeText}`}>
                <span className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></span>
                {language}
              </span>
            )}
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${badgeBg} ${badgeText}`}>
              <Star className="w-4 h-4 mr-1" />
              {stars.toLocaleString()}
            </span>
            {forks > 0 && (
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full ${badgeBg} ${badgeText}`}>
                <GitFork className="w-4 h-4 mr-1" />
                {forks.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const GithubCard: React.FC<GithubCardProps> = (props) => {
  const { mode } = useInterfaceMode();
  const { shouldLoadFeature } = useOptimization();

  // Only load advanced features if we're in advanced mode and they're enabled
  const showAdvancedFeatures = shouldLoadFeature('advanced');

  return mode === 'simple' || !showAdvancedFeatures ? (
    <SimpleGithubCard {...props} />
  ) : (
    <AdvancedGithubCard {...props} />
  );
};

// Memoize the component with a custom comparison function
export default memo(GithubCard, (prev, next) => {
  return (
    prev.name === next.name &&
    prev.description === next.description &&
    prev.isDarkMode === next.isDarkMode &&
    prev.stars === next.stars &&
    prev.forks === next.forks &&
    prev.language === next.language
  );
});