import { Dispatch } from 'redux';
import { Ingredient } from '../../models/Ingredient';
import { sendTakeOrder } from '../apiService';
import { OrderActionType } from '../constants/order';
import { clearComposition } from './burger';

export interface ITakeOrderRequestAction {
  readonly type: typeof OrderActionType.TAKE_ORDER_REQUEST;
}

export interface ITakeOrderSuccessAction {
  readonly type: typeof OrderActionType.TAKE_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface ITakeOrderFailedAction {
  readonly type: typeof OrderActionType.TAKE_ORDER_FAILED;
}

export interface IClearOrderNumberAction {
  readonly type: typeof OrderActionType.CLEAR_ORDER_NUMBER;
}

export const takeOrderRequest = (): ITakeOrderRequestAction => ({
  type: OrderActionType.TAKE_ORDER_REQUEST,
});

export const takeOrderSuccess = (orderNumber: number): ITakeOrderSuccessAction => ({
  type: OrderActionType.TAKE_ORDER_SUCCESS,
  orderNumber,
});

export const takeOrderFailed = (): ITakeOrderFailedAction => ({
  type: OrderActionType.TAKE_ORDER_FAILED,
});

export const clearOrderNumber = (): IClearOrderNumberAction => ({
  type: OrderActionType.CLEAR_ORDER_NUMBER,
});

export const takeOrder = (ingredients: Array<Ingredient>) => {
  return (dispatch: Dispatch) => {
    dispatch(takeOrderRequest());

    sendTakeOrder(ingredients)
      .then((res) => {
        if (res && res.success) {
          dispatch(takeOrderSuccess(res.order.number));
          dispatch(clearComposition());
        } else {
          dispatch(takeOrderFailed());
        }
      })
      .catch(() => dispatch(takeOrderFailed()));
  };
};
