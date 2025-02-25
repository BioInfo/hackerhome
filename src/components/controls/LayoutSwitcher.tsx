import React, { useCallback } from 'react';
import { List, Grid3x3, LayoutGrid } from 'lucide-react';
import { useInterfaceMode } from '../../features/interface-modes/context';

interface LayoutSwitcherProps {
  isDarkMode: boolean;
  className?: string;
}

/**
 * A component that allows users to switch between different layout modes
 * in advanced mode. It displays three layout options: list, grid, and masonry.
 */
export const LayoutSwitcher: React.FC<LayoutSwitcherProps> = ({
  isDarkMode,
  className = ''
}) => {
  const { mode, layout, setLayout } = useInterfaceMode();
  
  const handleLayoutChange = useCallback((newLayout: string) => {
    setLayout(newLayout);
  }, [setLayout]);
  
  // Only show layout switcher in advanced mode
  if (mode !== 'advanced') {
    return null;
  }
  
  // Theme-based styling
  const baseClass = 'inline-flex items-center gap-1 p-1 rounded-lg';
  const activeClass = isDarkMode 
    ? 'bg-gray-700 text-white' 
    : 'bg-gray-200 text-gray-800';
  const inactiveClass = isDarkMode
    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50';
  
  return (
    <div className={`flex gap-1 ${className}`} role="radiogroup" aria-label="Layout options">
      <button
        className={`${baseClass} ${layout === 'list' ? activeClass : inactiveClass}`}
        onClick={() => handleLayoutChange('list')}
        aria-pressed={layout === 'list'}
        title="List view"
      >
        <List size={16} />
        <span className="sr-only">List view</span>
      </button>
      
      <button
        className={`${baseClass} ${layout === 'grid' ? activeClass : inactiveClass}`}
        onClick={() => handleLayoutChange('grid')}
        aria-pressed={layout === 'grid'}
        title="Grid view"
      >
        <Grid3x3 size={16} />
        <span className="sr-only">Grid view</span>
      </button>
      
      <button
        className={`${baseClass} ${layout === 'masonry' ? activeClass : inactiveClass}`}
        onClick={() => handleLayoutChange('masonry')}
        aria-pressed={layout === 'masonry'}
        title="Masonry view"
      >
        <LayoutGrid size={16} />
        <span className="sr-only">Masonry view</span>
      </button>
    </div>
  );
};

export default LayoutSwitcher;