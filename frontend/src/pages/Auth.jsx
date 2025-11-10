import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
import { EmailForm } from "../components/auth/EmailForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Auth() {
  const { foundUser, getUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const findUser = async () => {
      const { success } = await getUserData();

      if (success) navigate("/dashboard");
    };

    findUser();
  }, []);

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-2 border-2 p-4 mx-4 rounded-md shadow-md w-full max-w-96">
        {foundUser === null && <EmailForm />}
        {foundUser === true && <LoginForm />}
        {foundUser === false && <SignupForm />}
      </div>
    </main>
  );
}
