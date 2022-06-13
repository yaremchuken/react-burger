import styles from './feed-stats.module.css';

export const FeedStats = () => {
  return (
    <div className={styles.feedStats}>
      <div className={styles.statuses}>
        <div className={styles.heading}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={styles.list}>
            <li className="text_type_digits-default text_color_inactive">034533</li>
            <li className="text_type_digits-default text_color_inactive">034532</li>
            <li className="text_type_digits-default text_color_inactive">034530</li>
            <li className="text_type_digits-default text_color_inactive">034527</li>
            <li className="text_type_digits-default text_color_inactive">034525</li>
          </ul>
        </div>

        <div className={styles.heading}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={styles.list}>
            <li className="text_type_digits-default">034538</li>
            <li className="text_type_digits-default">034541</li>
            <li className="text_type_digits-default">034542</li>
          </ul>
        </div>
      </div>

      <div className={styles.counter}>
        <div className="text text_type_main-medium">Выполнено за все время:</div>
        <div className={`${styles.glow} text text_type_digits-large`}>28 752</div>
      </div>

      <div className={styles.counter}>
        <div className="text text_type_main-medium">Выполнено за сегодня:</div>
        <div className={`${styles.glow} text text_type_digits-large`}>138</div>
      </div>
    </div>
  );
};
