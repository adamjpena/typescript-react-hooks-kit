import { useEffect, useRef } from 'react';

/**
 * useInterval - A hook that runs a function at specified intervals, similar to setInterval.
 * @param callback - The function to be called at each interval.
 * @param delay - The interval delay in milliseconds. If null, the interval is paused.
 */
function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
