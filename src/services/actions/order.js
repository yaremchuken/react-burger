import { takeOrderFailed } from '../action-creators/order-action-creator';
import { sendTakeOrder } from '../apiService';
import { CLEAR_COMPOSITION } from './burger';

export const TAKE_ORDER_REQUEST = 'TAKE_ORDER_REQUEST';
export const TAKE_ORDER_SUCCESS = 'TAKE_ORDER_SUCCESS';
export const TAKE_ORDER_FAILED = 'TAKE_ORDER_FAILED';

export const CLEAR_ORDER_NUMBER = 'CLEAR_ORDER_NUMBER';

export const takeOrder = (ingredients) => {
  return (dispatch) => {
    dispatch({
      type: TAKE_ORDER_REQUEST,
    });

    sendTakeOrder(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: TAKE_ORDER_SUCCESS,
            orderNumber: res.order.number,
          });
          dispatch({ type: CLEAR_COMPOSITION });
        } else {
          dispatch(takeOrderFailed());
        }
      })
      .catch(() => dispatch(takeOrderFailed()));
  };
};
