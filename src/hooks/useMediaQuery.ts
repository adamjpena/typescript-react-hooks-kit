import { useState, useEffect } from 'react';

/**
 * useMediaQuery - A hook that detects whether the viewport matches a given media query.
 * @param query - A string representing the media query to match.
 * @returns A boolean indicating whether the media query matches the current viewport.
 */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

export default useMediaQuery;
