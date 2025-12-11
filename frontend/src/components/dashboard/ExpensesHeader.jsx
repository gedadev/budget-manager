import {
  LuBrain,
  LuChevronDown,
  LuCircleUser,
  LuFolders,
  LuLogOut,
  LuReceipt,
  LuSettings,
  LuWallet,
} from "react-icons/lu";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { productBranding } from "../../utils/branding";
import { useState } from "react";
import { useScreen } from "../../hooks/useScreen";

export function ExpensesHeader() {
  const { logout } = useAuth();
  const { isMedium } = useScreen();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMobileMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowProfileMenu(false);
  };

  const handleProfileMenuClick = () => {
    setShowProfileMenu(!showProfileMenu);
    setShowMobileMenu(false);
  };

  return (
    <header>
      <div className="flex justify-between items-center mx-auto max-w-6xl h-16 py-4 relative">
        <div className="flex gap-2 items-center md:px-2 md:py-2">
          <span className="text-slate-900 bg-cyan-500 rounded-md p-1">
            {productBranding.logo}
          </span>
          <h1 className="text-slate-200 text-lg lg:text-xl font-semibold">
            {productBranding.name}
          </h1>
        </div>
        <div className="flex gap-2 items-center">
          {isMedium ? (
            <div>
              <button
                onClick={handleMobileMenuClick}
                className="flex items-center gap-1 text-sm text-slate-300 hover:text-slate-400 transition-all duration-200 ease-in-out"
              >
                Menu <LuChevronDown />
              </button>
              <div
                className={`absolute right-0 z-10 bg-slate-700 shadow-lg rounded-md p-2 mt-2 transition-all duration-200 ease-in-out ${
                  showMobileMenu
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                <ul className="flex flex-col gap-4 text-sm p-2 text-slate-300">
                  <Link to={"expenses"} onClick={handleMobileMenuClick}>
                    <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                      <LuReceipt />
                      Manage Expenses
                    </li>
                  </Link>
                  <Link to={"categories"} onClick={handleMobileMenuClick}>
                    <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                      <LuFolders />
                      Manage Categories
                    </li>
                  </Link>
                  <Link to={"budgets"} onClick={handleMobileMenuClick}>
                    <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                      <LuWallet />
                      Manage Budgets
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <ul className="flex gap-2 text-sm">
                <Link to={"expenses"}>
                  <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                    <LuReceipt />
                    Manage Expenses
                  </li>
                </Link>
                <Link to={"categories"}>
                  <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                    <LuFolders />
                    Manage Categories
                  </li>
                </Link>
                <Link to={"budgets"}>
                  <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                    <LuWallet />
                    Manage Budgets
                  </li>
                </Link>
              </ul>
            </div>
          )}
          <div>
            <div
              className="cursor-pointer border-l-2 border-slate-500 pl-2 md:px-2"
              onClick={handleProfileMenuClick}
            >
              <LuCircleUser className="text-slate-300 text-3xl" />
            </div>
            <div
              className={`absolute right-0 z-10 bg-slate-700 shadow-lg rounded-md p-2 mt-2 transition-all duration-200 ease-in-out ${
                showProfileMenu
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <ul className={`flex flex-col gap-2 p-2 text-slate-300 text-sm`}>
                <Link to={""} onClick={handleProfileMenuClick}>
                  <li className="flex items-center gap-2 hover:text-emerald-500 transition-all duration-200 ease-in-out">
                    <LuBrain />
                    Get Advanced Features
                  </li>
                </Link>
                <Link to={""} onClick={handleProfileMenuClick}>
                  <li className="flex items-center gap-2 hover:text-slate-400 transition-all duration-200 ease-in-out">
                    <LuSettings />
                    Settings
                  </li>
                </Link>
                <Link to={""} onClick={handleProfileMenuClick}>
                  <li
                    onClick={logout}
                    className="border-t border-slate-500 pt-2 flex items-center gap-2 hover:text-red-500 transition-all duration-200 ease-in-out"
                  >
                    <LuLogOut />
                    Logout
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
