import { useState } from "react";

export function useFormValidations() {
  const [errors, setErrors] = useState({});

  const validators = {
    email: (email) => {
      const emailRegex = /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/;

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
  };

  const validateField = (name, value) => {
    const validator = validators[name];
    const error = validator(value);

    if (!error) {
      const { [name]: _, ...rest } = errors;
      setErrors(rest);
      return;
    }
    setErrors({ ...errors, [name]: error });
  };

  const cleanSpaces = (value) => value.replace(/\s/g, "");

  return {
    errors,
    validateField,
    cleanSpaces,
  };
}
