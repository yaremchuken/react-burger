import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ForgotPassword } from '../../pages/forgot-password/ForgotPassword';
import { Homepage } from '../../pages/homepage/Homepage';
import { Ingredients } from '../../pages/ingredients/Ingredients';
import { Login } from '../../pages/login/Login';
import { NotFound } from '../../pages/not-found/NotFound';
import { Profile } from '../../pages/profile/Profile';
import { Register } from '../../pages/register/Register';
import { ResetPassword } from '../../pages/reset-password/ResetPassword';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import UnauthorizedRoute from '../unauthorized-route/UnauthorizedRoute';

export const AppRoutes = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={
          <UnauthorizedRoute user={user}>
            <Login />
          </UnauthorizedRoute>
        }
      />
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
      <Route
        path="/profile/*"
        element={
          <ProtectedRoute user={user}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="/ingredients/:id" element={<Ingredients />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
