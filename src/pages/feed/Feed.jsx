import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeedItem } from '../../components/feed-item/FeedItem';
import { FeedStats } from '../../components/feed-stats/FeedStats';
import { WS_CONNECTION_START } from '../../services/actions/web-socket';
import styles from './feed.module.css';

export const Feed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wsConnectionRequested, wsConnected, orders } = useSelector((store) => store.webSocket);

  const onOrderChoose = (id) => {
    const pathname = `/feed/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  useEffect(() => {
    if (!wsConnected && !wsConnectionRequested) {
      dispatch({ type: WS_CONNECTION_START });
    }
  }, [wsConnected, wsConnectionRequested, dispatch]);

  if (!orders) {
    return null;
  }

  return (
    <section className={`${styles.feed} pl-10 pr-10`}>
      <h1 className={`${styles.header} text text_type_main-large pb-5`}>Лента заказов</h1>
      <div className={styles.holder}>
        <ul className={styles.feedItems}>
          {orders.map((order) => (
            <FeedItem order={order} onClickHandler={() => onOrderChoose(order.number)} key={order.number} />
          ))}
        </ul>
        <FeedStats />
      </div>
    </section>
  );
};
