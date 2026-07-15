import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useFetch from '../hooks/useFetch';

interface FetchData {
  message: string;
}

describe('useFetch', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns data after a successful fetch', async () => {
    const mockData: FetchData = { message: 'Hello World' };

    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as Response);

    const { result } = renderHook(() =>
      useFetch<FetchData>('https://api.example.com/data'),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns a useful error for non-ok responses', async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    const { result } = renderHook(() =>
      useFetch<FetchData>('https://api.example.com/error'),
    );

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBeNull();
    expect(result.current.error?.message).toBe('Request failed: 404 Not Found');
  });

  it('aborts pending requests on unmount', () => {
    let signal: AbortSignal | undefined;

    vi.mocked(fetch).mockImplementation((_input, init) => {
      signal = init?.signal ?? undefined;
      return new Promise<Response>(() => undefined);
    });

    const { unmount } = renderHook(() =>
      useFetch<FetchData>('https://api.example.com/slow'),
    );

    unmount();

    expect(signal?.aborted).toBe(true);
  });
});
