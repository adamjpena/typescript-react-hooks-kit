import { useEffect, useState } from 'react';

export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const toError = (error: unknown): Error => {
  if (error instanceof Error) {
    return error;
  }

  return new Error(String(error));
};

const isAbortError = (error: unknown): boolean =>
  error instanceof DOMException && error.name === 'AbortError';

/**
 * useFetch - A hook that handles fetching data from an API with loading and error states.
 * @param input - The resource to fetch data from.
 * @param options - Optional fetch options (like method, headers, etc.).
 * @returns An object containing the fetched data, loading state, and error state.
 */
function useFetch<T>(
  input: RequestInfo | URL,
  options?: RequestInit,
): UseFetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const externalSignal = options?.signal;
    let isCurrent = true;

    const abortFromExternalSignal = () => {
      controller.abort(externalSignal?.reason);
    };

    if (externalSignal?.aborted) {
      abortFromExternalSignal();
    } else {
      externalSignal?.addEventListener('abort', abortFromExternalSignal, {
        once: true,
      });
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(input, {
          ...options,
          signal: controller.signal,
        });

        if (!response.ok) {
          const status = [response.status, response.statusText]
            .filter(Boolean)
            .join(' ');

          throw new Error(`Request failed${status ? `: ${status}` : ''}`);
        }

        const result = (await response.json()) as T;

        if (isCurrent) {
          setData(result);
        }
      } catch (error: unknown) {
        if (isCurrent && !isAbortError(error)) {
          setError(toError(error));
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    void fetchData();

    return () => {
      isCurrent = false;
      externalSignal?.removeEventListener('abort', abortFromExternalSignal);
      controller.abort();
    };
  }, [input, options]);

  return { data, loading, error };
}

export default useFetch;
