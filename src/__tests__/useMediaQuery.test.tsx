import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import useMediaQuery from '../hooks/useMediaQuery';

const mockMatchMedia = (initialMatches: boolean) => {
  let listener: ((event: MediaQueryListEvent) => void) | undefined;
  let matches = initialMatches;

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media: '(min-width: 800px)',
    onchange: null,
    addEventListener: vi.fn((_eventName, callback) => {
      listener = callback as (event: MediaQueryListEvent) => void;
    }),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList;

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn(() => mediaQueryList),
  });

  return {
    setMatches(nextMatches: boolean) {
      matches = nextMatches;
      act(() => {
        listener?.({ matches: nextMatches } as MediaQueryListEvent);
      });
    },
  };
};

describe('useMediaQuery', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the initial media query state', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery('(min-width: 800px)'));

    expect(result.current).toBe(true);
  });

  it('updates when the media query changes', () => {
    const matchMedia = mockMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 800px)'));

    expect(result.current).toBe(false);

    matchMedia.setMatches(true);

    expect(result.current).toBe(true);
  });

  it('uses the default value when matchMedia is unavailable', () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: undefined,
    });

    const { result } = renderHook(() =>
      useMediaQuery('(min-width: 800px)', true),
    );

    expect(result.current).toBe(true);
  });
});
