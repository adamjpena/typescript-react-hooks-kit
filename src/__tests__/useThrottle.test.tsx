import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import useThrottle from '../hooks/useThrottle';

describe('useThrottle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('limits how often values update', () => {
    const { result, rerender } = renderHook(
      ({ value, limit }) => useThrottle(value, limit),
      {
        initialProps: {
          value: 'initial',
          limit: 1000,
        },
      },
    );

    rerender({ value: 'changed', limit: 1000 });

    act(() => {
      vi.advanceTimersByTime(999);
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe('changed');
  });

  it('updates immediately for non-positive limits', () => {
    const { result, rerender } = renderHook(
      ({ value, limit }) => useThrottle(value, limit),
      {
        initialProps: {
          value: 'initial',
          limit: 1000,
        },
      },
    );

    rerender({ value: 'changed', limit: 0 });

    expect(result.current).toBe('changed');
  });
});
