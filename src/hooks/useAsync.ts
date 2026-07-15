import { useEffect, useState } from 'react';
import type { DependencyList } from 'react';

export interface UseAsyncState<T> {
  loading: boolean;
  error: Error | null;
  value: T | null;
}

const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(String(error));
};

/**
 * useAsync - A hook that manages an asynchronous operation, handling loading, error, and result states.
 * @param asyncFunction - The async function to execute.
 * @param dependencies - An array of dependencies that, when changed, re-execute the async function.
 * @returns An object containing loading, error, and value states.
 */
function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: DependencyList = [],
): UseAsyncState<T> {
  const [state, setState] = useState<UseAsyncState<T>>({
    loading: true,
    error: null,
    value: null,
  });

  useEffect(() => {
    let isCurrent = true;

    setState({
      loading: true,
      error: null,
      value: null,
    });

    asyncFunction()
      .then((value) => {
        if (isCurrent) {
          setState({
            loading: false,
            error: null,
            value,
          });
        }
      })
      .catch((error: unknown) => {
        if (isCurrent) {
          setState({
            loading: false,
            error: toError(error),
            value: null,
          });
        }
      });

    return () => {
      isCurrent = false;
    };
    // The dependency list intentionally mirrors React's useEffect API.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return state;
}

export default useAsync;
