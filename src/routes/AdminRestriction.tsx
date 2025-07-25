import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { AppDispatch, RootState } from '../app/store';
import { getMe } from '../features/auth/authSlice';

const AdminRestriction = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await dispatch(getMe());
      setInitialized(true);
    };
    console.log("initialized",initialized);
    init();
  }, [dispatch]);

  if (!initialized || loading) {
    return <div>Loading...</div>;
  }

  return user?.role === 'admin' ? children : <Navigate to="/login" />;
};

export default AdminRestriction;