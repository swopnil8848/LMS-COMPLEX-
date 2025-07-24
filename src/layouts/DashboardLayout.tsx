// layouts/DashboardLayout.jsx (New Layout for Dashboard)
import { Outlet } from 'react-router-dom';
import SideNavBar from '../components/sidebars/SideNavBar';

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideNavBar />
      
      <div className="flex-1 flex flex-col">
        {/* Optional: Add a dashboard header/navbar here */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        </header>
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet /> {/* Dashboard content will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;