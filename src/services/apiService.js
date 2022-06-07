import {
  ACCESS_TOKEN_COOKIE_PATH,
  API_URL,
  FORGOT_PASSWORD_PATH,
  INGREDIENTS_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  ORDERS_PATH,
  REFRESH_TOKEN_LOCAL_PATH,
  REFRESH_TOKEN_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
  USER_PATH,
} from '../utils/constants';
import { getCookie, persistTokens } from '../utils/utils';

export const fetchIngredients = () => {
  return request(INGREDIENTS_PATH);
};

export const sendTakeOrder = (ingredients) => {
  return request(ORDERS_PATH, { ingredients }, 'POST', true);
};

export const register = (credentials) => {
  return request(REGISTER_PATH, credentials);
};

export const login = (credentials) => {
  return request(LOGIN_PATH, credentials);
};

export const logout = (token) => {
  return request(LOGOUT_PATH, { token });
};

export const forgotPassword = (email) => {
  return request(FORGOT_PASSWORD_PATH, { email });
};

export const resetPassword = ({ password, token }) => {
  return request(RESET_PASSWORD_PATH, { password, token });
};

export const getUser = () => {
  return request(USER_PATH, undefined, 'GET', true);
};

export const patchUser = (user) => {
  return request(USER_PATH, user, 'PATCH', true);
};

const request = async (path, body, method, withToken) => {
  let token = getCookie(ACCESS_TOKEN_COOKIE_PATH);
  if (withToken && !token) {
    const tokens = await request(REFRESH_TOKEN_PATH, { refreshToken: localStorage.getItem(REFRESH_TOKEN_LOCAL_PATH) });
    persistTokens(token, tokens.refreshToken);
    token = tokens.accessToken;
  }

  return fetch(
    `${API_URL}${path}`,
    (body || method) && {
      method: method ?? 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: body && JSON.stringify(body),
    }
  ).then(checkResponse);
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Что-то пошло не так ${response.status}`);
};
