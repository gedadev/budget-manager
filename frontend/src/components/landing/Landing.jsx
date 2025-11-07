import {
  LuArrowRight,
  LuBrain,
  LuChartColumn,
  LuEye,
  LuReceiptText,
  LuTarget,
  LuWallet,
  LuWalletMinimal,
} from "react-icons/lu";
import { Link } from "react-router-dom";
import { ProductFeatures } from "./ProductFeatures";
import { ProductBenefits } from "./ProductBenefits";

const productBranding = {
  name: "ExpenseTrack",
  img: <LuWalletMinimal />,
  benefits: [
    "Spend less time managing finances, more time living your life",
    "Never exceed your budget with smart alerts and comparisons",
    "Visualize your spending patterns with beautiful charts",
    "All your data stays private and secure locally",
    "Works seamlessly on any device, anywhere",
  ],
  features: [
    {
      icon: <LuReceiptText />,
      title: "Quick Entry",
      description:
        "Log expenses in seconds with an intuitive form designed for speed",
    },
    {
      icon: <LuTarget />,
      title: "Smart Categories",
      description: "Organize expenses with custom categories and subcategories",
    },
    {
      icon: <LuWallet />,
      title: "Budget Planning",
      description:
        "Set budgets for each category and track against your spending",
    },
    {
      icon: <LuChartColumn />,
      title: "Visual Analytics",
      description:
        "See spending patterns with interactive charts and detailed insights",
    },
    {
      icon: <LuEye />,
      title: "Payment Tracking",
      description: "Track expenses by payment method including cash and cards",
    },
    {
      icon: <LuBrain />,
      title: "Smart Insights",
      description:
        "Understand your spending habits with AI-powered recommendations",
    },
  ],
};

export const Hero = () => {
  return (
    <div className="h-screen bg-slate-900">
      <div className="h-full max-w-xl m-auto text-center flex flex-col items-center justify-center gap-6">
        <h1 className="text-slate-100 text-5xl md:text-6xl font-bold">
          Master Your Finances With Ease
        </h1>
        <span className="text-slate-400 text-sm md:text-base">
          Track every expense, set smart budgets, and gain insights into your
          spending habits. Built for modern financial awareness.
        </span>
        <div className="flex gap-2">
          <button className="p-2 text-sm font-semibold rounded-md bg-cyan-500 flex items-center gap-3">
            Start Tracking Now <LuArrowRight />
          </button>
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
    <div className="h-screen bg-slate-950 flex items-center justify-center relative">
      <div className="flex flex-col gap-4 items-center text-center">
        <h2 className="text-slate-200 text-5xl font-bold">
          Ready to Take Control?
        </h2>
        <span className="text-slate-500">
          Start tracking your expenses today and make smarter financial
          decisions.
        </span>
        <button className="bg-cyan-500 p-2 rounded-lg flex items-center gap-2">
          Sign In <LuArrowRight />
        </button>
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
