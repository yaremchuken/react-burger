import { WebSocketActionType } from '../services/constants/web-socket';

export const API_URL = 'https://norma.nomoreparties.space/api';
export const WEB_SOCKET_URL = 'wss://norma.nomoreparties.space/orders';

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

export const WEB_SOCKET_ACTIONS = {
  wsInit: WebSocketActionType.WS_CONNECTION_START,
  wsClose: WebSocketActionType.WS_CONNECTION_CLOSE,
  onOpen: WebSocketActionType.WS_CONNECTION_SUCCESS,
  onError: WebSocketActionType.WS_CONNECTION_ERROR,
  onClose: WebSocketActionType.WS_CONNECTION_CLOSED,
  onMessage: WebSocketActionType.WS_GET_MESSAGE,
  onSend: WebSocketActionType.WS_SEND_MESSAGE,
};
