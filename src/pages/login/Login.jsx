import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/actions/user';
import { ACCESS_TOKEN_COOKIE_PATH } from '../../utils/constants';
import { getCookie } from '../../utils/utils';
import styles from '../shared/shared.module.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loginFailed } = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate(location.state?.from ?? '/');
    }
  }, [user, navigate, location]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  if (!user && getCookie(ACCESS_TOKEN_COOKIE_PATH)) {
    return null;
  }

  return (
    <div className={styles.main}>
      {loginFailed && (
        <p className={`text text_type_main-default pb-5 ${styles.error}`}>
          Не удалось залогиниться, проверьте e-mail и пароль
        </p>
      )}

      <h2 className="text text_type_main-medium">Вход</h2>

      <form onSubmit={onSubmit} className={`pt-6 pb-20`}>
        <fieldset className={styles.fieldset}>
          <Input
            type="email"
            name="email"
            key={'email'}
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput name={'password'} value={password} onChange={(e) => setPassword(e.target.value)} />
        </fieldset>
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>

      <ul className={`${styles.guides} mt-20`}>
        <li className={`${styles.guide} text text_type_main-default text_color_inactive`}>
          <p className={styles.guideText}>Вы - новый пользователь? </p>
          <Link className={styles.guideLink} to={'/register'}>
            Зарегистрироваться
          </Link>
        </li>

        <li className={`${styles.guide} text text_type_main-default text_color_inactive`}>
          <p className={styles.guideText}>Забыли пароль? </p>
          <Link className={styles.guideLink} to={'/forgot-password'}>
            Восстановить пароль
          </Link>
        </li>
      </ul>
    </div>
  );
};
