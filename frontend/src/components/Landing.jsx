import {
  LuArrowRight,
  LuBrain,
  LuChartColumn,
  LuCheck,
  LuEye,
  LuReceiptText,
  LuTarget,
  LuWallet,
  LuWalletMinimal,
} from "react-icons/lu";
import { Link } from "react-router-dom";

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
    <div className="h-screen bg-slate-800 flex flex-col items-center justify-center gap-10 px-2 overflow-hidden">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-slate-100 text-4xl font-semibold">
          Powerful Features
        </h1>
        <span className="text-slate-400">
          Everything you need to take control of your finances
        </span>
      </div>
      <div className="max-w-5xl grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {productBranding.features.map((feature) => (
          <div className="bg-slate-700 px-3 py-4 rounded-md flex flex-col gap-2 items-center border border-slate-500">
            <div className="flex items-center justify-center gap-4 md:flex-col">
              <span className="bg-slate-600 p-2 rounded-lg text-purple-500">
                {feature.icon}
              </span>
              <h2 className="text-slate-200 text-lg">{feature.title}</h2>
            </div>
            <p className="text-sm text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Benefits = () => {
  return (
    <div className="h-screen bg-slate-900 flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-4">
        <div>
          <h1 className="text-slate-100 text-4xl font-semibold my-6">
            Why Choose {productBranding.name}?
          </h1>
          <ul className="flex flex-col gap-4">
            {productBranding.benefits.map((item) => (
              <span className="flex gap-2 text-slate-400">
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
    </div>
  );
};

export const CTA = () => {
  return (
    <div className="h-screen bg-slate-950 flex items-center justify-center relative">
      <div className="flex flex-col gap-4 items-center">
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
      <div className="absolute bottom-0 w-full px-10 py-5 flex justify-between border-t border-slate-700 text-sm">
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
