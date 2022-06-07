import { TAKE_ORDER_FAILED } from '../actions/order';

export const takeOrderFailed = () => {
  return {
    type: TAKE_ORDER_FAILED,
  };
};
