import { useCallback, useState } from 'react';

/**
 * useLocalStorage - A hook that simplifies working with localStorage in React.
 * @param key - The key under which the value is stored in localStorage.
 * @param initialValue - The initial value to be stored, if the key is not already in localStorage.
 * @returns An array containing the stored value and a function to update it.
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const storedValue = localStorage.getItem(key);
  const [storedState, setStoredState] = useState<T>(
    storedValue ? JSON.parse(storedValue) : initialValue,
  );

  const setValue = useCallback(
    (value: T) => {
      setStoredState(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key],
  );

  return [storedState, setValue];
}

export default useLocalStorage;
