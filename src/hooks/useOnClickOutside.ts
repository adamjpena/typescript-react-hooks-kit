import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export type OutsideClickEvent = MouseEvent | TouchEvent;

/**
 * useOnClickOutside - A hook that triggers a handler when a click occurs outside a specified element.
 * @param ref - A React ref pointing to the element to detect outside clicks.
 * @param handler - A function to call when an outside click is detected.
 */
function useOnClickOutside<TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  handler: (event: OutsideClickEvent) => void,
): void {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const listener = (event: OutsideClickEvent) => {
      const element = ref.current;

      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handlerRef.current(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
}

export default useOnClickOutside;
