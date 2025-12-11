import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import {
  LuBrain,
  LuCircleUser,
  LuFolders,
  LuLogOut,
  LuSettings,
} from "react-icons/lu";
import { productBranding } from "../../utils/branding";
import { useState } from "react";

export function ExpensesHeader() {
  const { logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <div className="flex justify-between items-center mx-auto max-w-6xl h-16 py-4 relative">
        <div className="flex gap-2 items-center md:px-4 md:py-2">
          <span className="text-slate-900 bg-cyan-500 rounded-md p-1">
            {productBranding.logo}
          </span>
          <h1 className="text-slate-200 text-xl font-semibold">
            {productBranding.name}
          </h1>
        </div>
        <div>
          <div>
            <div
              className="cursor-pointer border-l-2 border-slate-500 pl-2 md:px-2"
              onClick={() => setShowMenu(!showMenu)}
            >
              <LuCircleUser className="text-slate-300 text-3xl" />
            </div>
            <div
              className={`absolute right-0 z-10 bg-slate-700 shadow-lg rounded-md p-2 mt-2 transition-all duration-200 ease-in-out ${
                showMenu ? "opacity-100" : "opacity-0"
              }`}
            >
              <ul className={`flex flex-col gap-2 p-2 text-slate-300 text-sm`}>
                <Link to={""}>
                  <li className="flex items-center gap-2 hover:text-emerald-500 transition-all duration-200 ease-in-out">
                    <LuBrain className="" />
                    Get Advanced Features
                  </li>
                </Link>
                <Link to={""}>
                  <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                    <LuSettings />
                    Settings
                  </li>
                </Link>
                <Link to={""}>
                  <li
                    onClick={logout}
                    className="flex items-center gap-2 hover:text-red-500 transition-all duration-200 ease-in-out"
                  >
                    <LuLogOut />
                    Logout
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          {/* <div>
            <ul>
              <Link to={"categories"}>
                <li className="flex items-center gap-2 bg-slate-700 p-2 rounded-md">
                  <LuFolders /> Manage Categories
                </li>
              </Link>
              <Link to={"expenses"}>
                <li className="flex items-center gap-2 bg-slate-700 p-2 rounded-md">
                  <LuFolders /> Manage Expenses
                </li>
              </Link>
            </ul>
          </div>
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
          </ul> */}
        </div>
      </div>
    </header>
  );
}
