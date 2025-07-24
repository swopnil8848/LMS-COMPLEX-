import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  Building2, 
  Settings, 
  BarChart3, 
  Shield, 
  Database,
  FileText,
  UserCheck
} from 'lucide-react';

const SideNavBarAdmin = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/dashboard/institutions', icon: Building2, label: 'Institutions' },
    { path: '/dashboard/users', icon: Users, label: 'Users Management' },
    { path: '/dashboard/roles', icon: UserCheck, label: 'Roles & Permissions' },
    { path: '/dashboard/reports', icon: FileText, label: 'Reports' },
    { path: '/dashboard/system', icon: Database, label: 'System Settings' },
    { path: '/dashboard/security', icon: Shield, label: 'Security' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
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
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
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

export default SideNavBarAdmin;