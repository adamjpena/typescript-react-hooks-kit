import { renderHook } from '@testing-library/react-hooks';
import useInterval from '../hooks/useInterval';
import { act } from 'react-dom/test-utils';

jest.useFakeTimers();

describe('useInterval', () => {
  it('should call the callback at specified intervals', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, 1000));

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(callback).toHaveBeenCalledTimes(5);
  });

  it('should not run the interval when delay is null', () => {
    const callback = jest.fn();
    renderHook(() => useInterval(callback, null));

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(callback).not.toHaveBeenCalled();
  });
});
