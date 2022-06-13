import { OrderInfo } from '../../components/order-info/OrderInfo';
import styles from './order.module.css';

export const Order = () => {
  return (
    <section className={styles.order}>
      <OrderInfo />
    </section>
  );
};
