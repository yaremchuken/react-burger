import { ACCESS_TOKEN_COOKIE_PATH, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LOCAL_PATH } from '../../utils/constants';
import { setCookie } from '../../utils/utils';
import { login, logout, refreshToken, register } from '../apiService';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

export const registerUser = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    register(credentials)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: res,
          });
          persistTokens(res.accessToken, res.refreshToken);
        } else {
          dispatch({
            type: REGISTER_USER_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: REGISTER_USER_FAILED }));
  };
};

export const loginUser = (credentials) => {
  return (dispatch) => {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });

    login(credentials)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: res,
          });
          persistTokens(res.accessToken, res.refreshToken);
        } else {
          dispatch({
            type: LOGIN_USER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({ type: LOGIN_USER_FAILED });
      });
  };
};

export const logoutUser = (refreshToken) => {
  return (dispatch) => {
    dispatch({
      type: LOGOUT_USER_REQUEST,
    });

    logout(refreshToken)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: LOGOUT_USER_SUCCESS,
          });
          setCookie(ACCESS_TOKEN_COOKIE_PATH, '', 0);
          localStorage.removeItem(REFRESH_TOKEN_LOCAL_PATH);
        } else {
          dispatch({
            type: LOGOUT_USER_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: LOGOUT_USER_FAILED }));
  };
};

export const updateUser = (user, token) => {
  //TODO: continue with api method updateUser()
};

export const refreshAccessToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });

    refreshToken(token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: REFRESH_TOKEN_SUCCESS,
            payload: res,
          });
          persistTokens(res.accessToken, res.refreshToken);
        } else {
          dispatch({
            type: REFRESH_TOKEN_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: REFRESH_TOKEN_FAILED }));
  };
};

const persistTokens = (accessToken, refreshToken) => {
  setCookie(ACCESS_TOKEN_COOKIE_PATH, accessToken, ACCESS_TOKEN_LIFETIME);
  localStorage.setItem(REFRESH_TOKEN_LOCAL_PATH, refreshToken);
};
