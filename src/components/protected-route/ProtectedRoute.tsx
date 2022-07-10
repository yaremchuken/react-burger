import { Navigate, useLocation } from 'react-router-dom';
import { User } from '../../models/User';

type ProtectedRouteProps = {
  user?: User;
  children: any;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
