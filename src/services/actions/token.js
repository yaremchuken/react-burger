import { ACCESS_TOKEN_COOKIE_PATH, ACCESS_TOKEN_LIFETIME, REFRESH_TOKEN_LOCAL_PATH } from '../../utils/constants';
import { setCookie } from '../../utils/utils';
import { refreshToken } from '../apiService';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED = 'REFRESH_TOKEN_FAILED';

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

export const persistTokens = (accessToken, refreshToken) => {
  setCookie(ACCESS_TOKEN_COOKIE_PATH, accessToken, ACCESS_TOKEN_LIFETIME);
  localStorage.setItem(REFRESH_TOKEN_LOCAL_PATH, refreshToken);
};
