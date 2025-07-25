// routes/AppRoutes.tsx (switch to .tsx for type safety)

import { useRoutes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ResetPassword from '../pages/auth/ResetPassword';
import ForgotPassword from '../pages/auth/ForgotPassword';
import NotFound from '../pages/errors/NotFound';
import ProtectedRoute from './ProtectedRoute';
import { dashboardRoutes } from './DashboardRoutes';

const AppRoutes = () => {
  const routes = [
    // Public routes with MainLayout
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
      ],
    },
    // Auth routes
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Signup /> },
    { path: '/forgot-password', element: <ForgotPassword /> },
    { path: '/reset-password/:resetToken', element: <ResetPassword /> },

    // Dashboard routes
    dashboardRoutes,

    // 404
    { path: '*', element: <NotFound /> },
  ];

  const element = useRoutes(routes);
  return element;
};

export default AppRoutes;
