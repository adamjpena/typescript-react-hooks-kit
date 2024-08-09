import { useEffect, useRef, useState } from 'react';

/**
 * useThrottle - A hook that limits how often a function can be called, effectively throttling the updates.
 * @param value - The value to be throttled.
 * @param limit - The time limit in milliseconds for throttling.
 * @returns The throttled value.
 */

function useThrottle<T>(value: T, limit: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        const now = Date.now();
        if (now - lastRan.current >= limit) {
          setThrottledValue(value);
          lastRan.current = now;
        }
      },
      limit - (Date.now() - lastRan.current),
    );

    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;
