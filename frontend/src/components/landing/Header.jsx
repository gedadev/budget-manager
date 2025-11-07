import { LuArrowRight, LuMenu, LuX } from "react-icons/lu";
import { productBranding } from "../../utils/branding";
import { useScreen } from "../../hooks/useScreen";
import { useState } from "react";

export function Header() {
  const { isMobile } = useScreen();
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
      <div className="flex gap-2 items-center md:px-4 md:py-2">
        <span className="text-slate-900 bg-cyan-500 rounded-md p-1">
          {productBranding.logo}
        </span>
        <h1 className="text-slate-200 text-xl font-semibold">
          {productBranding.name}
        </h1>
      </div>
      {isMobile ? (
        <>
          <div>
            {activeMenu ? (
              <LuX
                className="text-slate-200 text-xl cursor-pointer"
                onClick={() => setActiveMenu(!activeMenu)}
              />
            ) : (
              <LuMenu
                className="text-slate-200 text-xl cursor-pointer"
                onClick={() => setActiveMenu(!activeMenu)}
              />
            )}
          </div>
          <div
            className={`absolute ${
              activeMenu
                ? "top-full opacity-100 pointer-events-auto"
                : "-top-full opacity-0 pointer-events-none"
            } right-0 w-screen bg-slate-950 bg-opacity-90 transition-all duration-200`}
          >
            <ul className="text-slate-300 flex flex-col">
              <li className="px-2 py-1">
                <button className="flex gap-1 items-center justify-center p-2 w-full rounded-md hover:bg-slate-900 transition-all duration-150">
                  Features
                </button>
              </li>
              <li className="px-2 py-1">
                <button className="flex gap-1 items-center justify-center p-2 w-full rounded-md hover:bg-slate-900 transition-all duration-150">
                  Pricing
                </button>
              </li>
              <li className="px-2 py-1">
                <button className="flex gap-1 items-center justify-center p-2 w-full rounded-md hover:bg-slate-900 transition-all duration-150">
                  Learn More
                </button>
              </li>
              <li className="px-2 py-1">
                <button className="flex gap-1 items-center justify-center p-2 w-full bg-cyan-500 text-slate-800 font-semibold rounded-md hover:bg-cyan-400 transition-all duration-150">
                  Sign Up Now! <LuArrowRight />
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="md:px-4">
          <ul className="text-slate-200 flex md:gap-4 gap-2 text-sm md:text-base">
            <li>
              <button className="flex items-center py-1 px-2 rounded-md hover:bg-slate-800 transition-all duration-150">
                Features
              </button>
            </li>
            <li>
              <button className="flex items-center py-1 px-2 rounded-md hover:bg-slate-800 transition-all duration-150">
                Pricing
              </button>
            </li>
            <li>
              <button className="flex items-center py-1 px-2 rounded-md hover:bg-slate-800 transition-all duration-150">
                Learn More
              </button>
            </li>
            <li>
              <button className="bg-cyan-500 text-slate-800 font-semibold py-1 px-2 rounded-md flex items-center gap-1 hover:bg-cyan-400 transition-all duration-150">
                Sign Up Now! <LuArrowRight />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
