import { useState } from "react";

export const LoginForm = ({ email, resetEmail }) => {
  const [formData, setFormData] = useState({
    email: email,
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">Welcome Back</h1>
      <p className="text-sm text-gray-400">Enter your password to continue</p>
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
            onChange={handleChange}
            disabled
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm text-gray-600">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="border-none py-2 px-3 rounded-md bg-gray-200 text-sm focus:outline-none"
            value={formData.password}
            onChange={handleChange}
          />
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
