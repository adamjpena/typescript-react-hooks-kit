import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import useThrottle from '../hooks/useThrottle';

jest.useFakeTimers();

const TestComponent = ({ value }: { value: string }) => {
  const throttledValue = useThrottle(value, 1000);
  return <div data-testid="throttled-value">{throttledValue}</div>;
};

describe('useThrottle', () => {
  it('should update value at throttled intervals', () => {
    const { rerender } = render(<TestComponent value="initial" />);

    expect(screen.getByTestId('throttled-value')).toHaveTextContent('initial');

    rerender(<TestComponent value="updated" />);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('throttled-value')).toHaveTextContent('initial'); // Still the initial value because delay hasn't passed

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId('throttled-value')).toHaveTextContent('updated'); // Now it should be the updated value
  });
});
