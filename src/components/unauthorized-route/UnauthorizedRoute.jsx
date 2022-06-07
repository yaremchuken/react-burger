import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { UserType } from '../../utils/types';

const UnauthorizedRoute = ({ user, children }) => {
  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

UnauthorizedRoute.propTypes = {
  user: UserType,
  children: PropTypes.object.isRequired,
};

export default UnauthorizedRoute;
