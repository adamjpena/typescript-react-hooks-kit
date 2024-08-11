import React, { act } from 'react';
import { render } from '@testing-library/react';
import useInterval from '../hooks/useInterval';

jest.useFakeTimers();

const TestComponent = ({
  callback,
  delay,
}: {
  callback: () => void;
  delay: number | null;
}) => {
  useInterval(callback, delay);
  return <div>Test Component</div>;
};

describe('useInterval', () => {
  it('should call the callback at specified intervals', () => {
    const callback = jest.fn();
    render(<TestComponent callback={callback} delay={1000} />);

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
    render(<TestComponent callback={callback} delay={null} />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(callback).not.toHaveBeenCalled();
  });
});
