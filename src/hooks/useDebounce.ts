import { useState, useEffect } from 'react';

/**
 * useDebounce - A hook that delays updating a value until a specified time has passed without changes.
 * @param value - The value to debounce.
 * @param delay - The delay in milliseconds before updating the value.
 * @returns The debounced value.
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
