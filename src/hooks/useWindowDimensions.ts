import { useState, useEffect, useCallback } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
}

/**
 * A hook that returns the current window dimensions and handles resizing with debounce
 * @param debounceTime - The time in milliseconds to debounce the resize event (default: 200ms)
 * @returns The current window dimensions (width and height)
 */
export const useWindowDimensions = (debounceTime = 200): WindowDimensions => {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Debounced resize handler to improve performance
  const debouncedHandleResize = useCallback(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
        timeoutId = null;
      }, debounceTime);
    };
  }, [debounceTime]);

  useEffect(() => {
    // Get initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Set up the debounced event listener
    const handleResize = debouncedHandleResize();
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debouncedHandleResize]);

  return dimensions;
};

export default useWindowDimensions;
