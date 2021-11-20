import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleInputChange = ({ target }) => {
    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const reset = () => {
    setFormValues(initialState);
  };

  return { formValues, handleInputChange, reset };
};
