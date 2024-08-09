import { useEffect, useRef } from 'react';

/**
 * usePrevious - A hook that tracks the previous value of a state or prop.
 * @param value - The current value.
 * @returns The previous value before the current render.
 */
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
