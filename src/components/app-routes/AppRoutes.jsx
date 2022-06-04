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

export const AppRoutes = () => {
  const { user } = useSelector((store) => store.user);

  if (!user) {
    return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/profile/*" element={<Profile />} />
      <Route path="/ingredients/:id" element={<Ingredients />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
