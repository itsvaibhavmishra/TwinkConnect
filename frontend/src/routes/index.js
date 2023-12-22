import { Suspense, lazy } from "react";
import { useRoutes, Navigate } from "react-router-dom";

import LoadingScreen from "../components/LoadingScreen";
import DashboardLayout from "../layouts/dashboard";
import { DEFAULT_AUTH, DEFAULT_PATH } from "../config";
import AuthLayout from "../layouts/auth";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { element: <Navigate to={DEFAULT_AUTH} replace />, index: true },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "verify", element: <VerifyPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
// app pages
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

// auth pages
const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register")));
const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));
const ForgotPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ForgotPassword"))
);
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/ResetPassword"))
);

const Page404 = Loadable(lazy(() => import("../pages/404")));
