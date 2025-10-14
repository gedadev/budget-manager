import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useFormValidations } from "../../hooks/useFormValidations";
import { useFormatter } from "../../hooks/useFormatter";

export const EmailForm = () => {
  const { email, handleEmailChange, handleEmailSubmit } = useAuth();
  const { cleanSpaces } = useFormatter();
  const { validateForm, formErrors, resetErrors, handleBlur } =
    useFormValidations();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const isValid = validateForm({ email });

    setFormIsValid(isValid);
  }, [email]);

  const handleChange = (e) => {
    const { value } = e.target;
    handleEmailChange(cleanSpaces(value));
    resetErrors();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailSubmit(email);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Welcome</h1>
      <p className="text-sm text-gray-400">Enter your email to continue</p>
      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="border-none py-2 px-3 rounded-md bg-gray-200 text-sm focus:outline-none"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {formErrors?.email && (
            <span className="absolute top-full right-0 bg-rose-500 text-gray-800 text-xs rounded p-1 bg-opacity-90 z-10">
              {formErrors.email}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 text-sm disabled:bg-gray-500"
          disabled={!formIsValid}
        >
          Continue
        </button>
      </form>
    </>
  );
};
