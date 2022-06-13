import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
} from '../services/actions/web-socket';

export const API_URL = 'https://norma.nomoreparties.space/api';

export const INGREDIENTS_PATH = '/ingredients';
export const ORDERS_PATH = '/orders';

export const LOGIN_PATH = '/auth/login';
export const REGISTER_PATH = '/auth/register';
export const LOGOUT_PATH = '/auth/logout';
export const REFRESH_TOKEN_PATH = '/auth/token';
export const USER_PATH = '/auth/user';

export const FORGOT_PASSWORD_PATH = '/password-reset';
export const RESET_PASSWORD_PATH = '/password-reset/reset';

export const REFRESH_TOKEN_LOCAL_PATH = 'react-burger.refresh-token';

export const ACCESS_TOKEN_COOKIE_PATH = 'react-burger.access-token';
export const ACCESS_TOKEN_LIFETIME = 20 * 60;

export const WEB_SOCKET_URL = 'wss://norma.nomoreparties.space/orders/all';

export const WEB_SOCKET_ACTIONS = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};
