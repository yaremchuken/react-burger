import { REFRESH_TOKEN_FAILED, REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS } from '../actions/token';

const initialState = {
  tokenRequested: false,
  tokenSuccess: false,
  tokenFailed: false,
};

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
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
