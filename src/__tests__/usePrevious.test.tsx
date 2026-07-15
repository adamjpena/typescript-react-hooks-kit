import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import usePrevious from '../hooks/usePrevious';

describe('usePrevious', () => {
  it('returns undefined before a previous value exists', () => {
    const { result } = renderHook(() => usePrevious('first'));

    expect(result.current).toBeUndefined();
  });

  it('returns the value from the previous render', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: {
        value: 'first',
      },
    });

    rerender({ value: 'second' });
    expect(result.current).toBe('first');

    rerender({ value: 'third' });
    expect(result.current).toBe('second');
  });
});
