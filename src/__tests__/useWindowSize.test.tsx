import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import useWindowSize from '../hooks/useWindowSize';

// Test component that uses the useWindowSize hook
const TestComponent = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <div data-testid="width">{width}</div>
      <div data-testid="height">{height}</div>
    </div>
  );
};

describe('useWindowSize', () => {
  it('should return the current window dimensions', () => {
    global.innerWidth = 1024;
    global.innerHeight = 768;

    render(<TestComponent />);

    expect(screen.getByTestId('width')).toHaveTextContent('1024');
    expect(screen.getByTestId('height')).toHaveTextContent('768');
  });

  it('should update the dimensions when the window is resized', () => {
    render(<TestComponent />);

    // Update the window size and dispatch a resize event
    act(() => {
      global.innerWidth = 1200;
      global.innerHeight = 800;
      global.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByTestId('width')).toHaveTextContent('1200');
    expect(screen.getByTestId('height')).toHaveTextContent('800');
  });
});
