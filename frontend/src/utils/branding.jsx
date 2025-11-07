import {
  LuBrain,
  LuChartColumn,
  LuEye,
  LuReceiptText,
  LuTarget,
  LuWallet,
  LuWalletMinimal,
} from "react-icons/lu";

export const productBranding = {
  name: "ExpenseTrack",
  logo: <LuWalletMinimal />,
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
