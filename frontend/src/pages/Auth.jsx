import { useEffect, useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";
import { useAuth } from "../hooks/useAuth";
import { useFormValidations } from "../hooks/useFormValidations";

export function Auth() {
  const { verifyEmail } = useAuth();
  const { validateForm, errors, cleanSpaces, resetErrors, handleBlur } =
    useFormValidations();
  const [email, setEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const isValid = validateForm({ email });

    setFormIsValid(isValid);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { foundUser } = await verifyEmail(email);
    setFoundUser(foundUser);
  };

  const resetEmail = () => {
    setFoundUser(null);
  };

  const handleChange = (e) => {
    const { value } = e.target;

    resetErrors();
    setEmail(cleanSpaces(value));
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2 border-2 p-4 mx-4 rounded-md shadow-md w-full max-w-96">
        {foundUser === null && (
          <>
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <p className="text-sm text-gray-400">
              Enter your email to continue
            </p>
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
                {errors?.email && (
                  <span className="absolute top-full right-0 bg-rose-500 text-gray-800 text-xs rounded p-1 bg-opacity-90 z-10">
                    {errors.email}
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
        )}
        {foundUser === true && (
          <LoginForm email={email} resetEmail={resetEmail} />
        )}
        {foundUser === false && (
          <SignupForm email={email} resetEmail={resetEmail} />
        )}
      </div>
    </main>
  );
}
