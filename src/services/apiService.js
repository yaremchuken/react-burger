import {
  API_URL,
  FORGOT_PASSWORD_PATH,
  INGREDIENTS_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  ORDERS_PATH,
  REFRESH_TOKEN_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
  USER_PATH,
} from '../utils/constants';

export const fetchIngredients = () => {
  return request(INGREDIENTS_PATH);
};

export const sendTakeOrder = (ingredients) => {
  return request(ORDERS_PATH, { ingredients });
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

export const refreshToken = (token) => {
  return request(REFRESH_TOKEN_PATH, { token });
};

export const forgotPassword = (email) => {
  return request(FORGOT_PASSWORD_PATH, { email });
};

export const resetPassword = ({ password, token }) => {
  return request(RESET_PASSWORD_PATH, { password, token });
};

export const getUser = (accessToken) => {
  return request(USER_PATH, undefined, 'GET', accessToken);
};

export const updateUser = (user, accessToken) => {
  return request(USER_PATH, user, 'PATCH', accessToken);
};

const request = (path, body, method, accessToken) => {
  return fetch(
    `${API_URL}${path}`,
    (body || method) && {
      method: method ?? 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: accessToken,
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
