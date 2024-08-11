import React from 'react';
import { render, screen } from '@testing-library/react';
import usePrevious from '../hooks/usePrevious';

// Create a Test Component that uses the usePrevious hook
const TestComponent = ({ value }: { value: string }) => {
  const previous = usePrevious(value);
  return (
    <div>
      <span data-testid="previous-value">{previous}</span>
    </div>
  );
};

describe('usePrevious', () => {
  it('should return undefined initially', () => {
    render(<TestComponent value="initial" />);

    // The previous value should be undefined initially
    expect(screen.getByTestId('previous-value')).toBeEmptyDOMElement();
  });

  it('should return the previous value after an update', () => {
    const { rerender } = render(<TestComponent value="first" />);

    // After initial render
    expect(screen.getByTestId('previous-value')).toBeEmptyDOMElement();

    // Update the value
    rerender(<TestComponent value="second" />);

    // The previous value should be 'first'
    expect(screen.getByTestId('previous-value')).toHaveTextContent('first');

    // Update the value again
    rerender(<TestComponent value="third" />);

    // The previous value should be 'second'
    expect(screen.getByTestId('previous-value')).toHaveTextContent('second');
  });
});
