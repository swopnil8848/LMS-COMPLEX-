import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { AppDispatch, RootState } from '../app/store'; // adjust path to your store
import { useEffect } from 'react';
import { getMe } from '../features/auth/authSlice';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(()=>{
    dispatch(getMe());
  })

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
