import { useCallback, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type UseLocalStorageReturn<T> = readonly [
  T,
  Dispatch<SetStateAction<T>>,
];

const canUseLocalStorage = (): boolean => {
  try {
    return typeof window !== 'undefined' && Boolean(window.localStorage);
  } catch {
    return false;
  }
};

const readStoredValue = <T>(key: string, initialValue: T): T => {
  if (!canUseLocalStorage()) {
    return initialValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item === null ? initialValue : (JSON.parse(item) as T);
  } catch {
    return initialValue;
  }
};

const resolveValue = <T>(value: SetStateAction<T>, previousValue: T): T => {
  if (typeof value === 'function') {
    return (value as (currentValue: T) => T)(previousValue);
  }

  return value;
};

/**
 * useLocalStorage - A hook that simplifies working with localStorage in React.
 * @param key - The key under which the value is stored in localStorage.
 * @param initialValue - The initial value to be stored, if the key is not already in localStorage.
 * @returns An array containing the stored value and a function to update it.
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): UseLocalStorageReturn<T> {
  const [storedState, setStoredState] = useState<T>(() =>
    readStoredValue(key, initialValue),
  );

  const setValue = useCallback(
    (value: SetStateAction<T>) => {
      setStoredState((previousValue) => {
        const nextValue = resolveValue(value, previousValue);

        if (canUseLocalStorage()) {
          try {
            window.localStorage.setItem(key, JSON.stringify(nextValue));
          } catch {
            // State updates should still work when storage is unavailable.
          }
        }

        return nextValue;
      });
    },
    [key],
  );

  return [storedState, setValue] as const;
}

export default useLocalStorage;
