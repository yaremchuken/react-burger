import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { UserType } from '../../utils/types';

const ProtectedRoute = ({ user, children }) => {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  user: UserType,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default ProtectedRoute;
