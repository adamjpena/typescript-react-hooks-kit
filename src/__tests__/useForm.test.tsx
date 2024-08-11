import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import useForm from '../hooks/useForm';

const TestComponent = ({
  initialValues,
}: {
  initialValues: Record<string, any>;
}) => {
  const { values, handleChange, resetForm } = useForm(initialValues);

  return (
    <form>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        data-testid="name-input"
      />
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        data-testid="email-input"
      />
      <button type="button" onClick={resetForm} data-testid="reset-button">
        Reset
      </button>
    </form>
  );
};

describe('useForm', () => {
  it('should initialize form with given values', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    render(<TestComponent initialValues={initialValues} />);

    expect(screen.getByTestId('name-input')).toHaveValue('John');
    expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
  });

  it('should update form values on change', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    render(<TestComponent initialValues={initialValues} />);

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Jane' },
    });

    expect(screen.getByTestId('name-input')).toHaveValue('Jane');
  });

  it('should reset form values', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    render(<TestComponent initialValues={initialValues} />);

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Jane' },
    });
    fireEvent.click(screen.getByTestId('reset-button'));

    expect(screen.getByTestId('name-input')).toHaveValue('John');
    expect(screen.getByTestId('email-input')).toHaveValue('john@example.com');
  });
});
