export enum UserActionType {
  REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILED = 'REGISTER_USER_FAILED',

  LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILED = 'LOGIN_USER_FAILED',

  LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST',
  LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS',
  LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED',

  GET_USER_REQUEST = 'GET_USER_REQUEST',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
  GET_USER_FAILED = 'GET_USER_FAILED',

  UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST',
  UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS',
  UPDATE_USER_FAILED = 'UPDATE_USER_FAILED',

  PASSWORD_RESET_REQUESTED = 'PASSWORD_RESET_REQUESTED',
}