import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ForgotPassword } from '../../pages/forgot-password/ForgotPassword';
import { Homepage } from '../../pages/homepage/Homepage';
import { Ingredients } from '../../pages/ingredients/Ingredients';
import { Login } from '../../pages/login/Login';
import { NotFound } from '../../pages/not-found/NotFound';
import { Profile } from '../../pages/profile/Profile';
import { Register } from '../../pages/register/Register';
import { ResetPassword } from '../../pages/reset-password/ResetPassword';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import Modal from '../modal/Modal';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import UnauthorizedRoute from '../unauthorized-route/UnauthorizedRoute';
import { Feed } from '../../pages/feed/Feed';
import { Order } from '../../pages/order/Order';
import { OrderInfo } from '../order-info/OrderInfo';

export const AppRoutes = ({ closeModals }) => {
  const { user } = useSelector((store) => store.user);

  const location = useLocation();
  const background = location.state?.background;

  const route = (
    <Routes location={background ?? location}>
      <Route path="/" element={<Homepage />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/register"
        element={
          <UnauthorizedRoute user={user}>
            <Register />
          </UnauthorizedRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <UnauthorizedRoute user={user}>
            <ForgotPassword />
          </UnauthorizedRoute>
        }
      />

      <Route
        path="/reset-password"
        element={
          <UnauthorizedRoute user={user}>
            <ResetPassword />
          </UnauthorizedRoute>
        }
      />

      {background && (
        <>
          <Route
            path="/ingredients/:id"
            element={
              <>
                <Homepage />
                <Modal title="Детали ингредиента" onCloseDemand={closeModals}>
                  <IngredientDetails />
                </Modal>
              </>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <>
                <Feed />
                <Modal onCloseDemand={closeModals}>
                  <OrderInfo />
                </Modal>
              </>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedRoute user={user}>
                <Profile />
                <Modal onCloseDemand={closeModals}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </>
      )}

      <Route path="/ingredients/:id" element={<Ingredients />} />

      <Route path="/feed/:id" element={<Order />} />

      <Route path="/feed" element={<Feed />} />

      <Route
        path="/profile/orders/:id"
        element={
          <ProtectedRoute user={user}>
            <Order />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile/*"
        element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );

  return route;
};

AppRoutes.propTypes = {
  closeModals: PropTypes.func.isRequired,
};
