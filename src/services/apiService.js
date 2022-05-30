import {
  API_URL,
  FORGOT_PASSWORD_PATH,
  INGREDIENTS_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  ORDERS_PATH,
  REGISTER_PATH,
  RESET_PASSWORD_PATH,
  TOKEN_PATH,
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
  return request(LOGOUT_PATH, token);
};

export const refreshToken = (token) => {
  return request(TOKEN_PATH, token);
};

export const forgotPassword = (email) => {
  return request(FORGOT_PASSWORD_PATH, { email });
};

export const resetPassword = ({ password, token }) => {
  return request(RESET_PASSWORD_PATH, { password, token });
};

const request = (path, body) => {
  return fetch(
    `${API_URL}${path}`,
    body && {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  ).then(checkResponse);
};

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Что-то пошло не так ${response.status}`);
};
