// src/hooks/useUserRouter.ts
import { useMemo } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Auth from "../components/layout/Auth";
import Dashboard from "../components/layout/Dashboard";
import Error from "../pages/error/Error";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { MainRoutes } from "../routes/main.routes";
import { AuthRoutes } from "../routes/auth.routes";
import { AdminRoutes } from "../routes/admin.routes";
import { UserRoutes } from "../routes/user.routes";
import { useAppSelector } from "../redux/hook";
import { useCurrentUser } from "../redux/features/auth/authSlice";

export const useRouter = () => {
  const user = useAppSelector(useCurrentUser);
  const role = user?.role;

  return useMemo(() => {
    return createBrowserRouter([
      {
        path: "/",
        element: <MainLayout />,
        children: MainRoutes,
        errorElement: <Error />,
      },
      {
        path: "/auth",
        element: <Auth />,
        children: AuthRoutes,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "admin",
            element: (
              <ProtectedRoute role="admin">
                <Dashboard />
              </ProtectedRoute>
            ),
            children: AdminRoutes,
          },
          {
            path: "user",
            element: (
              <ProtectedRoute role="user">
                <Dashboard />
              </ProtectedRoute>
            ),
            children: UserRoutes,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/auth/login" replace={true} />,
      },
    ]);
  }, [role]);
};
