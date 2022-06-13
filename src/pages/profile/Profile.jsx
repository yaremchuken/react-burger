import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FeedItem } from '../../components/feed-item/FeedItem';
import { ProfileForm } from '../../components/profile-form/ProfileForm';
import { logoutUser } from '../../services/actions/user';
import { REFRESH_TOKEN_LOCAL_PATH } from '../../utils/constants';
import styles from './profile.module.css';

export const Profile = () => {
  const dispath = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispath(logoutUser(localStorage.getItem(REFRESH_TOKEN_LOCAL_PATH)));
  };

  const onOrderChoose = (id) => {
    const pathname = `/profile/orders/${id}`;
    navigate(pathname, { state: { background: { ...location, pathname } } });
  };

  const random = () => {
    return Array.from(Array(Math.floor(Math.random() * 5) + 5).keys()).map((_, i) => (
      <FeedItem onClickHandler={onOrderChoose} key={i} withStatus={true} />
    ));
  };

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

      {location.pathname.includes('/orders') && <ul className={styles.orders}>{random()}</ul>}
    </div>
  );
};
