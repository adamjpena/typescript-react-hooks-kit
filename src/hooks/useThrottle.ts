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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const normalizedLimit = Math.max(0, limit);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (normalizedLimit === 0) {
      setThrottledValue(value);
      lastRan.current = Date.now();
      return;
    }

    const now = Date.now();
    const remaining = normalizedLimit - (now - lastRan.current);

    if (remaining <= 0) {
      setThrottledValue(value);
      lastRan.current = now;
      return;
    }

    timeoutRef.current = setTimeout(() => {
      setThrottledValue(value);
      lastRan.current = Date.now();
      timeoutRef.current = null;
    }, remaining);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [value, limit]);

  return throttledValue;
}

export default useThrottle;
