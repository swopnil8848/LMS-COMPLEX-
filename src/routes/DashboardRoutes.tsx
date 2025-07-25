// routes/DashboardRoutes.tsx
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import { RoleBasedComponent } from '../utils/roleBasedComponents';

export const dashboardRoutes: RouteObject = {
  path: '/dashboard',
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <RoleBasedComponent routeName="dashboard" /> },
    { path: 'institutions', element: <RoleBasedComponent routeName="institution" /> },
    { path: 'profile', element: <div>My Profile</div> },
    { path: 'notifications', element: <div>Notifications</div> },
    { path: 'messages', element: <div>Messages</div> },
    { path: 'settings', element: <div>Settings</div> },
  ],
};
