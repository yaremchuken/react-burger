import { Navigate } from 'react-router-dom';

const UnauthorizedRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default UnauthorizedRoute;
