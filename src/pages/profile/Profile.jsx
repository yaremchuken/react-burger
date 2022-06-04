import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser, refreshAccessToken, updateUser } from '../../services/actions/user';
import { getUser } from '../../services/apiService';
import { ACCESS_TOKEN_COOKIE_PATH, REFRESH_TOKEN_LOCAL_PATH } from '../../utils/constants';
import { getCookie } from '../../utils/utils';
import styles from './profile.module.css';

export const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [edits, setEdits] = useState([]);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispath = useDispatch();

  const [user, setUser] = useState();
  const [needUpdateUser, setNeedUpdateUser] = useState();

  const { tokenRequested, tokenSuccess, tokenFailed } = useSelector((store) => store.user);

  const refreshToken = useCallback(() => {
    dispath(refreshAccessToken(localStorage.getItem(REFRESH_TOKEN_LOCAL_PATH)));
  }, [dispath]);

  const updateUserData = useCallback(
    (token) => {
      dispath(updateUser({ name, email, password }, token));
    },
    [dispath, name, email, password]
  );

  useEffect(() => {
    if (!user) {
      const token = getCookie(ACCESS_TOKEN_COOKIE_PATH);
      if (!token && !(tokenRequested || tokenSuccess || tokenFailed)) {
        refreshToken();
      }
      if (token) {
        getUser(token).then((res) => {
          if (res && res.success) {
            setUser(res.user);
            setName(res.user.name);
            setEmail(res.user.email);
          }
        });
      }
    }
  }, [user, setName, setEmail, setPassword, refreshToken, tokenRequested, tokenSuccess, tokenFailed]);

  useEffect(() => {
    if (needUpdateUser) {
      const token = getCookie(ACCESS_TOKEN_COOKIE_PATH);
      if (!token && !(tokenRequested || tokenSuccess || tokenFailed)) {
        refreshToken();
      }
      if (token) {
        updateUserData(token);
        setNeedUpdateUser(false);
      }
    }
  }, [needUpdateUser, refreshToken, updateUserData, tokenRequested, tokenSuccess, tokenFailed]);

  const logout = () => {
    dispath(logoutUser(localStorage.getItem(REFRESH_TOKEN_LOCAL_PATH)));
  };

  const onChangeValueClick = (ref) => {
    if (edits.includes(ref.current.name)) {
      setEdits(edits.filter((e) => e !== ref.current.name));
    } else {
      setEdits([...edits, ref.current.name]);
      setTimeout(() => ref.current.focus(), 0);
    }
  };

  const isDirty = () => {
    if (!user) {
      return;
    }
    return password.length > 0 || user.name !== name || user.email !== email;
  };

  const clearChanges = () => {
    setName(user.name);
    setEmail(user.email);
    setPassword('');
    setEdits([]);
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

      <form>
        <fieldset className={`${styles.fieldset} mb-6`}>
          <Input
            type="text"
            name="name"
            key={'name'}
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            ref={nameRef}
            icon={`${edits.includes('name') ? 'CloseIcon' : 'EditIcon'}`}
            onIconClick={(e) => onChangeValueClick(nameRef)}
            disabled={!edits.includes('name')}
          />
          <Input
            type="text"
            name="email"
            key={'email'}
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            icon={`${edits.includes('email') ? 'CloseIcon' : 'EditIcon'}`}
            onIconClick={(e) => onChangeValueClick(emailRef)}
            disabled={!edits.includes('email')}
          />
          <Input
            type="password"
            name="password"
            key={'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordRef}
            icon={`${edits.includes('password') ? 'CloseIcon' : 'EditIcon'}`}
            onIconClick={(e) => onChangeValueClick(passwordRef)}
            disabled={!edits.includes('password')}
          />
        </fieldset>

        {isDirty() && (
          <div className={styles.controllers}>
            <button className={`text text_type_main-default ${styles.cancelButton}`} onClick={clearChanges}>
              Отмена
            </button>
            <Button type="primary" size="medium" onClick={() => setNeedUpdateUser(true)}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
