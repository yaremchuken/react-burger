import { number } from 'prop-types';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../actions/web-socket';

const initialState = {
  wsConnectionRequested: false,
  wsConnected: false,

  orders: [],
  total: number,
  totalToday: number,
};

export const webSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_START:
      return {
        ...state,
        wsConnectionRequested: true,
        wsConnected: false,
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnectionRequested: false,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
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
