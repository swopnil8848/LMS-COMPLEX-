// components/sidebars/SideNavBarTeacher.jsx
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  Settings,
  BarChart3,
  GraduationCap,
  ClipboardCheck
} from 'lucide-react';

const SideNavBarTeacher = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: BarChart3, label: 'Dashboard' },
    { path: '/dashboard/courses', icon: BookOpen, label: 'My Courses' },
    { path: '/dashboard/students', icon: Users, label: 'Students' },
    { path: '/dashboard/schedule', icon: Calendar, label: 'Class Schedule' },
    { path: '/dashboard/assignments', icon: ClipboardCheck, label: 'Assignments' },
    { path: '/dashboard/grades', icon: GraduationCap, label: 'Grades' },
    { path: '/dashboard/materials', icon: FileText, label: 'Course Materials' },
    { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="bg-purple-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-purple-400">Teacher Panel</h2>
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
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:bg-purple-700 hover:text-white'
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

export default SideNavBarTeacher;