import { renderHook, act } from '@testing-library/react-hooks';
import usePrevious from '../hooks/usePrevious';

describe('usePrevious', () => {
  it('should return undefined initially', () => {
    const { result } = renderHook(() => usePrevious('initial'));
    expect(result.current).toBeUndefined();
  });

  it('should return the previous value after an update', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'first' },
    });

    act(() => {
      rerender({ value: 'second' });
    });

    expect(result.current).toBe('first');

    act(() => {
      rerender({ value: 'third' });
    });

    expect(result.current).toBe('second');
  });
});
