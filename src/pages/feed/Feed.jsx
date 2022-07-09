import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeedItem } from '../../components/feed-item/FeedItem';
import { FeedStats } from '../../components/feed-stats/FeedStats';
import { useDispatch, useSelector } from '../../hooks';
import { wsConnectionClose, wsConnectionStart } from '../../services/actions/web-socket';
import styles from './feed.module.css';

export const Feed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wsRequested, wsConnected, orders } = useSelector((store) => store.webSocket);

  const onOrderChoose = (id) => {
    const pathname = `/feed/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  useEffect(() => {
    if (!wsConnected && !wsRequested) {
      dispatch(wsConnectionStart('/all'));
    }
  }, [wsConnected, wsRequested, dispatch]);

  useEffect(() => () => dispatch(wsConnectionClose()), [dispatch]);

  if (!orders) {
    return null;
  }

  return (
    <section className={`${styles.feed} pl-10 pr-10`}>
      <div>
        <h1 className={`${styles.header} text text_type_main-large pb-5`}>Лента заказов</h1>
        <ul className={styles.feedItems}>
          {orders.map((order) => (
            <FeedItem order={order} onClickHandler={() => onOrderChoose(order.number)} key={order.number} />
          ))}
        </ul>
      </div>
      <FeedStats />
    </section>
  );
};
