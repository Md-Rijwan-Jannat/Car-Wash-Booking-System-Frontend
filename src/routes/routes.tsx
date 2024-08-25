import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Auth from "../components/layout/Auth";
import Dashboard from "../components/layout/Dashboard";
import { MainRoutes } from "./main.routes";
import { AuthRoutes } from "./auth.routes";
import { AdminRoutes } from "./admin.routes";
import { UserRoutes } from "./user.routes";
import Error from "../pages/error/Error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // MainLayout applied to main routes
    children: MainRoutes,
    errorElement: <Error />,
  },
  {
    path: "/auth",
    element: <Auth />, // Auth layout applied to authentication routes
    children: AuthRoutes,
  },
  {
    path: "/dashboard",
    element: <Dashboard />, // Dashboard layout applied to dashboard routes
    children: [
      {
        path: "admin", // "/dashboard/admin"
        element: <Dashboard />,
        children: AdminRoutes,
      },
      {
        path: "user", // "/dashboard/user"
        element: <Dashboard />,
        children: UserRoutes,
      },
    ],
  },
]);
