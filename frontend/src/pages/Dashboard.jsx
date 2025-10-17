import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { AddExpense } from "../components/dashboard/AddExpense";
import { ExpensesProvider } from "../context/ExpensesProvider";
import { ExpensesList } from "../components/dashboard/ExpensesList";

export function Dashboard() {
  const { isLogged, getUserData, logout } = useAuth();
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
          <header>
            <div className="flex justify-between items-center mx-auto max-w-6xl h-16 p-4">
              <h1>Dashboard</h1>
              <button onClick={logout}>logout</button>
            </div>
          </header>
          <main className="px-4">
            <div>
              <AddExpense />
              <ExpensesList />
            </div>
          </main>
        </ExpensesProvider>
      )}
    </div>
  );
}
