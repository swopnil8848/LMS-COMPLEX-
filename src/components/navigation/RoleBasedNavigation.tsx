import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store';
import { ROLE_COMPONENTS, type UserRole, type RouteName } from '../../utils/roleBasedComponents';

// Define navigation items with their metadata
interface NavItem {
  path: string;
  label: string;
  icon?: string;
  category: 'admin' | 'office' | 'teacher' | 'common';
}

const NAV_ITEMS: NavItem[] = [
  // Admin routes
  { path: '/dashboard/institutions', label: 'Institutions', category: 'admin' },
  { path: '/dashboard/users', label: 'Users', category: 'admin' },
  { path: '/dashboard/roles', label: 'Roles & Permissions', category: 'admin' },
  { path: '/dashboard/system', label: 'System Settings', category: 'admin' },
  { path: '/dashboard/security', label: 'Security', category: 'admin' },
  
  // Office routes
  { path: '/dashboard/documents', label: 'Documents', category: 'office' },
  { path: '/dashboard/schedule', label: 'Schedule', category: 'office' },
  { path: '/dashboard/staff', label: 'Staff Management', category: 'office' },
  { path: '/dashboard/departments', label: 'Departments', category: 'office' },
  { path: '/dashboard/communications', label: 'Communications', category: 'office' },
  { path: '/dashboard/archive', label: 'Archive', category: 'office' },
  
  // Teacher routes
  { path: '/dashboard/courses', label: 'Courses', category: 'teacher' },
  { path: '/dashboard/students', label: 'Students', category: 'teacher' },
  { path: '/dashboard/assignments', label: 'Assignments', category: 'teacher' },
  { path: '/dashboard/grades', label: 'Grades', category: 'teacher' },
  { path: '/dashboard/materials', label: 'Course Materials', category: 'teacher' },
  
  // Common routes
  { path: '/dashboard/reports', label: 'Reports', category: 'common' },
  { path: '/dashboard/profile', label: 'My Profile', category: 'common' },
  { path: '/dashboard/notifications', label: 'Notifications', category: 'common' },
  { path: '/dashboard/messages', label: 'Messages', category: 'common' },
  { path: '/dashboard/settings', label: 'Settings', category: 'common' },
];

// Helper function to check if user has access to a route
const hasRouteAccess = (routeName: string, userRole: UserRole): boolean => {
  // Remove /dashboard/ prefix to get route name
  const route = routeName.replace('/dashboard/', '') as RouteName;
  
  // Check if route exists in ROLE_COMPONENTS
  if (ROLE_COMPONENTS[route]) {
    return route in ROLE_COMPONENTS && userRole in ROLE_COMPONENTS[route];
  }
  
  // For routes not in ROLE_COMPONENTS (common routes), allow access
  return true;
};

// Group navigation items by category
const groupNavItems = (items: NavItem[], userRole: UserRole) => {
  const grouped: Record<string, NavItem[]> = {
    admin: [],
    office: [],
    teacher: [],
    common: []
  };

  items.forEach(item => {
    if (hasRouteAccess(item.path, userRole)) {
      grouped[item.category].push(item);
    }
  });

  return grouped;
};

interface RoleBasedNavigationProps {
  className?: string;
}

export const RoleBasedNavigation: React.FC<RoleBasedNavigationProps> = ({ 
  className = '' 
}) => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const userRole = user?.role?.toLowerCase() as UserRole;

  if (!userRole) {
    return null;
  }

  const groupedItems = groupNavItems(NAV_ITEMS, userRole);
  
  const renderNavSection = (title: string, items: NavItem[]) => {
    if (items.length === 0) return null;

    return (
      <div key={title} className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          {title}
        </h3>
        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${isActive
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    );
  };

  return (
    <div className={`p-4 ${className}`}>
      {/* Dashboard Home */}
      <div className="mb-6">
        <Link
          to="/dashboard"
          className={`
            flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
            ${location.pathname === '/dashboard'
              ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-700'
              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            }
          `}
        >
          Dashboard
        </Link>
      </div>

      {/* Role-based sections */}
      {userRole === 'admin' && renderNavSection('Administration', groupedItems.admin)}
      {(userRole === 'officer' || userRole === 'admin') && renderNavSection('Office Management', groupedItems.office)}
      {(userRole === 'teacher' || userRole === 'student') && renderNavSection('Academic', groupedItems.teacher)}
      {renderNavSection('General', groupedItems.common)}
    </div>
  );
};

export default RoleBasedNavigation;