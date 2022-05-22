import { useSelector } from 'react-redux';
import acceptImg from '../../image/order-accepted.png';
import styles from './order-details.module.css';

const OrderDetails = () => {
  const { orderNumber } = useSelector((store) => store.order);

  return (
    <div className={`${styles.orderDetails} pb-30`}>
      <p className={`${styles.orderNum} text text_type_digits-large pt-4`}>{('' + orderNumber).padStart(6, '0')}</p>
      <p className="text text_type_main-medium pt-8">идентификатор заказа</p>
      <img className={styles.acceptImg} src={acceptImg} alt="Заказ принят" />
      <p className="text text_type_main-default pb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  );
};

export default OrderDetails;
