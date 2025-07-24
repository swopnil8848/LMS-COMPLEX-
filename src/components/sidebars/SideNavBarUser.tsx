// components/sidebars/SideNavBarUser.jsx
import { Link, useLocation } from 'react-router-dom';
import { 
  User, 
  BookOpen, 
  Calendar, 
  FileText, 
  Settings,
  BarChart3,
  Bell,
  MessageSquare
} from 'lucide-react';

const SideNavBarUser = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/dashboard/profile', icon: User, label: 'My Profile' },
    { path: '/dashboard/courses', icon: BookOpen, label: 'My Courses' },
    { path: '/dashboard/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/dashboard/documents', icon: FileText, label: 'Documents' },
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
    { path: '/dashboard/messages', icon: MessageSquare, label: 'Messages' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-indigo-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-indigo-400">Student Panel</h2>
      </div>
      
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-indigo-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideNavBarUser;