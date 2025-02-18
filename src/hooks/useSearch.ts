import { useState, useCallback } from 'react';

interface UseSearchOptions<T> {
  items: T[];
  searchFields: (keyof T)[];
}

export function useSearch<T>({ items, searchFields }: UseSearchOptions<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useCallback(() => {
    if (!searchQuery) return items;

    const lowerQuery = searchQuery.toLowerCase();
    return items.filter((item) => {
      return searchFields.some((field) => {
        const value = item[field];
        return typeof value === 'string' && value.toLowerCase().includes(lowerQuery);
      });
    });
  }, [items, searchQuery, searchFields]);

  return {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredItems()
  };
}