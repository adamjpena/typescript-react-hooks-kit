import { renderHook, act } from '@testing-library/react-hooks';
import useToggle from '../hooks/useToggle';

describe('useToggle', () => {
  it('should initialize with the correct value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle the value', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });

  it('should set the value to a specific boolean', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[2](true);
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](false);
    });
    expect(result.current[0]).toBe(false);
  });
});
