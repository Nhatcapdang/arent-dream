import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useCounter, useDebouncedCallback } from '@mantine/hooks';

interface UseInfiniteDataOptions<T> {
  debounceDelay?: number;
  initialPage?: number;
  fetchFn: (page: number) => Promise<T[]>;
  onFilter?: (allData: T[], filterValue: any) => T[];
}

interface UseInfiniteDataReturn<T> {
  data: T[];
  filteredData: T[];
  isLoading: boolean;
  error: any;
  currentPage: number;
  hasMore: boolean;
  isFiltered: boolean;
  loadMore: () => void;
  reset: () => void;
  filterData: (filterValue: any) => void;
  clearFilter: () => void;
}

export const useInfiniteData = <T>({
  debounceDelay = 500,
  initialPage = 1,
  fetchFn,
  onFilter,
}: UseInfiniteDataOptions<T>): UseInfiniteDataReturn<T> => {
  const [pages, handlers] = useCounter(initialPage, { min: 1 });
  const [data, setData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  // Mutation for fetching data
  const { mutate, isPending, error } = useMutation({
    mutationFn: fetchFn,
    onSuccess: (newData) => {
      if (pages === 1) {
        // First load or reset
        setData(newData);
        if (!isFiltered) {
          setFilteredData(newData);
        }
      } else {
        // Append new data
        setData((prev) => {
          const updatedData = [...prev, ...newData];
          if (!isFiltered) {
            setFilteredData(updatedData);
          }
          return updatedData;
        });
      }

      // Check if we have more data (assuming empty array means no more data)
      if (newData.length === 0) {
        setHasMore(false);
      }
    },
    onError: (error) => {
      console.error('Infinite data fetch error:', error);
    },
  });

  // Load data when page changes
  useEffect(() => {
    mutate(pages);
  }, [mutate, pages]);

  // Debounced load more function
  const loadMore = useDebouncedCallback(() => {
    if (!isPending && hasMore) {
      handlers.increment();
    }
  }, debounceDelay);

  // Filter function
  const filterData = useCallback(
    (filterValue: any) => {
      if (onFilter && data.length > 0) {
        const filtered = onFilter(data, filterValue);
        setFilteredData(filtered);
        setIsFiltered(true);
      }
    },
    [data, onFilter]
  );

  // Clear filter function
  const clearFilter = useCallback(() => {
    setFilteredData(data);
    setIsFiltered(false);
  }, [data]);

  const reset = () => {
    setData([]);
    setFilteredData([]);
    setHasMore(true);
    setIsFiltered(false);
    handlers.set(initialPage);
  };

  return {
    data, // All data
    filteredData, // Currently displayed data (filtered or all)
    isLoading: isPending,
    error,
    loadMore,
    currentPage: pages,
    hasMore,
    isFiltered,
    reset,
    filterData,
    clearFilter,
  };
};
