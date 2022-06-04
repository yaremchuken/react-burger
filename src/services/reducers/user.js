import {
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REFRESH_TOKEN_FAILED,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from '../actions/user';

const initialState = {
  user: undefined,

  registerRequested: false,
  registerFailed: false,

  loginRequested: false,
  loginFailed: false,

  tokenRequested: false,
  tokenSuccess: false,
  tokenFailed: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        registerRequested: true,
        registerFailed: false,
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        registerRequested: false,
      };

    case REGISTER_USER_FAILED:
      return {
        ...initialState,
        registerFailed: true,
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginRequested: true,
        loginFailed: false,
      };

    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        loginRequested: false,
      };

    case LOGIN_USER_FAILED:
      return {
        ...initialState,
        loginFailed: true,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...initialState,
      };

    case REFRESH_TOKEN_REQUEST:
      return {
        ...state,
        tokenRequested: true,
        tokenSuccess: false,
        tokenFailed: false,
      };

    case REFRESH_TOKEN_FAILED:
      return {
        ...state,
        tokenRequested: false,
        tokenFailed: true,
      };

    case REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        tokenRequested: false,
        tokenSuccess: true,
      };

    default:
      return state;
  }
};
