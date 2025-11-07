import { LuCheck, LuChevronsLeft, LuChevronsRight } from "react-icons/lu";
import { useScreen } from "../../hooks/useScreen";
import { useState } from "react";

export function ProductBenefits({ productBranding }) {
  const { isMobile } = useScreen();
  const [slidePosition, setSlidePosition] = useState(0);

  return (
    <>
      {isMobile ? (
        <div className="w-11/12 overflow-hidden flex relative">
          <div className="text-slate-400 absolute w-full flex justify-between top-1/2 -translate-y-1/2 z-10">
            <LuChevronsLeft
              className={`text-4xl animate-bounce-l ${
                slidePosition !== 1 && "opacity-0 pointer-events-none"
              }`}
              onClick={() => setSlidePosition(0)}
            />
            <LuChevronsRight
              className={`text-4xl animate-bounce-r ${
                slidePosition !== 0 && "opacity-0 pointer-events-none"
              }`}
              onClick={() => setSlidePosition(1)}
            />
          </div>
          <div
            className="min-w-full transition-all duration-200"
            style={{ translate: `${slidePosition * -100}%` }}
          >
            <h1 className="text-slate-100 text-4xl font-semibold my-6 text-center">
              Why Choose {productBranding.name}?
            </h1>
            <ul className="flex flex-col gap-2">
              {productBranding.benefits.map((item, i) => (
                <span key={i} className="flex gap-2 text-slate-400">
                  <LuCheck className="text-cyan-500 mt-1" /> {item}
                </span>
              ))}
            </ul>
          </div>
          <div
            className="bg-slate-800 border border-slate-700 rounded-md p-8 min-w-full transition-all duration-200"
            style={{
              translate: `${slidePosition * -100}%`,
              opacity: `${slidePosition === 0 ? "0" : "1"}`,
            }}
          >
            <span className="text-cyan-500 text-sm">QUICK STATS</span>
            <h3 className="text-slate-300 text-lg font-semibold">
              Track Your Progress
            </h3>
            <div className="mt-4">
              <div className="flex justify-between py-4 border-b border-slate-500">
                <span className="text-slate-400">Expenses Tracked</span>
                <span className="text-cyan-500">1000+</span>
              </div>
              <div className="flex justify-between py-4 border-b border-slate-500">
                <span className="text-slate-400">Categories</span>
                <span className="text-cyan-500">Unlimited</span>
              </div>
              <div className="flex justify-between py-4 border-b border-slate-500">
                <span className="text-slate-400">Budget Types</span>
                <span className="text-cyan-500">3 Options</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-slate-400">Payment Methods</span>
                <span className="text-cyan-500">5+ Types</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10 max-w-4xl mx-4">
          <div>
            <h1 className="text-slate-100 text-4xl font-semibold my-6">
              Why Choose {productBranding.name}?
            </h1>
            <ul className="flex flex-col gap-4">
              {productBranding.benefits.map((item, i) => (
                <span key={i} className="flex gap-2 text-slate-400">
                  <LuCheck className="text-cyan-500 mt-1" /> {item}
                </span>
              ))}
            </ul>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-md p-8">
            <span className="text-cyan-500 text-sm">QUICK STATS</span>
            <h3 className="text-slate-300 text-lg font-semibold">
              Track Your Progress
            </h3>
            <div className="mt-4">
              <div className="flex justify-between py-4 border-b border-slate-500">
                <span className="text-slate-400">Expenses Tracked</span>
                <span className="text-cyan-500">1000+</span>
              </div>
              <div className="flex justify-between py-4 border-b border-slate-500">
                <span className="text-slate-400">Categories</span>
                <span className="text-cyan-500">Unlimited</span>
              </div>
              <div className="flex justify-between py-4 border-b border-slate-500">
                <span className="text-slate-400">Budget Types</span>
                <span className="text-cyan-500">3 Options</span>
              </div>
              <div className="flex justify-between py-4">
                <span className="text-slate-400">Payment Methods</span>
                <span className="text-cyan-500">5+ Types</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
