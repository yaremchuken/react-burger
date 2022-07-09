import { OrderActionType } from '../../constants/order';

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

export type TOrderActions =
  | ITakeOrderRequestAction
  | ITakeOrderSuccessAction
  | ITakeOrderFailedAction
  | IClearOrderNumberAction;

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
