import { renderHook, act } from '@testing-library/react-hooks';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value if no value is stored', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return stored value if it exists in localStorage', () => {
    localStorage.setItem('key', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update localStorage when state changes', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(localStorage.getItem('key')).toBe(JSON.stringify('newValue'));
  });
});
