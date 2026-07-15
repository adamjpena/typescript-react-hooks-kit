import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useWindowSize from '../hooks/useWindowSize';

const setWindowSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    configurable: true,
    value: height,
  });
};

describe('useWindowSize', () => {
  it('returns the current window size', () => {
    setWindowSize(1024, 768);

    const { result } = renderHook(() => useWindowSize());

    expect(result.current).toEqual({
      width: 1024,
      height: 768,
    });
  });

  it('updates when the window resizes', () => {
    setWindowSize(1024, 768);

    const { result } = renderHook(() => useWindowSize());

    setWindowSize(1200, 800);

    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(result.current).toEqual({
      width: 1200,
      height: 800,
    });
  });
});
