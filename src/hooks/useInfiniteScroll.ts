import { useEffect, useRef, RefObject } from 'react';

interface UseInfiniteScrollOptions {
  loading: boolean;
  enabled: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll<T extends HTMLElement>({
  loading,
  enabled,
  onLoadMore,
  threshold = 0.5
}: UseInfiniteScrollOptions): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !loading && enabled) {
          onLoadMore();
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, enabled, onLoadMore, threshold]);

  return ref;
}