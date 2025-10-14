import { useState } from "react";
import { useFormatter } from "./useFormatter";

export function useFormValidations() {
  const { cleanCurrency } = useFormatter();
  const [formErrors, setFormErrors] = useState({});

  const validators = {
    email: (email) => {
      const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,10}\b/;

      if (!email) {
        return "Email is required";
      } else if (!emailRegex.test(email)) {
        return "Enter a valid email";
      }
      return false;
    },
    password: (password) => {
      const minLength = password.length >= 8;
      const hasUpper = /[A-Z]/.test(password);
      const hasLower = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);

      if (!password) {
        return "Password is required";
      } else if (!hasUpper || !hasLower || !hasNumber) {
        return "Password must contain a lower case letter, an upper case letter and a number";
      } else if (!minLength) {
        return "Password must have at least 8 characters";
      } else {
        return false;
      }
    },
    name: (name) => {
      if (!name) {
        return "Enter your name";
      } else {
        return false;
      }
    },
    description: (description) => {
      if (!description) {
        return "What did you buy?";
      } else {
        return false;
      }
    },
    commerce: (commerce) => {
      if (!commerce) {
        return "Where did you buy it?";
      } else {
        return false;
      }
    },
    amount: (amount) => {
      if (Number(cleanCurrency(amount)) <= 0) {
        return "Can't be free";
      } else {
        return false;
      }
    },
    date: (date) => {
      if (!date) {
        return "When did you buy it?";
      } else {
        return false;
      }
    },
  };

  const validateField = (name, value) => {
    const validator = validators[name];
    if (!validator) return;

    const error = validator(value);

    if (!error) {
      const { [name]: _, ...rest } = formErrors;
      setFormErrors(rest);
      return;
    }
    setFormErrors({ ...formErrors, [name]: error });
  };

  const validateForm = (formData) => {
    const validForm = Object.entries(formData).reduce(
      (valid, [name, value]) => {
        const validator = validators[name];
        if (!validator) return valid;

        const foundError = validator(value);
        return valid && !foundError;
      },
      true
    );

    return validForm;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    validateField(name, cleanSpaces(value));
  };

  const resetErrors = () => setFormErrors({});

  const cleanSpaces = (value) => value.replace(/\s/g, "");

  return {
    formErrors,
    validateForm,
    cleanSpaces,
    resetErrors,
    handleBlur,
  };
}
