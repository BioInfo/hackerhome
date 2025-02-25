import { useCallback, RefObject, KeyboardEvent } from 'react';

interface KeyboardNavProps {
  itemCount: number;
  columnCount?: number;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  containerRef: RefObject<HTMLElement>;
}

/**
 * Hook to add keyboard navigation to virtualized lists and grids
 * 
 * @param props - Configuration for keyboard navigation
 * @returns Keyboard event handlers
 */
export const useVirtualizedKeyboardNav = ({
  itemCount,
  columnCount = 1,
  focusedIndex,
  setFocusedIndex,
  containerRef
}: KeyboardNavProps) => {
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    let newIndex = focusedIndex;
    
    switch (e.key) {
      case 'ArrowDown':
        newIndex = Math.min(focusedIndex + columnCount, itemCount - 1);
        break;
      case 'ArrowUp':
        newIndex = Math.max(focusedIndex - columnCount, 0);
        break;
      case 'ArrowRight':
        if (columnCount > 1) {
          const isRightEdge = (focusedIndex + 1) % columnCount === 0;
          if (!isRightEdge) {
            newIndex = Math.min(focusedIndex + 1, itemCount - 1);
          }
        }
        break;
      case 'ArrowLeft':
        if (columnCount > 1) {
          const isLeftEdge = focusedIndex % columnCount === 0;
          if (!isLeftEdge) {
            newIndex = Math.max(focusedIndex - 1, 0);
          }
        }
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = itemCount - 1;
        break;
      case 'PageDown':
        newIndex = Math.min(focusedIndex + (columnCount * 5), itemCount - 1);
        break;
      case 'PageUp':
        newIndex = Math.max(focusedIndex - (columnCount * 5), 0);
        break;
      default:
        return; // Don't prevent default for other keys
    }
    
    if (newIndex !== focusedIndex) {
      e.preventDefault();
      setFocusedIndex(newIndex);
      
      // Ensure the container maintains focus
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }
  }, [focusedIndex, itemCount, columnCount, setFocusedIndex, containerRef]);
  
  return { handleKeyDown };
};

export default useVirtualizedKeyboardNav;