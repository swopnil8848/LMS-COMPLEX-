// components/sidebars/SideNavBar.jsx
import { useSelector } from 'react-redux';
import SideNavBarAdmin from './SideNavBarAdmin';
import SideNavBarOffice from './SIdeNavBarOffice';
import SideNavBarTeacher from './SideNavBarTeacher';
import SideNavBarUser from './SideNavBarUser';
import type { RootState } from '../../app/store';


const SideNavBar = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // If no user or no role, return null or a default sidebar
  if (!user || !user.role) {
    return null;
  }

  // Render sidebar based on user role
  switch (user.role.toLowerCase()) {
    case 'admin':
      return <SideNavBarAdmin />;
    case 'officer':
      return <SideNavBarOffice />;
    case 'teacher':
      return <SideNavBarTeacher />;
    case 'user':
    case 'student':
      return <SideNavBarUser />;
    default:
      return <SideNavBarUser />; // Default to user sidebar
  }
};

export default SideNavBar;