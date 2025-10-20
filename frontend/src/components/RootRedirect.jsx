import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './ui/Loading';

const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!user) {
    return <Navigate to="/home" replace />;
  }

  // Redirect based on user role
  if (user.role === 'admin') {
    return <Navigate to="/admin" replace />;
  } else if (user.role === 'employer') {
    return <Navigate to="/employer/dashboard" replace />;
  } else if (user.role === 'jobseeker') {
    return <Navigate to="/jobs" replace />;
  }

  // Fallback to home if role is not recognized
  return <Navigate to="/home" replace />;
};

export default RootRedirect;
