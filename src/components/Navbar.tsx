import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white py-3 px-6 shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">MyApp</Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/signup" className="hover:underline">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
