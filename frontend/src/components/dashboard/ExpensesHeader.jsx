import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { LuFolders, LuLogOut } from "react-icons/lu";
import { productBranding } from "../../utils/branding";

export function ExpensesHeader() {
  const { logout } = useAuth();

  return (
    <header>
      <div className="flex justify-between items-center mx-auto max-w-6xl h-16 py-4">
        <div className="flex gap-2 items-center md:px-4 md:py-2">
          <span className="text-slate-900 bg-cyan-500 rounded-md p-1">
            {productBranding.logo}
          </span>
          <h1 className="text-slate-200 text-xl font-semibold">
            {productBranding.name}
          </h1>
        </div>
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
}
