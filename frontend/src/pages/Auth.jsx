import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { SignupForm } from "../components/SignupForm";

export function Auth() {
  const [email, setEmail] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  const resetEmail = () => {
    setFoundUser(null);
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
              <div className="flex flex-col gap-2">
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
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 text-sm"
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
