import { renderHook } from '@testing-library/react-hooks';
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

    rerender({ value: 'second' });

    expect(result.current).toBe('first');

    rerender({ value: 'third' });

    expect(result.current).toBe('second');
  });
});
