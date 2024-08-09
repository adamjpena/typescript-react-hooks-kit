import { useCallback, useEffect, useState } from 'react';

/**
 * useAsync - A hook that manages an asynchronous operation, handling loading, error, and result states.
 * @param asyncFunction - The async function to execute.
 * @param dependencies - An array of dependencies that, when changed, re-execute the async function.
 * @returns An object containing loading, error, and value states.
 */

function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: any[] = [],
): { loading: boolean; error: Error | null; value: T | null } {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [value, setValue] = useState<T | null>(null);

  const execute = useCallback(() => {
    setLoading(true);
    setError(null);
    setValue(null);

    asyncFunction()
      .then((response) => {
        setValue(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, dependencies);

  useEffect(() => {
    execute();
  }, [execute]);

  return { loading, error, value };
}

export default useAsync;
