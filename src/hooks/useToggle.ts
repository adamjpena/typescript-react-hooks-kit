import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type UseToggleReturn = readonly [
  boolean,
  () => void,
  Dispatch<SetStateAction<boolean>>,
];

/**
 * useToggle - A hook that provides simple toggle logic for boolean states.
 * @param initialValue - The initial boolean value (default is false).
 * @returns An array containing the current value, a function to toggle the value, and a function to set the value directly.
 */
function useToggle(initialValue: boolean = false): UseToggleReturn {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = useCallback(() => setState((prev) => !prev), []);

  return [state, toggle, setState] as const;
}

export default useToggle;
