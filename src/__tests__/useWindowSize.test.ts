import { renderHook, act } from '@testing-library/react-hooks';
import useWindowSize from '../hooks/useWindowSize';

describe('useWindowSize', () => {
  it('should return the current window dimensions', () => {
    global.innerWidth = 1024;
    global.innerHeight = 768;

    const { result } = renderHook(() => useWindowSize());

    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it('should update the dimensions when the window is resized', () => {
    const { result } = renderHook(() => useWindowSize());

    act(() => {
      global.innerWidth = 1200;
      global.innerHeight = 800;
      global.dispatchEvent(new Event('resize'));
    });

    expect(result.current.width).toBe(1200);
    expect(result.current.height).toBe(800);
  });
});
