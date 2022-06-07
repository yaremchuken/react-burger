import {
  GET_USER_FAILED,
  LOGIN_USER_FAILED,
  LOGOUT_USER_FAILED,
  REGISTER_USER_FAILED,
  UPDATE_USER_FAILED,
} from '../actions/user';

export const registerFailed = () => {
  return {
    type: REGISTER_USER_FAILED,
  };
};

export const loginFailed = () => {
  return {
    type: LOGIN_USER_FAILED,
  };
};

export const logoutFailed = () => {
  return {
    type: LOGOUT_USER_FAILED,
  };
};

export const getUserFailed = () => {
  return {
    type: GET_USER_FAILED,
  };
};

export const updateUserFailed = () => {
  return {
    type: UPDATE_USER_FAILED,
  };
};
