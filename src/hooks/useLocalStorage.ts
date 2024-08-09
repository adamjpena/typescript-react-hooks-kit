import { useState } from 'react';

function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  // Get from local storage then
  // parse stored json or return initialValue
  const storedValue = localStorage.getItem(key);
  const [storedState, setStoredState] = useState<T>(
    storedValue ? JSON.parse(storedValue) : initialValue,
  );

  const setValue = (value: T) => {
    setStoredState(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedState, setValue];
}

export default useLocalStorage;
