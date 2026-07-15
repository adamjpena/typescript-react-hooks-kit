import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import useForm from '../hooks/useForm';

interface ContactFormValues {
  name: string;
  email: string;
  subscribed: boolean;
}

const initialValues: ContactFormValues = {
  name: 'Ada',
  email: 'ada@example.com',
  subscribed: false,
};

const TestForm = () => {
  const { values, handleChange, resetForm, setValue } =
    useForm<ContactFormValues>(initialValues);

  return (
    <form>
      <input
        aria-label="Name"
        name="name"
        onChange={handleChange}
        value={values.name}
      />
      <input
        aria-label="Email"
        name="email"
        onChange={handleChange}
        value={values.email}
      />
      <input
        aria-label="Subscribed"
        checked={values.subscribed}
        name="subscribed"
        onChange={handleChange}
        type="checkbox"
      />
      <button type="button" onClick={() => setValue('name', 'Grace')}>
        Set name
      </button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
};

describe('useForm', () => {
  it('tracks text and checkbox changes', () => {
    render(<TestForm />);

    fireEvent.change(screen.getByLabelText('Name'), {
      target: { value: 'Lin' },
    });
    fireEvent.click(screen.getByLabelText('Subscribed'));

    expect(screen.getByLabelText('Name')).toHaveValue('Lin');
    expect(screen.getByLabelText('Subscribed')).toBeChecked();
  });

  it('sets individual values and resets to initial values', () => {
    render(<TestForm />);

    fireEvent.click(screen.getByRole('button', { name: 'Set name' }));
    expect(screen.getByLabelText('Name')).toHaveValue('Grace');

    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByLabelText('Name')).toHaveValue('Ada');
    expect(screen.getByLabelText('Email')).toHaveValue('ada@example.com');
  });
});
