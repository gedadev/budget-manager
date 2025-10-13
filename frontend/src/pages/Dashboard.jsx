import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { isLogged, getUserData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const findUser = async () => {
      const { success } = await getUserData();
      return success;
    };

    if (!findUser()) navigate("/auth");
  }, []);

  return (
    <>
      {isLogged && (
        <main>
          <h1>Dashboard</h1>
        </main>
      )}
    </>
  );
}
