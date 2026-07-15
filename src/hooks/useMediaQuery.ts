import { useState, useEffect } from 'react';

const getMatches = (query: string, defaultValue: boolean): boolean => {
  if (
    typeof window === 'undefined' ||
    typeof window.matchMedia !== 'function'
  ) {
    return defaultValue;
  }

  return window.matchMedia(query).matches;
};

/**
 * useMediaQuery - A hook that detects whether the viewport matches a given media query.
 * @param query - A string representing the media query to match.
 * @returns A boolean indicating whether the media query matches the current viewport.
 */
const useMediaQuery = (query: string, defaultValue = false): boolean => {
  const [matches, setMatches] = useState(() => getMatches(query, defaultValue));

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
