import { dropTokens, persistTokens } from '../../utils/utils';
import { getUser, login, logout, patchUser, register } from '../apiService';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

export const PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED';

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
          dropTokens();
        } else {
          dispatch({
            type: LOGOUT_USER_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: LOGOUT_USER_FAILED }));
  };
};

export const getUserByToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });

    getUser(token)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            payload: res.user,
          });
        } else {
          dispatch({
            type: GET_USER_FAILED,
          });
        }
      })
      .catch(() => {
        dispatch({ type: GET_USER_FAILED });
      });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });

    patchUser(user)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: res.user,
          });
        } else {
          dispatch({
            type: UPDATE_USER_FAILED,
          });
        }
      })
      .catch(() => dispatch({ type: UPDATE_USER_FAILED }));
  };
};
