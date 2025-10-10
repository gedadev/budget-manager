import { useAuth } from "../hooks/useAuth";
import { LoginForm } from "../components/auth/LoginForm";
import { SignupForm } from "../components/auth/SignupForm";
import { EmailForm } from "../components/auth/EmailForm";

export function Auth() {
  const { foundUser } = useAuth();

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
