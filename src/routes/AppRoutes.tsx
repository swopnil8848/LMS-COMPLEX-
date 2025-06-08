import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import DashboardHome from '../pages/dashboard/DashboardHome';

import ProtectedRoute from './ProtectedRoute';

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
    </Routes>
  );
};

export default AppRoutes;