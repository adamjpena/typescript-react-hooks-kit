import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import useLocalStorage from '../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns the initial value when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('name', 'Ada'));

    expect(result.current[0]).toBe('Ada');
  });

  it('reads an existing stored value', () => {
    window.localStorage.setItem('name', JSON.stringify('Grace'));

    const { result } = renderHook(() => useLocalStorage('name', 'Ada'));

    expect(result.current[0]).toBe('Grace');
  });

  it('updates state and localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('name', 'Ada'));

    act(() => {
      result.current[1]((previousValue) => `${previousValue} Lovelace`);
    });

    expect(result.current[0]).toBe('Ada Lovelace');
    expect(window.localStorage.getItem('name')).toBe(
      JSON.stringify('Ada Lovelace'),
    );
  });

  it('falls back to the initial value for malformed JSON', () => {
    window.localStorage.setItem('name', '{bad-json');

    const { result } = renderHook(() => useLocalStorage('name', 'Ada'));

    expect(result.current[0]).toBe('Ada');
  });
});
