import { useEffect, useRef } from 'react';

/**
 * useInterval - A hook that runs a function at specified intervals, similar to setInterval.
 * @param callback - The function to be called at each interval.
 * @param delay - The interval delay in milliseconds. If null, the interval is paused.
 */
function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null || delay < 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;
