import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Expenses } from "./components/dashboard/Expenses";
import { Categories } from "./components/dashboard/Categories";
import { Landing } from "./pages/Landing";

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
        element: <Expenses />,
      },
      {
        path: "categories/",
        element: <Categories />,
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
