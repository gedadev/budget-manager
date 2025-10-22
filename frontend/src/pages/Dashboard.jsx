import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Outlet, useNavigate } from "react-router-dom";
import { ExpensesProvider } from "../context/ExpensesProvider";
import { CategoriesProvider } from "../context/CategoriesContext";

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
    <div className="bg-slate-900 text-slate-50 min-h-screen">
      {isLogged && (
        <ExpensesProvider>
          <CategoriesProvider>
            <main className="px-4">
              <Outlet />
            </main>
          </CategoriesProvider>
        </ExpensesProvider>
      )}
    </div>
  );
}
