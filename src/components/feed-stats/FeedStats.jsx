import { useSelector } from 'react-redux';
import styles from './feed-stats.module.css';

export const FeedStats = () => {
  const { orders, total, totalToday } = useSelector((store) => store.webSocket);

  const done = orders.filter((order, idx) => idx < 10 && order.status === 'done');
  const pending = orders.filter((order, idx) => idx < 10 && order.status === 'pending');

  // Почему-то сначала из стора приходит функция checkType вместо значений total и totalToday
  if (typeof total === 'function') {
    return null;
  }

  return (
    <div className={styles.feedStats}>
      <div className={styles.statuses}>
        <div className={styles.heading}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={styles.list}>
            {done.map((order) => (
              <li key={order.number} className="text_type_digits-default text_color_inactive">
                {order.number}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.heading}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={styles.list}>
            {pending.map((order) => (
              <li key={order.number} className="text_type_digits-default">
                {order.number}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.counter}>
        <div className="text text_type_main-medium">Выполнено за все время:</div>
        <div className={`${styles.glow} text text_type_digits-large`}>{total}</div>
      </div>

      <div className={styles.counter}>
        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
        <div className={`${styles.glow} text text_type_digits-large`}>{totalToday}</div>
      </div>
    </div>
  );
};
