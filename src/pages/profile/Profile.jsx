import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logoutUser, updateUser } from '../../services/actions/user';
import { REFRESH_TOKEN_LOCAL_PATH } from '../../utils/constants';
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

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user && !name) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, name, setName, setEmail]);

  const updateUserData = (e) => {
    e.preventDefault();
    const form = { name, email };
    if (password.length > 0) {
      form.password = password;
    }
    dispath(updateUser(form));
    setEdits([]);
  };

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

  if (!user) {
    return null;
  }

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
            <Button type="primary" size="medium" onClick={updateUserData}>
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};
