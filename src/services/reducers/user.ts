import { User } from '../../models/User';
import { TUserActions } from '../actions/user';
import { UserActionType } from '../constants/user';

type TUserState = {
  registerRequested: boolean;
  registerFailed: boolean;

  loginRequested: boolean;
  loginFailed: boolean;

  getRequested: boolean;
  getFailed: boolean;
  getSuccess: boolean;

  updateRequested: boolean;
  updateFailed: boolean;

  passwordResetRequested: boolean;

  user?: User;
};

const initialState: TUserState = {
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

export const userReducer = (state = initialState, action: TUserActions) => {
  switch (action.type) {
    case UserActionType.REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequested: true,
        registerFailed: false,
      };
    }

    case UserActionType.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        registerRequested: false,
      };
    }

    case UserActionType.REGISTER_USER_FAILED: {
      return {
        ...initialState,
        registerFailed: true,
      };
    }

    case UserActionType.LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequested: true,
        loginFailed: false,
      };
    }

    case UserActionType.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: action.user,
        loginRequested: false,
      };
    }

    case UserActionType.LOGIN_USER_FAILED: {
      return {
        ...initialState,
        loginFailed: true,
      };
    }

    case UserActionType.LOGOUT_USER_SUCCESS: {
      return {
        ...initialState,
      };
    }

    case UserActionType.GET_USER_REQUEST: {
      return {
        ...state,
        getRequested: true,
        getFailed: false,
        getSuccess: false,
      };
    }

    case UserActionType.GET_USER_FAILED: {
      return {
        ...state,
        getRequested: false,
        getFailed: true,
      };
    }

    case UserActionType.GET_USER_SUCCESS: {
      return {
        ...state,
        getRequested: false,
        getSuccess: true,
        user: action.user,
      };
    }

    case UserActionType.UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateRequested: true,
        updateFailed: false,
      };
    }

    case UserActionType.UPDATE_USER_FAILED: {
      return {
        ...state,
        updateRequested: false,
        updateFailed: true,
      };
    }

    case UserActionType.UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateRequested: false,
        user: action.user,
      };
    }

    case UserActionType.PASSWORD_RESET_REQUESTED: {
      return {
        ...state,
        passwordResetRequested: true,
      };
    }

    default:
      return state;
  }
};
