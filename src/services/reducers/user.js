import {
  GET_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  PASSWORD_RESET_REQUESTED,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from '../actions/user';

const initialState = {
  user: undefined,

  registerRequested: false,
  registerFailed: false,

  loginRequested: false,
  loginFailed: false,

  getRequested: false,
  getFailed: false,
  getSuccess: false,

  updateRequested: false,
  updateFailed: false,

  passwordResetRequested: false,
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

    case GET_USER_REQUEST:
      return {
        ...state,
        getRequested: true,
        getFailed: false,
        getSuccess: false,
      };

    case GET_USER_FAILED:
      return {
        ...state,
        getRequested: false,
        getFailed: true,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        getRequested: false,
        getSuccess: true,
        user: action.payload,
      };

    case UPDATE_USER_REQUEST:
      return {
        ...state,
        updateRequested: true,
        updateFailed: false,
      };

    case UPDATE_USER_FAILED:
      return {
        ...state,
        updateRequested: false,
        updateFailed: true,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateRequested: false,
        user: action.payload,
      };

    case PASSWORD_RESET_REQUESTED:
      return {
        ...state,
        passwordResetRequested: true,
      };

    default:
      return state;
  }
};
