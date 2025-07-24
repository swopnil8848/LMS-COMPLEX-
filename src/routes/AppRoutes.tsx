// routes/AppRoutes.jsx (Updated)
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

import Home from '../pages/home/Home';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import DashboardHome from '../pages/dashboard/DashboardHome';

import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/errors/NotFound';
import ResetPassword from '../pages/auth/ResetPassword';
import ForgotPassword from '../pages/auth/ForgotPassword';
import { AdminInstitutions } from '../pages/dashboard/AdminDashboard';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth routes without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

      {/* Protected Dashboard routes with DashboardLayout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        {/* Dashboard nested routes */}
        <Route index element={<DashboardHome />} />
        
        {/* Admin routes */}
        <Route path="institutions" element={<AdminInstitutions />} />
        <Route path="users" element={<div>Users Management</div>} />
        <Route path="roles" element={<div>Roles & Permissions</div>} />
        <Route path="reports" element={<div>Reports</div>} />
        <Route path="system" element={<div>System Settings</div>} />
        <Route path="security" element={<div>Security</div>} />
        
        {/* Office routes */}
        <Route path="documents" element={<div>Documents</div>} />
        <Route path="schedule" element={<div>Schedule</div>} />
        <Route path="staff" element={<div>Staff Management</div>} />
        <Route path="departments" element={<div>Departments</div>} />
        <Route path="communications" element={<div>Communications</div>} />
        <Route path="archive" element={<div>Archive</div>} />
        
        {/* Teacher routes */}
        <Route path="courses" element={<div>My Courses</div>} />
        <Route path="students" element={<div>Students</div>} />
        <Route path="assignments" element={<div>Assignments</div>} />
        <Route path="grades" element={<div>Grades</div>} />
        <Route path="materials" element={<div>Course Materials</div>} />
        
        {/* User/Student routes */}
        <Route path="profile" element={<div>My Profile</div>} />
        <Route path="notifications" element={<div>Notifications</div>} />
        <Route path="messages" element={<div>Messages</div>} />
        
        {/* Common routes */}
        <Route path="settings" element={<div>Settings</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;