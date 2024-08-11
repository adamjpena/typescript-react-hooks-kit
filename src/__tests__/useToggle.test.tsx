import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useToggle from '../hooks/useToggle';

const TestComponent = ({ initialValue }: { initialValue: boolean }) => {
  const [value, toggle, setValue] = useToggle(initialValue);

  return (
    <div>
      <div data-testid="value">{value.toString()}</div>
      <button onClick={toggle}>Toggle</button>
      <button onClick={() => setValue(true)}>Set True</button>
      <button onClick={() => setValue(false)}>Set False</button>
    </div>
  );
};

describe('useToggle', () => {
  it('should initialize with the correct value', () => {
    render(<TestComponent initialValue={true} />);
    expect(screen.getByTestId('value')).toHaveTextContent('true');
  });

  it('should toggle the value', () => {
    render(<TestComponent initialValue={false} />);

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('value')).toHaveTextContent('true');

    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('value')).toHaveTextContent('false');
  });

  it('should set the value to a specific boolean', () => {
    render(<TestComponent initialValue={false} />);

    fireEvent.click(screen.getByText('Set True'));
    expect(screen.getByTestId('value')).toHaveTextContent('true');

    fireEvent.click(screen.getByText('Set False'));
    expect(screen.getByTestId('value')).toHaveTextContent('false');
  });
});
