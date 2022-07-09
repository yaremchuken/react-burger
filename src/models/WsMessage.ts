import { Order } from './Order';

export type WsMessage = {
  orders: Array<Order>;
  total: number;
  totalToday: number;
};
