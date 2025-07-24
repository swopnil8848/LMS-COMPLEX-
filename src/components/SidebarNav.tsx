
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';

// Icon components (you can replace these with your preferred icon library)
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const InstitutionIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const BadgeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const SidebarNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
      roles: ['user', 'teacher', 'officer', 'admin']
    },
    {
      name: 'Users',
      path: '/dashboard/users',
      icon: <UsersIcon />,
      roles: ['admin', 'officer']
    },
    {
      name: 'Institutions',
      path: '/dashboard/institutions',
      icon: <InstitutionIcon />,
      roles: ['admin']
    },
    {
      name: 'Create Institution',
      path: '/dashboard/institutions/create',
      icon: <PlusIcon />,
      roles: ['admin']
    },
    {
      name: 'Courses',
      path: '/dashboard/courses',
      icon: <BookIcon />,
      roles: ['teacher', 'officer', 'admin']
    },
    {
      name: 'Certificates',
      path: '/dashboard/certificates',
      icon: <BadgeIcon />,
      roles: ['officer', 'admin']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white hover:bg-gray-700 transition-colors"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-gray-900 text-white z-40 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-64' : 'w-0 lg:w-16'
        } lg:relative lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'}`}>
              <h2 className="text-lg font-semibold">Dashboard</h2>
              {user && (
                <p className="text-sm text-gray-400 capitalize">{user.role}</p>
              )}
            </div>
            <button
              onClick={toggleSidebar}
              className="hidden lg:block p-1 rounded hover:bg-gray-700 transition-colors"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {filteredMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors group ${
                  isActiveRoute(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                title={!isOpen ? item.name : ''}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span
                  className={`ml-3 transition-opacity duration-200 ${
                    isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </nav>

          {/* User Info Footer */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold">
                  {user?.firstName?.charAt(0) || 'U'}
                </span>
              </div>
              <div
                className={`ml-3 transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
                }`}
              >
                <p className="text-sm font-medium text-white">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};            <AdminInstitutions/>


export default SidebarNav;