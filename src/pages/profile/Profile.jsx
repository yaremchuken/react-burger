import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeedItem } from '../../components/feed-item/FeedItem';
import { ProfileForm } from '../../components/profile-form/ProfileForm';
import { logoutUser } from '../../services/actions/user';
import { wsConnectionClose, wsConnectionStart } from '../../services/actions/web-socket';
import { ACCESS_TOKEN_COOKIE_PATH, REFRESH_TOKEN_LOCAL_PATH } from '../../utils/constants';
import { getCookie } from '../../utils/utils';
import styles from './profile.module.css';

export const Profile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { wsRequested, wsConnected, orders } = useSelector((store) => store.webSocket);

  const logout = () => {
    dispatch(logoutUser(localStorage.getItem(REFRESH_TOKEN_LOCAL_PATH)));
  };

  const onOrderChoose = (id) => {
    const pathname = `/profile/orders/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  useEffect(() => {
    if (!wsConnected && !wsRequested) {
      dispatch(wsConnectionStart('', getCookie(ACCESS_TOKEN_COOKIE_PATH).replace('Bearer ', '')));
    }
  }, [wsConnected, wsRequested, dispatch]);

  useEffect(() => () => dispatch(wsConnectionClose()), [dispatch]);

  return (
    <div className={styles.profile}>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li
            className={`${styles.menuItem} text text_type_main-medium ${
              location.pathname !== '/profile' && 'text_color_inactive'
            }`}
            onClick={() => navigate('/profile')}
          >
            Профиль
          </li>
          <li
            className={`${styles.menuItem} text text_type_main-medium ${
              !location.pathname.startsWith('/profile/orders') && 'text_color_inactive'
            }`}
            onClick={() => navigate('/profile/orders')}
          >
            История заказов
          </li>
          <li className={`${styles.menuItem} text text_type_main-medium text_color_inactive`} onClick={logout}>
            Выход
          </li>
        </ul>
        <p className={`${styles.menuRemark} text text_type_main-default text_color_inactive pt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      {location.pathname === '/profile' && <ProfileForm />}

      {location.pathname.includes('/orders') && orders && (
        <ul className={styles.orders}>
          {orders
            .sort((a, b) => b.number - a.number)
            .map((order) => (
              <FeedItem order={order} onClickHandler={() => onOrderChoose(order.number)} key={order.number} />
            ))}
        </ul>
      )}
    </div>
  );
};
