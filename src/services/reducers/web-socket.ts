import { Order } from '../../models/Order';
import { TWebSocketActions } from '../actions/web-socket';
import { WebSocketActionType } from '../../constants/web-socket';

type TWebSocketState = {
  wsRequested: boolean;
  wsConnected: boolean;

  orders: Array<Order>;
  total?: number;
  totalToday?: number;
};

const initialState: TWebSocketState = {
  wsRequested: false,
  wsConnected: false,
  orders: [],
};

export const webSocketReducer = (state = initialState, action: TWebSocketActions) => {
  switch (action.type) {
    case WebSocketActionType.WS_CONNECTION_START: {
      return {
        ...state,
        wsRequested: true,
        wsConnected: false,
      };
    }

    case WebSocketActionType.WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsRequested: false,
        wsConnected: true,
      };
    }

    case WebSocketActionType.WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsRequested: false,
        wsConnected: false,
      };
    }

    case WebSocketActionType.WS_CONNECTION_CLOSE: {
      return {
        ...initialState,
      };
    }

    case WebSocketActionType.WS_GET_MESSAGE: {
      const { message } = action;
      return {
        ...state,
        orders: message.orders,
        total: message.total,
        totalToday: message.totalToday,
      };
    }

    default:
      return state;
  }
};
