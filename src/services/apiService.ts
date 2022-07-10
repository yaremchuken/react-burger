import { Ingredient } from '../models/Ingredient';
import { User } from '../models/User';
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

export const sendTakeOrder = (ingredients: ReadonlyArray<Ingredient>) => {
  return request(ORDERS_PATH, { ingredients }, 'POST', true);
};

export const register = (user: User) => {
  return request(REGISTER_PATH, user);
};

export const login = (user: User) => {
  return request(LOGIN_PATH, user);
};

export const logout = (token: string) => {
  return request(LOGOUT_PATH, { token });
};

export const forgotPassword = (email: string) => {
  return request(FORGOT_PASSWORD_PATH, { email });
};

export const resetPassword = (password: string, token: string) => {
  return request(RESET_PASSWORD_PATH, { password, token });
};

export const getUser = () => {
  return request(USER_PATH, undefined, 'GET', true);
};

export const patchUser = (user: User) => {
  return request(USER_PATH, user, 'PATCH', true);
};

const request = async (path: string, body?: any, method?: 'GET' | 'POST' | 'PATCH', withToken: boolean = false) => {
  let token = getCookie(ACCESS_TOKEN_COOKIE_PATH);
  if (withToken && !token) {
    const tokens: { accessToken: string; refreshToken: string } = await request(REFRESH_TOKEN_PATH, {
      refreshToken: localStorage.getItem(REFRESH_TOKEN_LOCAL_PATH),
    });
    token = tokens.accessToken;
    persistTokens(token, tokens.refreshToken);
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
  )
    .then(checkResponse)
    .catch((e: Error) => console.log(e));
};

const checkResponse = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Что-то пошло не так ${response.status}`);
};
