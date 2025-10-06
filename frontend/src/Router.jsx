import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Auth } from "./pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <>home</>,
  },

  {
    path: "dashboard/",
    element: <>dashboard</>,
  },
  {
    path: "auth/",
    element: <Auth />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
