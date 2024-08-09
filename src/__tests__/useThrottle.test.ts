import { renderHook, act } from '@testing-library/react-hooks';
import useThrottle from '../hooks/useThrottle';

jest.useFakeTimers();

describe('useThrottle', () => {
  it('should update value at throttled intervals', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useThrottle(value, 1000),
      {
        initialProps: { value: 'initial' },
      },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('initial'); // Still the initial value because delay hasn't passed

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated'); // Now it should be the updated value
  });
});
