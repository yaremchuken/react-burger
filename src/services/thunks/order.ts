import { Ingredient } from '../../models/Ingredient';
import { AppDispatch, AppThunk } from '../../types';
import { clearComposition } from '../actions/burger';
import { takeOrderFailed, takeOrderRequest, takeOrderSuccess } from '../actions/order';
import { sendTakeOrder } from '../apiService';

export const takeOrder: AppThunk = (ingredients: ReadonlyArray<Ingredient>) => (dispatch: AppDispatch) => {
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
