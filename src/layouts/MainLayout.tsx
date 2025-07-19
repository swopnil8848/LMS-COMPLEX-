import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet /> {/* This is where nested routes will be rendered */}
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
