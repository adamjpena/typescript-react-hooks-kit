import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from '../hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should debounce value after the specified delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 },
      },
    );

    expect(result.current).toBe('initial');

    rerender({ value: 'changed', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('initial'); // Still the initial value because delay hasn't passed

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('changed'); // Now it should be the changed value
  });
});
