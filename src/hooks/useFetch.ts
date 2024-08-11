import { useEffect, useState } from 'react';

/**
 * useFetch - A hook that handles fetching data from an API with loading and error states.
 * @param url - The URL to fetch data from.
 * @param options - Optional fetch options (like method, headers, etc.).
 * @returns An object containing the fetched data, loading state, and error state.
 */
function useFetch<T>(
  url: string,
  options?: RequestInit,
): { data: T | null; loading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, loading, error };
}

export default useFetch;
