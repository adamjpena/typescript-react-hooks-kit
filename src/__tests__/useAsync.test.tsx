import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import useAsync from '../hooks/useAsync';

describe('useAsync', () => {
  it('resolves async values', async () => {
    const asyncFunction = vi.fn().mockResolvedValue('Success');

    const { result } = renderHook(() => useAsync(asyncFunction, []));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(asyncFunction).toHaveBeenCalledTimes(1);
    expect(result.current.value).toBe('Success');
    expect(result.current.error).toBeNull();
  });

  it('normalizes rejected errors', async () => {
    const asyncFunction = vi.fn().mockRejectedValue('Failure');

    const { result } = renderHook(() => useAsync(asyncFunction, []));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.value).toBeNull();
    expect(result.current.error?.message).toBe('Failure');
  });

  it('ignores results after unmount', async () => {
    let resolvePromise: (value: string) => void = () => undefined;
    const asyncFunction = vi.fn(
      () =>
        new Promise<string>((resolve) => {
          resolvePromise = resolve;
        }),
    );

    const { result, unmount } = renderHook(() => useAsync(asyncFunction, []));

    expect(result.current.loading).toBe(true);
    unmount();
    resolvePromise('Late success');

    await Promise.resolve();

    expect(asyncFunction).toHaveBeenCalledTimes(1);
  });
});
