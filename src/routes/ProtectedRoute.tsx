import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../app/store'; // adjust path to your store

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
