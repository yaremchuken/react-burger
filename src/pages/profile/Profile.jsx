import { EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile.module.css';

export const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [current, setCurrent] = useState('profile');

  const { user } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user, setName, setEmail, setPassword]);

  return (
    <div className={styles.profile}>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <li
            className={`${styles.menuItem} text text_type_main-medium ${
              current === 'profile' ? '' : 'text_color_inactive'
            }`}
            onClick={() => setCurrent('profile')}
          >
            Профиль
          </li>
          <li
            className={`${styles.menuItem} text text_type_main-medium ${
              current === 'history' ? '' : 'text_color_inactive'
            }`}
            onClick={() => setCurrent('history')}
          >
            История заказов
          </li>
          <li
            className={`${styles.menuItem} text text_type_main-medium ${
              current === 'logout' ? '' : 'text_color_inactive'
            }`}
            onClick={() => setCurrent('logout')}
          >
            Выход
          </li>
        </ul>
        <p className={`${styles.menuRemark} text text_type_main-default text_color_inactive pt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>

      <form action="">
        <fieldset className={styles.fieldset}>
          <Input
            type="text"
            name="name"
            key={'name'}
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.name)}
          />
          <EmailInput name="email" key="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput name={'password'} value={password} onChange={(e) => setPassword(e.target.password)} />
        </fieldset>
      </form>
    </div>
  );
};
