import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import useLocalStorage from '../hooks/useLocalStorage';

const TestComponent = ({
  keyName,
  initialValue,
  newValue,
}: {
  keyName: string;
  initialValue: string;
  newValue: string;
}) => {
  const [storedValue, setStoredValue] = useLocalStorage(keyName, initialValue);

  return (
    <div>
      <span data-testid="stored-value">{storedValue}</span>
      <button onClick={() => setStoredValue(newValue)}>Update Value</button>
    </div>
  );
};

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return initial value if no value is stored', () => {
    render(<TestComponent keyName="key" initialValue="initial" newValue="" />);
    expect(screen.getByTestId('stored-value').textContent).toBe('initial');
  });

  it('should return stored value if it exists in localStorage', () => {
    localStorage.setItem('key', JSON.stringify('storedValue'));
    render(<TestComponent keyName="key" initialValue="initial" newValue="" />);
    expect(screen.getByTestId('stored-value').textContent).toBe('storedValue');
  });

  it('should update localStorage when state changes', () => {
    render(
      <TestComponent
        keyName="key"
        initialValue="initial"
        newValue="newValue"
      />,
    );
    act(() => {
      screen.getByText('Update Value').click();
    });
    expect(localStorage.getItem('key')).toBe(JSON.stringify('newValue'));
    expect(screen.getByTestId('stored-value').textContent).toBe('newValue');
  });
});
