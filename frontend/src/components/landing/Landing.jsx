import { LuArrowRight } from "react-icons/lu";
import { Link } from "react-router-dom";
import { ProductFeatures } from "./ProductFeatures";
import { ProductBenefits } from "./ProductBenefits";
import { productBranding } from "../../utils/branding";

export const Hero = () => {
  return (
    <div className="h-screen bg-slate-950">
      <div className="h-full max-w-xl m-auto text-center flex flex-col items-center justify-center gap-6">
        <h1 className="text-slate-100 text-5xl md:text-6xl font-bold">
          Master Your Finances With Ease
        </h1>
        <span className="text-slate-400 text-sm md:text-base">
          Track every expense, set smart budgets, and gain insights into your
          spending habits. Built for modern financial awareness.
        </span>
        <div className="flex gap-2">
          <Link to={"auth"}>
            <button className="p-2 text-sm font-semibold rounded-md bg-cyan-500 flex items-center gap-3">
              Start Tracking Now <LuArrowRight />
            </button>
          </Link>
          <button className="p-2 text-sm rounded-md bg-slate-800 text-slate-200 border border-slate-600">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export const Features = () => {
  return (
    <div className="h-screen bg-slate-800 flex flex-col items-center justify-center px-2 overflow-hidden">
      <ProductFeatures features={productBranding.features} />
    </div>
  );
};

export const Benefits = () => {
  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center">
      <ProductBenefits productBranding={productBranding} />
    </div>
  );
};

export const CTA = () => {
  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center relative">
      <div className="flex flex-col gap-4 items-center text-center">
        <h2 className="text-slate-200 text-5xl font-bold">
          Ready to Take Control?
        </h2>
        <span className="text-slate-500">
          Start tracking your expenses today and make smarter financial
          decisions.
        </span>
        <Link to={"auth"}>
          <button className="bg-cyan-500 p-2 font-semibold rounded-lg flex items-center gap-2">
            Sign In <LuArrowRight />
          </button>
        </Link>
      </div>
      <div className="absolute bottom-0 w-full px-4 py-2 text-xs sm:px-10 sm:py-5 sm:text-sm flex flex-col gap-1 sm:flex-row items-center justify-between border-t border-slate-700">
        <span className="text-slate-500">{`${productBranding.name} © 2025. All right reserved.`}</span>
        <ul className="text-slate-500 flex gap-4">
          <Link>
            <li>Privacy</li>
          </Link>
          <Link>
            <li>Terms</li>
          </Link>
          <Link>
            <li>Contact</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
