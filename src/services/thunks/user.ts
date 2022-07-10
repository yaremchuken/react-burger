import { User } from '../../models/User';
import { AppDispatch, AppThunk } from '../../types';
import { dropTokens, persistTokens } from '../../utils/utils';
import {
  getUserFailed,
  getUserRequest,
  getUserSuccess,
  loginUserFailed,
  loginUserRequest,
  loginUserSuccess,
  logoutUserFailed,
  logoutUserRequest,
  logoutUserSuccess,
  registerUserFailed,
  registerUserRequest,
  registerUserSuccess,
  updateUserFailed,
  updateUserRequest,
  updateUserSuccess,
} from '../actions/user';
import { getUser, login, logout, patchUser, register } from '../apiService';

export const registerUser: AppThunk = (user: User) => (dispatch: AppDispatch) => {
  dispatch(registerUserRequest());

  register(user)
    .then((res) => {
      if (res && res.success) {
        dispatch(registerUserSuccess(res));
        persistTokens(res.accessToken, res.refreshToken);
      } else {
        dispatch(registerUserFailed());
      }
    })
    .catch(() => dispatch(registerUserFailed()));
};

export const loginUser: AppThunk = (user: User) => (dispatch: AppDispatch) => {
  dispatch(loginUserRequest());

  login(user)
    .then((res) => {
      if (res && res.success) {
        dispatch(loginUserSuccess(res.user));
        persistTokens(res.accessToken, res.refreshToken);
      } else {
        dispatch(loginUserFailed());
      }
    })
    .catch(() => dispatch(loginUserFailed()));
};

export const logoutUser: AppThunk = (refreshToken: string) => (dispatch: AppDispatch) => {
  dispatch(logoutUserRequest());

  logout(refreshToken)
    .then((res) => {
      if (res && res.success) {
        dispatch(logoutUserSuccess());
        dropTokens();
      } else {
        dispatch(logoutUserFailed());
      }
    })
    .catch(() => dispatch(logoutUserFailed()));
};

export const fetchUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserRequest());

  getUser()
    .then((res) => {
      if (res && res.success) {
        dispatch(getUserSuccess(res.user));
      } else {
        dispatch(getUserFailed());
      }
    })
    .catch(() => {
      dispatch(getUserFailed());
    });
};

export const updateUser: AppThunk = (user: User) => (dispatch: AppDispatch) => {
  dispatch(updateUserRequest());

  patchUser(user)
    .then((res) => {
      if (res && res.success) {
        dispatch(updateUserSuccess(res.user));
      } else {
        dispatch(updateUserFailed());
      }
    })
    .catch(() => dispatch(updateUserFailed()));
};
