import React from 'react';
import { render, screen, act } from '@testing-library/react';
import useDebounce from '../hooks/useDebounce';

jest.useFakeTimers();

const TestComponent = ({ value, delay }: { value: string; delay: number }) => {
  const debouncedValue = useDebounce(value, delay);
  return <span>{debouncedValue}</span>;
};

describe('useDebounce', () => {
  it('should debounce value after the specified delay', () => {
    const { rerender } = render(<TestComponent value="initial" delay={500} />);

    expect(screen.getByText('initial')).toBeInTheDocument();

    // Update the value and delay
    rerender(<TestComponent value="changed" delay={500} />);

    // Fast-forward time by 300ms
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Value should still be 'initial' as the delay hasn't passed yet
    expect(screen.getByText('initial')).toBeInTheDocument();

    // Fast-forward remaining 200ms
    act(() => {
      jest.advanceTimersByTime(200);
    });

    // Now the value should be 'changed'
    expect(screen.getByText('changed')).toBeInTheDocument();
  });
});
