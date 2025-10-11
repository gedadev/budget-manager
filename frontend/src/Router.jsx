import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>home</>,
  },

  {
    path: "dashboard/",
    element: <Dashboard />,
  },
  {
    path: "auth/",
    element: <Auth />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
