import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./components/dashboard/Home";
import { Categories } from "./components/dashboard/Categories";
import { Landing } from "./pages/Landing";
import { Expenses } from "./components/dashboard/Expenses";
import { Budgets } from "./components/dashboard/Budgets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "dashboard/",
    element: <Dashboard />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "expenses/",
        element: <Expenses />,
      },
      {
        path: "categories/",
        element: <Categories />,
      },
      {
        path: "budgets/",
        element: <Budgets />,
      },
    ],
  },
  {
    path: "auth/",
    element: <Auth />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
