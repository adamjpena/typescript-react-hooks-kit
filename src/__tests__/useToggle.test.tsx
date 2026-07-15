import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useToggle from '../hooks/useToggle';

describe('useToggle', () => {
  it('uses false as the default value', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it('toggles and sets values', () => {
    const { result } = renderHook(() => useToggle(false));

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](false);
    });

    expect(result.current[0]).toBe(false);
  });
});
