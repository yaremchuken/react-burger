import { Navigate } from 'react-router-dom';
import { User } from '../../models/User';

type UnauthorizedRouteProps = {
  user?: User;
  children: any;
};

const UnauthorizedRoute = ({ user, children }: UnauthorizedRouteProps) => {
  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default UnauthorizedRoute;
