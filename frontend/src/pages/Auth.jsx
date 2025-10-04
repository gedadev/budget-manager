import { useState } from "react";

export function Auth() {
  const [formData, setFormData] = useState({ email: "" });
  const [foundUser, setFoundUser] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = formData;

    const response = await fetch("/api/auth/check-email", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setFoundUser(data.foundUser);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2 border-2 p-4 mx-4 rounded-md shadow-md w-full max-w-96">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        <p>{foundUser ? "user found" : "user not found"}</p>
        <p className="text-sm text-gray-400">Enter your email to continue</p>
        <form
          className="flex flex-col gap-3 mt-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <label htmlFor="email" className="text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            className="border-none py-2 px-3 rounded-md bg-gray-200 text-sm focus:outline-none"
            value={formData.email}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 text-sm"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
