// components/sidebars/SideNavBarOffice.jsx
import { Link, useLocation } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  Users, 
  Building2, 
  Settings,
  BarChart3,
  Mail,
  Archive
} from 'lucide-react';

const SideNavBarOffice = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/dashboard/documents', icon: FileText, label: 'Documents' },
    { path: '/dashboard/schedule', icon: Calendar, label: 'Schedule' },
    { path: '/dashboard/staff', icon: Users, label: 'Staff Management' },
    { path: '/dashboard/departments', icon: Building2, label: 'Departments' },
    { path: '/dashboard/communications', icon: Mail, label: 'Communications' },
    { path: '/dashboard/archive', icon: Archive, label: 'Archive' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-green-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-green-400">Office Panel</h2>
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
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-300 hover:bg-green-700 hover:text-white'
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

export default SideNavBarOffice;