import { CLEAR_ORDER_NUMBER, TAKE_ORDER_FAILED, TAKE_ORDER_REQUEST, TAKE_ORDER_SUCCESS } from '../actions/order';

const initialState = {
  orderNumber: undefined,
  orderRequested: false,
  orderFailed: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAKE_ORDER_REQUEST:
      return {
        ...state,
        orderRequested: true,
        orderFailed: false,
      };

    case TAKE_ORDER_SUCCESS:
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequested: false,
        orderFailed: false,
      };

    case TAKE_ORDER_FAILED:
      return {
        ...initialState,
        orderFailed: true,
      };

    case CLEAR_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: undefined,
      };

    default:
      return state;
  }
};
