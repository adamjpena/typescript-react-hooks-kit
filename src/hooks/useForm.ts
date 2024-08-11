import { useState } from 'react';

/**
 * useForm - A hook that manages form state.
 * @param initialValues - An object representing the initial state of the form.
 * @returns An object containing the form values, a handleChange function, and a resetForm function.
 */
const useForm = (initialValues: Record<string, any>) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => setValues(initialValues);

  return {
    values,
    handleChange,
    resetForm,
  };
};

export default useForm;
