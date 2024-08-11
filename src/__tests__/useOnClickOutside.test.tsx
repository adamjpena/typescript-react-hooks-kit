import React, { useRef } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import useOnClickOutside from '../hooks/useOnClickOutside';

// Create a Test Component that uses the useOnClickOutside hook
const TestComponent = ({ onClickOutside }: { onClickOutside: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, onClickOutside);
  return (
    <div ref={ref} data-testid="test-element">
      Click me
    </div>
  );
};

describe('useOnClickOutside', () => {
  it('should call the handler when clicking outside the element', () => {
    const handler = jest.fn();
    render(<TestComponent onClickOutside={handler} />);

    // Simulate clicking outside the element
    fireEvent.mouseDown(document);

    expect(handler).toHaveBeenCalled();
  });

  it('should not call the handler when clicking inside the element', () => {
    const handler = jest.fn();
    render(<TestComponent onClickOutside={handler} />);

    // Simulate clicking inside the element
    fireEvent.mouseDown(screen.getByTestId('test-element'));

    expect(handler).not.toHaveBeenCalled();
  });
});
