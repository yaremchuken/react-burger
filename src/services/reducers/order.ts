import { TOrderActions } from '../actions/order';
import { OrderActionType } from '../constants/order';

type TOrderState = {
  orderRequested: boolean;
  orderFailed: boolean;
  orderNumber?: number;
};

const initialState: TOrderState = {
  orderRequested: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action: TOrderActions) => {
  switch (action.type) {
    case OrderActionType.TAKE_ORDER_REQUEST: {
      return {
        ...state,
        orderRequested: true,
        orderFailed: false,
      };
    }

    case OrderActionType.TAKE_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequested: false,
        orderFailed: false,
      };
    }

    case OrderActionType.TAKE_ORDER_FAILED: {
      return {
        ...initialState,
        orderFailed: true,
      };
    }

    case OrderActionType.CLEAR_ORDER_NUMBER: {
      return {
        ...state,
        orderNumber: undefined,
      };
    }

    default:
      return state;
  }
};
