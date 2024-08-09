import { useCallback, useEffect, useState } from 'react';

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
