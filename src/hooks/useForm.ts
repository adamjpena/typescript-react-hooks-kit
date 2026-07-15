import { useState } from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export type FormFieldValue =
  string | number | boolean | readonly string[] | undefined;

export type FormValues = Record<string, FormFieldValue>;

export interface UseFormReturn<TValues extends FormValues> {
  values: TValues;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
  resetForm: () => void;
  setValue: <TName extends keyof TValues>(
    name: TName,
    value: TValues[TName],
  ) => void;
  setValues: Dispatch<SetStateAction<TValues>>;
}

const getFieldValue = (
  target: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): FormFieldValue => {
  if (target instanceof HTMLInputElement && target.type === 'checkbox') {
    return target.checked;
  }

  return target.value;
};

/**
 * useForm - A hook that manages form state.
 * @param initialValues - An object representing the initial state of the form.
 * @returns An object containing the form values, a handleChange function, and a resetForm function.
 */
const useForm = <TValues extends FormValues>(
  initialValues: TValues,
): UseFormReturn<TValues> => {
  const [values, setValues] = useState<TValues>(initialValues);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name } = event.target;
    const value = getFieldValue(event.target);

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const resetForm = () => setValues(initialValues);

  const setValue = <TName extends keyof TValues>(
    name: TName,
    value: TValues[TName],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  return {
    values,
    handleChange,
    resetForm,
    setValue,
    setValues,
  };
};

export default useForm;
