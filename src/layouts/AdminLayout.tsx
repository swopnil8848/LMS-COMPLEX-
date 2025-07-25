import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/sidebars/SideNavBar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavBar />
      
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;