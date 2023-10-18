import { useState, useEffect } from 'react';
import validate from 'validate.js';

const useForm = (schema, callback) => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values, schema]);

  const handleChange = (e) => {
    e.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]:
          e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.type === 'file'
            ? e.target.files[0]
            : e.target.value,
      },
      touched: {
        ...formState.touched,
        [e.target.name]: true,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    callback();
    setFormState({
      isValid: false,
      values: {},
      touched: {},
      errors: {},
    });
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return {
    formState,
    handleChange,
    handleSubmit,
    hasError,
  };
};

export default useForm;
