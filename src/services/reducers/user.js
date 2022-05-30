import {
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from '../actions/user';

const initialState = {
  user: undefined,
  accessToken: undefined,

  registerRequested: false,
  registerFailed: false,

  loginRequested: false,
  loginFailed: false,
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
        accessToken: action.payload.accessToken,
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
        accessToken: action.payload.accessToken,
        loginRequested: false,
      };

    case LOGIN_USER_FAILED:
      return {
        ...initialState,
        loginFailed: true,
      };

    default:
      return state;
  }
};
