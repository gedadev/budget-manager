import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ExpenseForm } from "./ExpenseForm";
import { ExpensesList } from "./ExpensesList";
import { LuFolders, LuLogOut } from "react-icons/lu";
import { ExpensesSummary } from "./ExpensesSummary";

export function Expenses() {
  return (
    <div>
      <Header />
      <ExpenseForm />
      <ExpensesSummary />
      <ExpensesList />
    </div>
  );
}

const Header = () => {
  const { logout } = useAuth();

  return (
    <header>
      <div className="flex justify-between items-center mx-auto max-w-6xl h-16 py-4">
        <div></div>
        <div>
          <ul className="flex gap-2">
            <Link to={"categories"}>
              <li className="flex items-center gap-2 bg-slate-700 p-2 rounded-md">
                <LuFolders /> Manage Categories
              </li>
            </Link>
            <li
              className="cursor-pointer flex items-center gap-2 bg-slate-700 p-2 rounded-md"
              onClick={logout}
            >
              <LuLogOut /> Logout
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
