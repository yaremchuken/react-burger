import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../actions/web-socket';

const initialState = {
  wsRequested: false,
  wsConnected: false,

  orders: [],
  total: undefined,
  totalToday: undefined,
};

export const webSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsRequested: true,
        wsConnected: false,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsRequested: false,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsRequested: false,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSE:
      return {
        ...initialState,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };

    default:
      return state;
  }
};
