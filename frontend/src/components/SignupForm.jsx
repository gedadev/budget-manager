import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useFormValidations } from "../hooks/useFormValidations";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export const SignupForm = ({ email, resetEmail }) => {
  const { access } = useAuth();
  const { validateField, errors, cleanSpaces } = useFormValidations();
  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [formData, setFormData] = useState({
    email: email,
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = cleanSpaces(value);

    if (name === "name") cleanedValue = value;

    validateField(name, cleanedValue);
    setFormData({ ...formData, [name]: cleanedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = await access(formData, "signup");
    if (success) navigate("/dashboard");
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Create your Account</h1>
      <p className="text-sm text-gray-400">Complete your profile to continue</p>
      <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="border-none py-2 px-3 rounded-md bg-gray-200 text-sm text-gray-400"
            value={formData.email}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="name" className="text-sm text-gray-600">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="name"
            placeholder="Enter your name"
            className="border-none py-2 px-3 rounded-md bg-gray-200 text-sm focus:outline-none"
            value={formData.name}
            onChange={handleChange}
          />
          {errors?.name && (
            <span className="absolute top-full right-0 bg-rose-500 text-gray-800 text-xs rounded p-1 bg-opacity-90 z-10 max-w-64">
              {errors.name}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 relative">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={visiblePassword ? "text" : "password"}
              placeholder="Create a password"
              className="border-none py-2 px-3 rounded-md bg-gray-200 text-sm focus:outline-none w-full"
              value={formData.password}
              onChange={handleChange}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-0 px-2 cursor-pointer"
              onClick={() => setVisiblePassword(!visiblePassword)}
            >
              {visiblePassword ? <LuEyeClosed /> : <LuEye />}
            </div>
          </div>
          {errors?.password && (
            <span className="absolute top-full right-0 bg-rose-500 text-gray-800 text-xs rounded p-1 bg-opacity-95 z-10 max-w-64">
              {errors.password}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 text-sm transition-all duration-200 ease-in-out"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={resetEmail}
          className=" text-gray-400 p-2 rounded-md hover:bg-gray-100 hover:text-gray-500 text-sm transition-all duration-200 ease-in-out"
        >
          Use a different email
        </button>
      </form>
    </>
  );
};
