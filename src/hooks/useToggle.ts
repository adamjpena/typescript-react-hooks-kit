import { useCallback, useState } from 'react';

/**
 * useToggle - A hook that provides simple toggle logic for boolean states.
 * @param initialValue - The initial boolean value (default is false).
 * @returns An array containing the current value, a function to toggle the value, and a function to set the value directly.
 */
function useToggle(
  initialValue: boolean = false,
): [boolean, () => void, (value: boolean) => void] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setState((prev) => !prev), []);
  const setToggle = useCallback((value: boolean) => setState(value), []);

  return [state, toggle, setToggle];
}

export default useToggle;
