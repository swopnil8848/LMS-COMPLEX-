import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import DashboardHome from '../pages/dashboard/DashboardHome';

import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/errors/NotFound';
import ResetPassword from '../pages/auth/ResetPassword';
import ForgotPassword from '../pages/auth/ForgotPassword';
// import ForgotPassword from '../pages/auth/ForgotPassword';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        } />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      <Route path="/forgot-password" element={<ForgotPassword/>} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword/>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;