import { useEffect, useCallback } from 'react';

/**
 * useOnClickOutside - A hook that triggers a handler when a click occurs outside a specified element.
 * @param ref - A React ref pointing to the element to detect outside clicks.
 * @param handler - A function to call when an outside click is detected.
 */
function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  const memoizedHandler = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    },
    [ref, handler],
  );

  useEffect(() => {
    document.addEventListener('mousedown', memoizedHandler);
    document.addEventListener('touchstart', memoizedHandler);

    return () => {
      document.removeEventListener('mousedown', memoizedHandler);
      document.removeEventListener('touchstart', memoizedHandler);
    };
  }, [memoizedHandler]);
}

export default useOnClickOutside;
