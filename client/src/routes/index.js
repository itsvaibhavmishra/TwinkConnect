import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../layouts/dashboard';
import { DEFAULT_PATH } from '../config';
import LoadingScreen from '../components/LoadingScreen';
import AuthLayout from '../layouts/main';

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
      path: '/auth',
      element: (
        <>
          <AuthLayout />
        </>
      ),
      children: [{ element: <LoginPage />, path: 'login' }],
    },

    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'settings', element: <Settings /> },

        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(
  lazy(() => import('../pages/dashboard/GeneralApp'))
);
const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')));
const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));
