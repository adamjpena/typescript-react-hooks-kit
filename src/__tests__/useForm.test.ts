import { renderHook, act } from '@testing-library/react-hooks';
import useForm from '../hooks/useForm';

describe('useForm', () => {
  it('should initialize form with given values', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const { result } = renderHook(() => useForm(initialValues));

    expect(result.current.values).toEqual(initialValues);
  });

  it('should update form values on change', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Jane' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.values.name).toBe('Jane');
  });

  it('should reset form values', () => {
    const initialValues = { name: 'John', email: 'john@example.com' };
    const { result } = renderHook(() => useForm(initialValues));

    act(() => {
      result.current.handleChange({
        target: { name: 'name', value: 'Jane' },
      } as React.ChangeEvent<HTMLInputElement>);
      result.current.resetForm();
    });

    expect(result.current.values).toEqual(initialValues);
  });
});
