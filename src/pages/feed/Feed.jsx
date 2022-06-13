import { useLocation, useNavigate } from 'react-router-dom';
import { FeedItem } from '../../components/feed-item/FeedItem';
import { FeedStats } from '../../components/feed-stats/FeedStats';
import styles from './feed.module.css';

export const Feed = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const onOrderChoose = (id) => {
    const pathname = `/feed/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  const random = () => {
    return Array.from(Array(Math.floor(Math.random() * 5) + 5).keys()).map((_, i) => (
      <FeedItem onClickHandler={onOrderChoose} key={i} />
    ));
  };

  return (
    <section className={`${styles.feed} pl-10 pr-10`}>
      <h1 className={`${styles.header} text text_type_main-large pb-5`}>Лента заказов</h1>
      <div className={styles.holder}>
        <ul className={styles.feedItems}>{random()}</ul>
        <FeedStats />
      </div>
    </section>
  );
};
