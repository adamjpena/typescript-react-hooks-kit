import { renderHook } from '@testing-library/react-hooks';
import useMediaQuery from '../hooks/useMediaQuery';

describe('useMediaQuery', () => {
  it('should return true when the media query matches', () => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query === '(min-width: 1024px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(true);
  });

  it('should return false when the media query does not match', () => {
    global.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: query !== '(min-width: 1024px)',
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 1024px)'));

    expect(result.current).toBe(false);
  });
});
